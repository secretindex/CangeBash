"use server";

<<<<<<< HEAD
import { TicketCommunication } from "@/components/tiflux_archive/TicketComunication";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";
import { Calendar, Info, Mail, User2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

import useSWR from "swr";

type TicketResponse = {
  ticket: any;
  description: any;
  communications: any[];
};

const fetchTicket = async (ticket_number: string): Promise<TicketResponse> => {
  const supabase = createClient();

  const { data: ticket } = await supabase
    .from("tiflux_tickets")
    .select("*")
    .eq("ticket_number", ticket_number)
    .single();

  const { data: description } = await supabase
    .from("ticket_description")
    .select("*")
    .eq("ticket_number", ticket_number)
    .single();

  const { data: communications } = await supabase
    .from("ticket_answers")
    .select("*")
    .eq("ticket_number", ticket_number)
    .order("answer_time", { ascending: true });

  return {
    ticket,
    description,
    communications: communications || [],
  };
};

export default function TifluxTicketPage() {
  const params = useParams();
  const router = useRouter();
  const ticket_number = params?.ticket_number as string | undefined;

  const { data, error, isLoading } = useSWR<TicketResponse | null>(
    ticket_number ? ["ticket", ticket_number] : null,
    async () => await fetchTicket(ticket_number!)
  );

  const ticket = data?.ticket;
  const description = data?.description;
  const communications = data?.communications || [];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full gap-4">
      <Button
        variant="ghost"
        className="self-start ml-20 mt-6"
        onClick={() => router.push("/tiflux")}
      >
        &larr; Voltar ao Acervo
      </Button>
      <div id="general-info header" className="flex flex-col w-11/12 gap-4">
        <div className="flex flex-col justify-center gap-2 rounded-md border shadow-sm p-4 w-full">
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <h2 className="text-lg font-bold">#{ticket_number}</h2>
              <div className="text-xl text-gray-500">
                {ticket ? ticket.title : "Ticket não encontrado"}
              </div>
            </div>
            <div className="flex gap-1">
              <Badge className="bg-violet-100 text-violet-800">
                {ticket?.status?.name}
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                {ticket?.stage?.name}
              </Badge>
            </div>
          </div>
          <div>
            <Calendar className="inline-block mr-2 mb-1 h-4 w-4 text-gray-500" />
            <span className="text-gray-500">
              Criado em: {" "}
              {ticket
                ? new Date(ticket.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                : "N/A"}
            </span>
          </div>
          <div className="flex gap-3">
            <div>
              <User2 className="inline-block mr-2 mb-1 h-4 w-4 text-gray-500" />
              <span className="text-gray-500">
                Responsável: {ticket?.responsible?.name || "N/A"}
              </span>
            </div>
            <div>
              <User2 className="inline-block mr-2 mb-1 h-4 w-4 text-gray-500" />
              <span className="text-gray-500">
                Cliente: {ticket?.client?.name || "N/A"}
              </span>
            </div>
          </div>
          <div className="flex">
            <div className="">
              <Mail className="inline-block mr-2 mb-1 h-4 w-4 text-gray-500" />
              <span className="text-gray-500">
                Solicitante: {" "}
                {ticket?.requestor?.email || ticket?.requestor?.name || "N/A"}
              </span>
            </div>
            <span className="mx-4">|</span>
            <div>
              <Mail className="inline-block mr-2 mb-1 h-4 w-4 text-gray-500" />
              <span className="text-gray-500">
                Seguidores: {ticket?.followers?.replace(",", ", ") || "N/A"}
              </span>
            </div>
          </div>
          <div>
            <Info className="inline-block mr-2 mb-1 h-4 w-4 text-gray-500" />
            <span className="text-gray-500">
              Status: {ticket?.stage?.name || "N/A"} | {" "}
              {ticket?.status?.name || "N/A"}
            </span>
          </div>
          <Separator className="mt-2" />
          <div className="w-full flex flex-col gap-2">
            <h3 className="text-lg font-bold">Descrição</h3>
            <div
              className="text-gray-600 text-[0.905rem]"
              dangerouslySetInnerHTML={{
                __html:
                  description?.description || "Nenhuma descrição disponível.",
              }}
            />
          </div>
        </div>
        <div className="border rounded-md shadow-sm p-4 ">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold mb-4">Comunicação</h3>
            <Badge className="mb-4 bg-green-200 text-zinc-800">
              {communications?.length || 0} Mensagens
            </Badge>
          </div>
          <div>
            <TicketCommunication messages={communications || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
=======
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
>>>>>>> c36e6c9c0a0292f56ed306541209d8d16e086c2b
