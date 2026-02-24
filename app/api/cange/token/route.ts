import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANGE_API_URL}/token`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Origin": `https://${process.env.NEXT_PUBLIC_CANGE_API_URL}`
      },
    }).then((res) => res.json())

    return NextResponse.json({ message: response, status: "ok" });
  } catch (error) {
    return NextResponse.json({ message: error, status: "fail" });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, apikey } = body;
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANGE_API_URL}/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": process.env.NEXT_PUBLIC_CANGE_API_URL as string
      },
      body: JSON.stringify({
        email,
        apikey,
      }),
    }).then((res) => res.json());

    return NextResponse.json({ message: response, status: "ok" });
  } catch (error) {
    return NextResponse.json({ message: error, status: "fail" });
  }
}