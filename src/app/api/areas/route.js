import { connectionStr } from "@/app/utils/db";
import { Area } from "@/app/utils/models/areas";
import mongoose from "mongoose";

export async function GET() {
  try {
    await mongoose.connect(connectionStr);
    const isAreasExist = await Area.find();
    return new Response(
      JSON.stringify({ message: "successful", data: isAreasExist }),
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
    await mongoose.connect(connectionStr);
    const body = await req.json();

    // Check if an entry already exists
    const existingAreas = await Area.findOne();

    if (existingAreas) {
      // Update existing entry
      existingAreas.areas = body; // Overwrite areas array
      const updatedAreas = await existingAreas.save();

      return new Response(
        JSON.stringify({ message: "Updated successfully", data: updatedAreas }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // Create a new entry
      const newArea = new Area({ areas: body });
      const savedAreas = await newArea.save();

      return new Response(
        JSON.stringify({ message: "Created successfully", data: savedAreas }),
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

export async function DELETE(req) {
  try {
    await mongoose.connect(connectionStr);
    const body = await req.json();
    const { areaId } = body;

    const result = await Area.updateOne({}, { $pull: { areas: { areaId } } });

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
