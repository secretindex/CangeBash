"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Toaster } from "@/components/ui/sonner";

import { BaseSyntheticEvent, useEffect, useState } from "react";

import { toast } from "sonner";
import axios from "axios";

const Cadastro = () => {
  const [novoFluxo, setNovoFluxo] = useState<{
    fluxo_id: number;
    nome: string;
  }>({ fluxo_id: 0, nome: "" });

  const handleAddCard = async (e: BaseSyntheticEvent) => {
    const supabase = createClient();
    e.preventDefault();

    if (novoFluxo.nome === "") {
      toast.error("Digite o nome do fluxo!");
      return;
    }

    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_CANGE_API_URL +
          "/card/by-flow" +
          `?flow_id=${novoFluxo.fluxo_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CANGE}`,
          },
        },
      );

      console.log(res.data);

      setNovoFluxo((prev) => {
        return { ...prev, nome: res.data[0].flow.name };
      });
    } catch (error) {
      toast.error(`${error}`);
      return;
    }

    const { error } = await supabase.from("fluxos").insert(novoFluxo);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Fluxo adicionado com sucesso");
      setNovoFluxo({ fluxo_id: 0, nome: "" });
    }
  };

  useEffect(() => {
    console.log(novoFluxo);
  }, [novoFluxo]);

  return (
    <div className="w-full h-screen">
      <main className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-1/3 flex flex-col gap-2 p-6 border-[1px] border-indigo-300/50 rounded-md">
          <form className="flex flex-col gap-3">
            <div>
              <h1 className="text-center text-indigo-400 font-bold text-lg">
                Adicione um Fluxo
              </h1>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-neutral-600">Nome</label>
              <Input
                type="text"
                placeholder="Nome"
                value={novoFluxo.nome}
                onChange={(e: BaseSyntheticEvent) =>
                  setNovoFluxo((prev) => ({ ...prev, nome: e.target.value }))
                }
              ></Input>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-neutral-600">
                Identificador do Fluxo
              </label>
              <Input
                type="number"
                placeholder="ID"
                value={novoFluxo.fluxo_id}
                onChange={(e: BaseSyntheticEvent) =>
                  setNovoFluxo((prev) => ({
                    ...prev,
                    fluxo_id: e.target.value,
                  }))
                }
              ></Input>
            </div>
            <div>
              <Button
                variant="outline"
                className="cursor-pointer w-full hover:bg-[#3331] transition-all ease-in-out"
                onClick={handleAddCard}
              >
                Adicionar cartão
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default Cadastro;
