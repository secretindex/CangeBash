"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

import axios from "axios";
import mockConversas from "@/components/message_api_mock";
import MessageList from "@/components/MessageList";
import { Toaster } from "@/components/ui/sonner";
import SummarizedText from "@/components/SummarizedText";

const PageEmbed = () => {
  const handleSummarizeWithAI = async () => {
    console.log("this is ai message");
    const response = await axios.post("/api/summarize", {
      aiMessage: mockConversas[0].mensagens,
    });

    console.log(response.data);
  };

  return (
    <section className="p-4 w-5/6 h-[560px] flex gap-4">
      <div className="p-2 w-3/5 rounded-md border-[1px] shadow-md border-stone-400/50">
        <iframe
          src="https://form.cange.me/public/c0laVkpkU1hwUmhQUjdYYi9JdG5UQT09"
          className="w-full h-full"
        />
      </div>

      <div className="h-full w-2/5 p-2 py-4 flex flex-col shadow-md justify-between rounded-md border-[1px] border-stone-400/50">
        <h1 className="text-center text-xl font-bold">
          Informações da Mensagem
        </h1>
        <div className="flex flex-col gap-3 h-4/5 overflow-clip">
          {/* Add information about conversation and button to "resumir with AI" */}
          {mockConversas[0].mensagens.map((mensagem, index) => {
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
          <SummarizedText />
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default PageEmbed;
