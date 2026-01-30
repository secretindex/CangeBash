import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "50", 10);
    const title = url.searchParams.get("title") || "";
    const ticket = url.searchParams.get("ticket") || "";

    const from = (Math.max(page, 1) - 1) * pageSize;
    const to = from + pageSize - 1;

    const supabase = await createClient();

    // Build count query (head:true) to get exact total matching filters
    // select a single indexed column for count to make the count query lighter
    let countQuery = supabase
      .from("tiflux_tickets")
      .select("ticket_number", { count: "exact", head: true });

    if (title) {
      countQuery = countQuery.ilike("title", `%${title}%`);
    }

    if (ticket) {
      const numeric = Number(ticket);
      if (!Number.isNaN(numeric)) {
        countQuery = countQuery.filter("ticket_number", "gte", numeric);
      }
    }

    const { count, error: countError } = await countQuery;
    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    // Build data query and apply same filters, then use range for pagination
    let dataQuery = supabase
      .from("tiflux_tickets")
      .select("*");

    // apply server-side sorting if provided
    const sortFieldParam = url.searchParams.get("sortField");
    const sortDirParam = url.searchParams.get("sortDir");
    const allowedSortFields = ["ticket_number", "title", "created_at"];
    const sortField = allowedSortFields.includes(String(sortFieldParam))
      ? String(sortFieldParam)
      : "ticket_number";
    const ascending = String(sortDirParam).toLowerCase() === "asc";
    dataQuery = dataQuery.order(sortField, { ascending });

    if (title) {
      dataQuery = dataQuery.ilike("title", `%${title}%`);
    }

    if (ticket) {
      const numeric = Number(ticket);
      if (!Number.isNaN(numeric)) {
        dataQuery = dataQuery.filter("ticket_number", "gte", numeric);
      }
    }

    const { data, error } = await dataQuery.range(from, to);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ tickets: data ?? [], total: count ?? 0 });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
