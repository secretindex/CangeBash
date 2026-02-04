"use client";

import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";

// import { Textarea } from "./ui/textarea";
import { Copy } from "lucide-react";

import mockConversas from "./message_api_mock";
import axios from "axios";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import useSWR from "swr";

const fetcher = async (conversaId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("conversations").select("*").eq("id", conversaId);

  if (error) {
    throw error;
  }

  return data[0];
};

const SummarizedText = ({ conversaId }: { conversaId: string }) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, error } = useSWR(conversaId, fetcher);

  console.log("data ", data)

  const handleSummarizeWithAI = async () => {
    console.log("this is ai message");
    const response = await axios.post("/api/summarize", {
      messages: data?.message?.ticket?.messages,
    });

    console.log("response.data ", response.data);

    if (response.data.aiMessage) {
      setIsLoading(false);
      setMessage(response.data.aiMessage);
    }
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    toast.message("Mensagem copiada para área de transferência");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger
          onClick={handleSummarizeWithAI}
          className="cursor-pointer w-full justify-center border-[1px] border-stone-500/30 text-black flex transition-all duration-300 -out items-center hover:bg-[#ddd5] text-sm gap-2 p-2 rounded-md ease-in-out"
        >
          Resumir o texto com <b>IA</b>
          <Sparkles size={"16px"} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resumo do atendimento</DialogTitle>
            <DialogDescription>
              <InputGroup>
                <div className="p-2 text-stone-700">
                  {isLoading ? (
                    <div className="flex gap-1 items-center text-sm">
                      <Spinner />
                      Gerando resumo
                    </div>
                  ) : (
                    message
                  )}
                </div>
                <InputGroupAddon align="block-end">
                  <InputGroupButton
                    className="ml-auto bg-transparent hover:bg-transparent text-stone-800 border border-stone-400/30"
                    size="sm"
                    variant="outline"
                    onClick={handleCopyMessage}
                  >
                    <Copy />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SummarizedText;
