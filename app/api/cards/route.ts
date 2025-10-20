import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: "hello", status: 200 });
  } catch (error) {}
}
