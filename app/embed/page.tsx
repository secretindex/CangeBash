import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";
import PageEmbed from "./Content";

const Page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <PageEmbed />
    </Suspense>
  );
};

export default Page;
