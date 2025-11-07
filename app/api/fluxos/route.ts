import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    // const { data, error } = await supabase.from("")

    return NextResponse.json({ message: "hello", status: 200 });
  } catch (error) {}
}
