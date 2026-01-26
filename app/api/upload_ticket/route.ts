import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const ticketData = await req.json();

    const { error } = await supabase.from("tiflux_tickets").insert(ticketData);

    console.log("Received ticket data:", ticketData);
    if (error) {
      console.error("Error inserting ticket:", error);
      throw error;
    }

    return NextResponse.json({
      message: "Ticket uploaded successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error uploading ticket",
      status: 500,
    });
  }
}
