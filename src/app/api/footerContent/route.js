import { connectionStr } from "@/app/utils/db";
import { FooterContent } from "@/app/utils/models/footerConetnt";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await mongoose.connect(connectionStr);
    const response = await FooterContent.findOne();
    return new Response(
      JSON.stringify({ success: true, data: response || {} }),
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
    if (!mongoose.connection.readyState) {
      await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    const { content } = await req.json();

    // Find existing document
    let existingData = await FooterContent.findOne();

    if (existingData) {
      // Update existing document
      existingData.content = content || existingData.content;

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
      const newData = new FooterContent({
        content,
      });

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
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
