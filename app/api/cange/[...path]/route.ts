import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const CANGE_ORIGIN = "https://api.cange.me";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathArr } = await params;
  const path = pathArr.join("/");
  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${CANGE_ORIGIN}/${path}${searchParams ? `?${searchParams}` : ""}`;

  console.log(`[PROXY GET] ${url}`);

  const proxyHeaders = new Headers();
  proxyHeaders.set("Origin", CANGE_ORIGIN);
  proxyHeaders.set("Content-Type", "application/json");

  // Only copy specific headers if they exist and are useful
  if (request.headers.get("accept")) {
    proxyHeaders.set("accept", request.headers.get("accept")!);
  }

  try {
    const supabase = await createClient();
    const { data: tokenData, error: tokenError } = await supabase
      .from("cange-token")
      .select("token")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (tokenError) {
      console.error("[PROXY] Supabase error fetching token:", tokenError);
    }

    if (tokenData?.token) {
      proxyHeaders.set("Authorization", `Bearer ${tokenData.token}`);
    } else {
      console.warn("[PROXY] No token found in database for GET request");
    }
  } catch (err) {
    console.error("[PROXY] Exception fetching token from DB:", err);
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: proxyHeaders,
    });

    const resContentType = response.headers.get("content-type");
    if (resContentType && resContentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      const text = await response.text();
      return new NextResponse(text, {
        status: response.status,
        headers: { "Content-Type": resContentType || "text/plain" }
      });
    }
  } catch (error) {
    console.error("[PROXY] Error proxying GET request to Cange:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathArr } = await params;
  const path = pathArr.join("/");
  const url = `${CANGE_ORIGIN}/${path}`;

  console.log(`[PROXY POST] ${url}`);

  const proxyHeaders = new Headers();
  proxyHeaders.set("Origin", CANGE_ORIGIN);
  proxyHeaders.set("Content-Type", "application/json");

  if (request.headers.get("accept")) {
    proxyHeaders.set("accept", request.headers.get("accept")!);
  }

  // Fetch token from DB, unless it's the session endpoint
  if (path !== "session") {
    try {
      const supabase = await createClient();
      const { data: tokenData, error: tokenError } = await supabase
        .from("cange-token")
        .select("token")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (tokenError) {
        console.error("[PROXY] Supabase error fetching token:", tokenError);
      }

      if (tokenData?.token) {
        proxyHeaders.set("Authorization", `Bearer ${tokenData.token}`);
      } else {
        console.warn("[PROXY] No token found in database for POST request");
      }
    } catch (err) {
      console.error("[PROXY] Exception fetching token from DB:", err);
    }
  }

  try {
    const bodyText = await request.text();
    console.log(`[PROXY POST] Raw body text: ${bodyText.substring(0, 100)}${bodyText.length > 100 ? "..." : ""}`);
    let body = null;
    if (bodyText) {
      try {
        body = JSON.parse(bodyText);
        console.log("[PROXY POST] Parsed JSON body successfully");
      } catch (e) {
        console.warn("[PROXY POST] Failed to parse JSON body, using raw text");
        body = bodyText;
      }
    }

    const response = await fetch(url, {
      method: "POST",
      headers: proxyHeaders,
      body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : null,
    });

    const resContentType = response.headers.get("content-type");
    if (resContentType && resContentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      const text = await response.text();
      return new NextResponse(text, {
        status: response.status,
        headers: { "Content-Type": resContentType || "text/plain" }
      });
    }
  } catch (error) {
    console.error("[PROXY] Error proxying POST request to Cange:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
