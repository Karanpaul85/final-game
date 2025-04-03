import { connectionStr } from "@/app/utils/db";
import mongoose from "mongoose";
import Cryptr from "cryptr";
import { User } from "@/app/utils/models/user";

const cryptr = new Cryptr(process.env.NEXT_PUBLIC_CRYPTR_SECRET);

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
          return new Response(
            JSON.stringify({ message: "successful", data: isUserExist }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
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
      JSON.stringify({ message: "Sorry there is no account with this email" }),
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
