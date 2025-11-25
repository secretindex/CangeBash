import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";
import ContentMessage from "./ContentMessage";

const Mensagem = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <ContentMessage />
    </Suspense>
  );
};

export default Mensagem;
