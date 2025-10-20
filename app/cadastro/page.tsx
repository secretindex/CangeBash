import { Input } from "@/components/ui/input";

const Cadastro = () => {
  return (
    <div className="w-full h-screen">
      <main className="w-full h-screen">
        <div className="w-1/4 flex flex-col gap-2 p-2">
          <form className="flex flex-col gap-1">
            <div>
              <label>Identificador do Fluxo</label>
              <Input type="number" placeholder="ID"></Input>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Cadastro;
