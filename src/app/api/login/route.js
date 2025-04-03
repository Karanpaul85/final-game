import { connectionStr } from "@/app/utils/db";
import mongoose from "mongoose";
import Cryptr from "cryptr";
import { User } from "@/app/utils/models/user";
import { sign, verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { authCookie } from "@/app/utils/constants";
import { cookies } from "next/headers";

const secret = process.env.NEXT_PUBLIC_CRYPTR_SECRET;

const cryptr = new Cryptr(secret);

export async function GET(req) {
  const cookieStore = cookies();
  const userAuthCookie = cookieStore.get(authCookie);

  if (!userAuthCookie) {
    return new Response(JSON.stringify({ isLoggedIn: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const user = verify(userAuthCookie.value, secret);
    await mongoose.connect(connectionStr);
    if (process.env.ADMIN_EMAIL.includes(user.userEmail)) {
      return new Response(JSON.stringify({ isLoggedIn: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ isLoggedIn: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error, "error");
    return new Response(JSON.stringify({ message: error }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    await mongoose.connect(connectionStr);
    const body = await req.json();
    const { email, password } = body;
    const decryptEmail = cryptr.decrypt(email);
    const decryptPassword = cryptr.decrypt(password);
    if (process.env.ADMIN_EMAIL.includes(decryptEmail)) {
      const isUserExist = await User.findOne({ email: decryptEmail });
      if (isUserExist) {
        if (decryptPassword === cryptr.decrypt(isUserExist.password)) {
          const token = sign({ userEmail: decryptEmail }, secret, {
            expiresIn: "1h",
          });

          const serialized = serialize(authCookie, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            path: "/",
          });

          return new Response(
            JSON.stringify({ message: "successful", data: isUserExist }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Set-Cookie": serialized,
              },
            }
          );
        }
        return new Response(
          JSON.stringify({ message: "Invalid credentials" }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      const newUser = User({
        email: decryptEmail,
        password: password,
        isAdmin: true,
      });

      const savedUser = await newUser.save();
      return new Response(
        JSON.stringify({ message: "successful", data: savedUser }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(
      JSON.stringify({ message: "Sorry you are unauthorized" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
