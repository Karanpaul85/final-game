import { connectionStr } from "@/app/utils/db";
import { Result } from "@/app/utils/models/results";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await mongoose.connect(connectionStr);
    const url = new URL(req.url);
    const day = url.searchParams.get("day");
    console.log(day, "day");
    const query = day ? { day } : {};
    const results = await Result.find();
    if (results) {
      return new Response(
        JSON.stringify({ message: "successfully", data: results }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
