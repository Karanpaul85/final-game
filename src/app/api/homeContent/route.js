import { connectionStr } from "@/app/utils/db";
import { HomeDataContent } from "@/app/utils/models/home";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await mongoose.connect(connectionStr);
    const response = await HomeDataContent.findOne();

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
    let existingData = await HomeDataContent.findOne();

    if (existingData) {
      // Update existing document
      existingData.topContent = topContent || existingData.topContent;
      existingData.footerContent = footerContent || existingData.footerContent;
      const updated = await existingData.save();
      //   console.log(updated, "Updated Data ✅");

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
      const newData = new HomeDataContent({ topContent, footerContent });
      const savedData = await newData.save();
      //   console.log(savedData, "New Data Added ✅");

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
