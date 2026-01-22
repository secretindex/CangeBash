"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table"
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
  return (
    <section className="min-h-screen w-full py-10 flex flex-col items-center">
      <div className="w-3/4">
        <div className="mb-10 w-full">
          <h2 className="text-2xl font-bold">Acervo Tiflux</h2>
          <span className="text-gray-500">
            Onde estão todos os tickets do antigo sistema Tiflux
          </span>
        </div>
        <div className="panel h-3/5 w-9/12 grid grid-cols-3 gap-4">
          <Input placeholder="Buscar ticket" className="outline-none" />
          <Table>
            <TableHeader>
              
            </TableHeader>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default TifluxPage;
