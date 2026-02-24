import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const flowId = url.searchParams.get('flow_id');
    const token = url.searchParams.get('token');

    const response = await fetch(`${process.env.NEXT_PUBLIC_CANGE_API_URL}/card/by-flow?flow_id=${flowId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Origin": process.env.NEXT_PUBLIC_CANGE_API_URL as string
      },
    }).then((res) => res.json())


    return NextResponse.json({ message: response, status: "ok" });
  } catch (error) {
    return NextResponse.json({ message: error, status: "fail" });
  }
}
