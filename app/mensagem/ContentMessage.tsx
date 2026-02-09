"use client";

import MessageList from "@/components/MessageList";
import SummarizedText from "@/components/SummarizedText";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { createClient } from "@/utils/supabase/client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const fetcher = async (conversa_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("conversations").select("*").eq("id", conversa_id);

  if (error) {
    throw error;
  }

  return data[0];
};

const ContentMessage = () => {
  const searchParams = useSearchParams();
  const conversaId = searchParams.get("conversa_id");
  const { data, error } = useSWR(conversaId, fetcher);

  console.log("data ", data)

  return (
    <div className="h-full min-w-md w-2xl p-8 py-4 bg-card flex flex-col gap-8 shadow-md justify-between rounded-md border-[1px] border-stone-400/50">
      <h1 className="text-center text-xl font-bold">Informações da Mensagem</h1>
      <div className="flex flex-col gap-3 h-4/5 overflow-clip">
        <ScrollArea className="h-[400px] w-full overflow-hidden">
          <ScrollBar orientation="vertical" />
          <div className="flex flex-col gap-2">
            {/* Add information about conversation and button to "resumir with AI" */}
            {data?.message?.ticket?.messages.sort((a: any, b: any) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()).map((mensagem: any) => {
              return (
                <MessageList
                  key={mensagem.id}
                  messageId={mensagem.id}
                  isAtendente={mensagem.userId === null ? false : true}
                  isBot={mensagem.sendType === "bot" ? true : false}
                  time={
                    new Date(mensagem.updatedAt)
                      .toLocaleString()
                      .split(", ")[1] as string
                  }
                  name={mensagem.userId === null ? data?.message?.ticket?.contact?.name : data?.message?.ticket?.user?.name}
                  mediaUrl={mensagem.mediaUrl}
                  message={mensagem.body}
                />
              );
            })}
          </div>
        </ScrollArea>
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
