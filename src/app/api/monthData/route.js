import { connectionStr } from "@/app/utils/db";
import { Result } from "@/app/utils/models/results";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await mongoose.connect(connectionStr);
    const url = new URL(req.url);
    const month = url.searchParams.get("month");
    const year = url.searchParams.get("year");
    const query = {
      ...(month && { month }),
      ...(year && { year }),
    };

    const results = await Result.find(query);

    return new Response(
      JSON.stringify({ message: "successfully", data: results }),
      {
        status: 200,
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
