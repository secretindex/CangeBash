import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: "hello", status: "ok" });
  } catch (error) {
    return NextResponse.json({ message: error, status: "fail" });
  }
}
