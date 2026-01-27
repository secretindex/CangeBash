"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import TicketCard from "@/components/tiflux_archive/TicketCard";
import { ticketsData } from "./tickets";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import DataTableDemo from "@/components/tiflux_archive/TicketsTable";

//{ticketsData.map((ticket: any) => (
//  <TicketCard
//   key={ticket.ticket_number}
//   ticket_number={ticket.ticket_number}
//   title={ticket.title}
//   created_at={ticket.created_at}
//   desk_name={ticket.desk.name}
//   followers={ticket.followers}
//   requestor={ticket.requestor}
//   responsible={ticket.responsible.name}
// />
//))}

const TifluxPage = () => {
  const uploadTickets = async () => {
    try {
      const response = await fetch("/api/upload_ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketsData),
      });

      const data = await response.json();
      console.log("Upload response:", data);
    } catch (error) {
      console.error("Error uploading tickets:", error);
    }
  };

  return (
    <section className="min-h-screen w-full py-10 flex flex-col items-center">
      <div className="w-3/4 gap-4 flex flex-col">
        <div className="mb-4 w-full">
          <h2 className="text-2xl font-bold">Acervo Tiflux</h2>
          <span className="text-gray-500">
            Onde estão todos os tickets do antigo sistema Tiflux
          </span>
        </div>
        <div>
          <Button variant="default" className="cursor-pointer" onClick={uploadTickets}>Subir tickets</Button>
        </div>
        <div className="panel h-3/5 w-9/12 grid grid-cols-3 gap-4">
          <DataTableDemo />
        </div>
      </div>
    </section>
  );
};

export default TifluxPage;
