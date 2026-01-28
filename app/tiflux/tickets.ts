import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const { data: tickets } = await supabase
  .from("tiflux_tickets")
  .select(`*`)
  .order("ticket_number", { ascending: false });

export type Ticket = {
  ticket_number: number;
  client: {
    id: number;
    name: string;
  };
  created_at: string;
  created_by_id: number;
  created_by_way_of: string;
  desk: {
    id: number;
    name: string;
  };
  followers: string;
  is_closed: boolean;
  is_revised: boolean;
  last_answer_type: null | string;
  priority: {
    id: number;
    name: string;
  };
  reopen_count: number;
  requestor: {
    id?: number | null;
    email?: string | null;
    name?: string | null;
    ramal?: string | null;
    telephone?: string | null;
  };
  responsible: {
    id: number;
    name: string;
  };
  services_catalog?: any; // Adjust type if needed
  sla_info?: any; // Adjust type if needed
  stage?: any; // Adjust type if needed
  status?: any; // Adjust type if needed
  title?: string | null; // Adjust type if needed
};

export const ticketsData = tickets;
