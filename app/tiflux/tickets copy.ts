import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const { data: tickets } = await supabase
  .from("tiflux_tickets")
  .select(`*`)
  .order("ticket_number", { ascending: false });

export const ticketsData = tickets;
