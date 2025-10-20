import { Plus } from "lucide-react";
import { Button } from "./ui/button";

import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full px-8 py-2 flex flex-row items-center justify-between border-b-[#0004] border-b-[1px]">
      <div className="">
        <h1 className="text-lg font-bold">CangeBash</h1>
      </div>
      <div>
        <Link href={"/cadastro"}>
          <Button
            variant="outline"
            className="bg-background text-sm font-bold hover:bg-[#2221] ease-in-out transition-all"
          >
            <Plus /> Add
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
