"use client";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useContext } from "react";

import { Search } from "lucide-react";
import GetCard from "@/components/GetCard";
import { createClient } from "@/utils/supabase/client";
import useSWR from "swr";
import {
  CardAndFlux,
  CardAndFluxContext,
} from "@/components/context/CardAndFlux";
import { TokenContext } from "@/components/context/CangeToken";

const fetcher = async (table: string) => {
  const client = createClient();
  const { data } = await client.from(table).select("*");

  return data as Array<{
    id: number;
    fluxo_id: number;
    nome: string;
    created_at: string;
  }>;
};

export default function Home() {
  const { data, error, isLoading, mutate } = useSWR("fluxos", fetcher);
  const cnfContext = useContext(CardAndFluxContext);
  const tokenContext = useContext(TokenContext);

  const router = useRouter();

  const [cards, setCards] = useState<Array<any>>([]);
  const [flux, setFlux] = useState<number>();

  const [idCard, setIdCard] = useState<number>(0);

  useEffect(() => {
    if (cards.length > 0) toast.success("Preenchido todos os cards!");
  }, [cards]);

  useEffect(() => {
    console.log(idCard);
  }, [idCard]);

  const handleGetCards = async () => {
    if (!flux) {
      toast.error("Selecione um fluxo!");

      return;
    }

    const response = await fetch(`https://api.cange.me/card/by-flow?flow_id=${flux}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenContext?.token}`,
      },
    }).then((res) => res.json())

    if (response.status === 401) {
      toast.error("Token expirado. Peça para o administrador atualizar o token.");
      return;
    }

    if (response.length <= 0) {
      toast.error("Nenhum cartão foi encontrado neste fluxo");
      return;
    }

    if (!response) return;

    setCards(response);
  };

  const handleSelectCards = (e: string | number) => {
    if (e) {
      setIdCard(e as number);

      cnfContext?.setCardAndFlux(
        (prev) => ({ ...prev, cardId: e as number }) as CardAndFlux,
      );
    }
  };

  const handleSelectFlux = (e: string | number) => {
    if (e) {
      setFlux(e as number);

      cnfContext?.setCardAndFlux(
        (prev) => ({ ...prev, fluxId: e as number }) as CardAndFlux,
      );
    }
  };

  return (
    <div className="font-sans w-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-full p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col w-1/3 justify-center row-start-2 items-center">
        <div className="flex flex-col min-w-md gap-3 bg-card md:w-2/4 sm:w-2/3 border-[1px] p-8 border-[#0002] rounded-md shadow-lg">
          <div className="flex flex-col mb-4 gap-2">
            <h1 className="text-center font-bold text-xl text-primary">
              CangeBash
            </h1>
            <span className="text-center text-sm text-muted-foreground">Adicione uma conversa a um cartão existente</span>
          </div>
          <div className="flex flex-col gap-1">
            <div>
              <label className="text-sm text-secondary-foreground">
                Selecione um Fluxo
              </label>
              <Select onValueChange={handleSelectFlux}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Fluxo" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectGroup>
                    <SelectLabel>Fluxos</SelectLabel>
                    {data instanceof Array &&
                      data.map((flux, index) => {
                        return (
                          <SelectItem key={index} value={`${flux.fluxo_id}`}>
                            {flux.nome}
                          </SelectItem>
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-secondary-foreground">
                Selecione um cartão
              </label>
              <Select onValueChange={handleSelectCards}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Cartão" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectGroup>
                    <SelectLabel>Cartões</SelectLabel>
                    {cards instanceof Array &&
                      cards.map((card, index) => {
                        return (
                          <SelectItem
                            className="hover:bg-[#0001] w-full transition-all ease-in-out"
                            key={index}
                            value={card.id_card}
                          >
                            {card.title}
                          </SelectItem>
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex w-full flex-row gap-1">
            <Button
              variant="outline"
              className="cursor-pointer w-1/2 transition-all ease-in-out"
              onClick={handleGetCards}
            >
              <Search />
              Buscar Cartões
            </Button>
            <GetCard id_card={`${idCard}`} flow_id={`${flux}`} />
          </div>
          <div>
            <Button variant="outline" onClick={() => router.push("/cange-token")} className="text-xs text-secondary-foreground cursor-pointer w-full">Renovar token do Cange</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
