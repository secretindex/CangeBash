import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
    
    return NextResponse.json({ message: "hello", status: 200 });
  } catch (error) {}
}