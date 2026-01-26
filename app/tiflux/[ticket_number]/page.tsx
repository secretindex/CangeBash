"use client";

import { useParams } from "next/navigation";

const TifluxTicketPage = () => {
  const params = useParams();
  return <div>Tiflux Ticket Page {params.ticket_number}</div>;
};
