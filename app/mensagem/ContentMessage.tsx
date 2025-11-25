"use client";

import mockConversas from "@/components/message_api_mock";
import MessageList from "@/components/MessageList";
import SummarizedText from "@/components/SummarizedText";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const ContentMessage = () => {
  const searchParams = useSearchParams();
  const conversaId = searchParams.get("conversa_id");
  console.log(conversaId);

  return (
    <div className="h-full w-2/5 p-8 py-4 flex flex-col gap-8 shadow-md justify-between rounded-md border-[1px] border-stone-400/50">
      <h1 className="text-center text-xl font-bold">Informações da Mensagem</h1>
      <div className="flex flex-col gap-3 h-4/5 overflow-clip">
        {/* Add information about conversation and button to "resumir with AI" */}
        {mockConversas
          .find((c) => c.conversaId === conversaId)!
          .mensagens.map((mensagem, index) => {
            return (
              <MessageList
                key={index}
                time={
                  new Date(mensagem.sentAt)
                    .toLocaleString()
                    .split(", ")[1] as string
                }
                name={mensagem.from}
                message={mensagem.mensagem}
              />
            );
          })}
      </div>
      <div className="flex gap-2">
        <SummarizedText conversaId={conversaId as string} />

        <Link href="/">
          <Button variant={"outline"} className="cursor-pointer">
            <Home />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ContentMessage;
