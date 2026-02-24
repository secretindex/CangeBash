"use client";

import { TifluxTable } from "@/components/tiflux_archive/TicketsTable";

const TifluxPage = () => {
  return (
    <section className="min-h-screen w-full py-10 flex flex-col items-center">
      <div className="w-3/4 gap-4 flex flex-col">
        <div className="w-full">
          <h2 className="text-2xl font-bold">Acervo Tiflux</h2>
          <span className="text-muted-foreground">
            Onde estão todos os tickets do antigo sistema Tiflux. Não é possível responder, apenas visualizar.
          </span>
        </div>
        <div className="panel">
          <TifluxTable />
        </div>
      </div>
    </section>
  );
};

export default TifluxPage;
