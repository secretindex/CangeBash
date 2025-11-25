import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    const body = await req.json();

    console.log(body);

    const { data, error } = await supabase
      .from("conversations")
      .insert({ message: body as JSON });

    if (error) throw new Error(error.message);

    return NextResponse.json({ data, status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e, status: 400 });
  }
}
