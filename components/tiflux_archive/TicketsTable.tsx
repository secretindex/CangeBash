"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import useSWR from "swr";
import { Ticket } from "@/app/tiflux/tickets";

import { useRouter } from "next/navigation";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const columns: ColumnDef<Ticket>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ticket_number",
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1"
        >
          Ticket
          {sorted === "asc" ? (
            <ArrowUp className="w-4 h-4" />
          ) : sorted === "desc" ? (
            <ArrowDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-4 h-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("ticket_number")}</div>
    ),
    filterFn: (row, columnId, filterValue: unknown) => {
      const cell = row.getValue(columnId);
      if (
        filterValue === undefined ||
        filterValue === null ||
        String(filterValue) === ""
      )
        return true;
      return String(cell).startsWith(String(filterValue));
    },
  },
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "requestor",
    header: "Solicitante",
    cell: ({ row }) => {
      const requestor = row.original.requestor;
      return <div>{requestor?.email || requestor?.name || "N/A"}</div>;
    },
  },
  {
    accessorKey: "responsible",
    header: "Responsável",
    cell: ({ row }) => {
      const responsible = row.original.responsible;
      return <div>{responsible?.name || "N/A"}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Data Criação",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return <div>{date.toLocaleDateString("pt-BR")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ticket = row.original;
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/tiflux/ticket/${ticket.ticket_number}`)
                }
              >
                Abrir
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
              <DropdownMenuItem>Ver solicitante</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TifluxTable() {
  const router = useRouter();

  const SORT_KEY = "tiflux:tickets:sorting:v1";

  const [sorting, setSorting] = React.useState<SortingState>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(SORT_KEY);
      return raw ? (JSON.parse(raw) as SortingState) : [];
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    try {
      const t = setTimeout(() => {
        localStorage.setItem(SORT_KEY, JSON.stringify(sorting));
      }, 200);
      return () => clearTimeout(t);
    } catch {}
  }, [sorting]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // pagination + filters (use table-controlled pagination: pageIndex is 0-based)
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 50,
  });
  const [rawTitle, setRawTitle] = React.useState("");
  const [rawTicket, setRawTicket] = React.useState("");
  const [titleFilter, setTitleFilter] = React.useState("");
  const [ticketFilter, setTicketFilter] = React.useState("");

  // debounce raw inputs to reduce requests
  React.useEffect(() => {
    const t = setTimeout(() => {
      setTitleFilter(rawTitle);
      setPagination((p) => ({ ...p, pageIndex: 0 }));
    }, 350);
    return () => clearTimeout(t);
  }, [rawTitle]);

  React.useEffect(() => {
    const t = setTimeout(() => {
      setTicketFilter(rawTicket);
      setPagination((p) => ({ ...p, pageIndex: 0 }));
    }, 250);
    return () => clearTimeout(t);
  }, [rawTicket]);

  const {
    data: pageData,
    error,
    isValidating,
  } = useSWR(
    (() => {
      const sortField = sorting?.[0]?.id ?? "ticket_number";
      const sortDir = sorting?.[0]?.desc ? "desc" : "asc";
      return `/api/tiflux/tickets?page=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize}&title=${encodeURIComponent(
        titleFilter,
      )}&ticket=${encodeURIComponent(ticketFilter)}&sortField=${encodeURIComponent(sortField)}&sortDir=${encodeURIComponent(sortDir)}`;
    })(),
    fetcher,
  );

  const data: Ticket[] = pageData?.tickets ?? [];
  const total = pageData?.total ?? 0;

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: Math.max(1, Math.ceil(total / pagination.pageSize)),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por número do ticket..."
          value={rawTicket}
          onChange={(event) => {
            setRawTicket(event.target.value);
          }}
          className="max-w-xs mr-4"
        />
        <Input
          placeholder="Filtrar por título..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Ir para o ticket"
          className="max-w-xs ml-4"
          type="number"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = (e.target as HTMLInputElement).value;
              if (value.trim() !== "") {
                router.push(`/tiflux/${value.trim()}`);
              }
            }
          }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          Showing {pagination.pageIndex * pagination.pageSize + 1} -{" "}
          {Math.min((pagination.pageIndex + 1) * pagination.pageSize, total)} of{" "}
          {total} tickets
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((p) => ({
                ...p,
                pageIndex: Math.max(0, p.pageIndex - 1),
              }))
            }
            disabled={pagination.pageIndex <= 0 || isValidating}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPagination((p) => ({ ...p, pageIndex: p.pageIndex + 1 }))
            }
            disabled={
              (pagination.pageIndex + 1) * pagination.pageSize >= total ||
              isValidating
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
export default TifluxTable;
