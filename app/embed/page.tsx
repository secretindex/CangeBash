"use client";

// import axios from "axios";
import mockConversas from "@/components/message_api_mock";
import MessageList from "@/components/MessageList";
import { Toaster } from "@/components/ui/sonner";
import SummarizedText from "@/components/SummarizedText";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Spinner } from "@/components/ui/spinner";

const PageEmbed = () => {
  const searchParams = useSearchParams();
  const fluxId = searchParams.get("flux_id");
  const conversaId = searchParams.get("conversa_id");
  const [formLink, setFormLink] = useState<string>("");

  console.log(fluxId);

  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("fluxos")
      .select("*")
      .eq("fluxo_id", fluxId)
      .then((res) => {
        console.log(res.data);
        if (res.data) setFormLink(res.data![0].formulario);
      });
  }, [fluxId]);

  return (
    <section className="p-4 w-5/6 h-[560px] flex gap-4">
      <div className="p-2 w-3/5 rounded-md border-[1px] flex flex-col justify-center items-center shadow-md border-stone-400/50">
        {formLink === "" ? (
          <Spinner />
        ) : (
          <iframe src={formLink} className="w-full h-full" />
        )}
      </div>

      <div className="h-full w-2/5 p-2 py-4 flex flex-col shadow-md justify-between rounded-md border-[1px] border-stone-400/50">
        <h1 className="text-center text-xl font-bold">
          Informações da Mensagem
        </h1>
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
        <div>
          <SummarizedText conversaId={conversaId as string} />
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default PageEmbed;
