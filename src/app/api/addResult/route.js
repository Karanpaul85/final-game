import { connectionStr } from "@/app/utils/db";
import { Result } from "@/app/utils/models/results";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await mongoose.connect(connectionStr);
    const body = await req.json();
    const { date, month, year, results } = body;
    console.log(results, "sdsdsdsd");

    const isTodayExist = await Result.findOne({ date, month, year });
    if (isTodayExist) {
      isTodayExist.results = results;

      const updateResult = await isTodayExist.save();
      return new Response(
        JSON.stringify({ message: "Updated successfully", data: updateResult }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      const updatedResults = results.map((item) => ({
        area: item.area,
        areaId: item.areaId,
        drawTime: item.time || "", // Ensure time exists
        luckyWinner: item.winner || "", // Ensure winner exists
        totalEntries: item.entries || "", // Ensure entries exist
      }));

      const addNewResult = new Result({
        date,
        month,
        year,
        results: updatedResults,
      });

      const saveResult = await addNewResult.save();
      return new Response(
        JSON.stringify({ message: "Saved successfully", data: saveResult }),
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
