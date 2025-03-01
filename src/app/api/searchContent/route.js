import { connectionStr } from "@/app/utils/db";
import { SearchDataContent } from "@/app/utils/models/search";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await mongoose.connect(connectionStr);
    const response = await SearchDataContent.findOne();

    return new Response(
      JSON.stringify({ success: true, data: response || [] }),
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

export async function POST(req) {
  try {
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { topContent, footerContent } = await req.json();

    // Find existing document
    let existingData = await SearchDataContent.findOne();

    if (existingData) {
      // Update existing document
      existingData.topContent = topContent || existingData.topContent;
      existingData.footerContent = footerContent || existingData.footerContent;
      const updated = await existingData.save();

      return new Response(
        JSON.stringify({
          success: true,
          message: "Data updated",
          data: updated,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // Create new document
      const newData = new SearchDataContent({ topContent, footerContent });
      const savedData = await newData.save();

      return new Response(
        JSON.stringify({
          success: true,
          message: "New data added",
          data: savedData,
        }),
        {
          status: 201,
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
