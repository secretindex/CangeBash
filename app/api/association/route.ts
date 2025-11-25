import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    const { flux_id, card_id, conversa_id } = await req.json();

    const { data, error } = await supabase
      .from("conversas")
      .insert({ flux_id, card_id, conversa_id });

    if (error) throw new Error(error.message);

    return NextResponse.json({ message: data, status: "ok" });
  } catch (error) {
    return NextResponse.json({ error: error, status: "fail" });
  }
}
