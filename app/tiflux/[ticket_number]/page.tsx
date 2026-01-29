"use server";

import { createClient } from "@/utils/supabase/server";

const TifluxTicketPage = async ({ params }: { params: { ticket_number: string } }) => {
  const supabase = await createClient();

  const { data: ticketData, error } = await supabase
    .from("tiflux_tickets")
    .select("*")
    .eq("ticket_number", params.ticket_number)
    .single();


  console.log("Ticket Data:", ticketData);

  if (error) {
    return <div>Error loading ticket: {error.message}</div>;
  } else {
    return <div>Tiflux Ticket Page {ticketData?.ticket_number} and {ticketData?.title}</div>;
  }
};

export default TifluxTicketPage;