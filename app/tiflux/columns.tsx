import { ColumnDef } from "@tanstack/react-table";

export type Ticket = {
  id: string;
  ticket_number: number;
  title: string;
  created_at: string;
  responsible: string;
};

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "ticket_number",
    header: "Número",
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "responsible",
    header: "Responsável",
  },
  {
    accessorKey: "created_at",
    header: "Criado em",
  },
];
