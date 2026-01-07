import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient()
  try {
  } catch (e) {
    return NextResponse.json({ message: e, status: "fail" });
  }
}
