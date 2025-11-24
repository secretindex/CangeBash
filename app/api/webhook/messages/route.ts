import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const body = await req.json();

    console.log(body);

    const { data, error } = await supabase
      .from("conversations")
      .insert({ conversations: body });

    if (error) throw new Error(error.message);

    return NextResponse.json({ data, status: 200 });
  } catch (e) {
    return NextResponse.json({ message: Error });
  }
}
