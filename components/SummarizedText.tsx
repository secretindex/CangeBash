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

import { Textarea } from "./ui/textarea";
import { Copy } from "lucide-react";

import mockConversas from "./message_api_mock";
import axios from "axios";

import { Sparkles } from "lucide-react";
import { useState } from "react";

const SummarizedText = () => {
  const [message, setMessage] = useState<string>("");

  const handleSummarizeWithAI = async () => {
    console.log("this is ai message");
    const response = await axios.post("/api/summarize", {
      messages: mockConversas[0].mensagens,
    });

    console.log(response.data);

    setMessage(response.data.aiMessage);
  };
  
  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger
          onClick={handleSummarizeWithAI}
          className="cursor-pointer w-full justify-center border-[1px] border-stone-500/30 text-black flex items-center hover:bg-[#ddd5] hover:text-white transition-all text-sm gap-2 p-2 rounded-md ease-in-out"
        >
          Resumir o texto com IA
          <Sparkles size={"16px"} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resumo do atendimento</DialogTitle>
            <DialogDescription>
              <InputGroup>
                <div className="p-2">{message}</div>
                <InputGroupAddon align="block-end">
                  <InputGroupButton
                    className="ml-auto"
                    size="sm"
                    variant="default"
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
