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
    if (!mongoose.connection.readyState) {
      await mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    const { title, description, keywords, topContent, footerContent } =
      await req.json();

    // Find existing document
    let existingData = await SearchDataContent.findOne();

    if (existingData) {
      // Update existing document
      existingData.pageTitle = title || existingData.pageTitle;
      existingData.pageDescription =
        description || existingData.pageDescription;
      existingData.pageKeywords = keywords || existingData.pageKeywords;
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
      const newData = new SearchDataContent({
        pageTitle: title ?? "Default title",
        pageDescription: description ?? "Default description",
        pageKeywords: keywords ?? "Default keywords",
        topContent: topContent ?? "",
        footerContent: footerContent ?? "",
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
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
