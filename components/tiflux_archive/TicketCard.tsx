import { FC } from "react";

interface Ticket {
  ticket_number: number;
  title: string;
  created_at: string;
  desk_name: string;
  followers: string;
  requestor: {
    email: string;
    name: string;
  };
  responsible: string;
}

const TicketCard: FC<Ticket> = ({
  ticket_number,
  title,
  created_at,
  desk_name,
  followers,
  requestor,
  responsible,
}) => {
  return (
    <div className="p-4 w-full rounded-md shadow-md border-[1px] border-[#0003] hover:bg-gray-100 transition-all cursor-pointer flex flex-col">
      <div id="title_and_number" className="flex flex-col mb-2">
        <div className="flex gap-2 text-md font-medium">
          <div>{`#${ticket_number}`}</div> - <h2>{title}</h2>
        </div>
      </div>
      <div className="mb-2">
        <hr />
      </div>
      <div className="flex gap-2 flex-col flex-1 mb-4 text-sm">
        <div className="text-sm overflow-hidden text-nowrap">
          <span className="font-medium">Mesa de Serviço:</span>
          <span className="ml-1">{desk_name}</span>
        </div>
        <div className="text-sm overflow-hidden text-nowrap">
          <span className="font-medium">Solicitante:</span>
          <span className="ml-1">
            {requestor.name} {requestor.email}
          </span>
        </div>
        <div className="text-sm overflow-hidden text-nowrap">
          <span className="font-medium">Responsável:</span> {responsible}
        </div>
        <div className="text-sm overflow-hidden text-nowrap">
          <span className="font-medium">Seguidores:</span> {followers}
        </div>
      </div>
      <div className="mb-2">
        <hr />
      </div>
      <footer className="text-xs font-md">
        Data de Abertura: {new Date(created_at).toLocaleDateString()}
      </footer>
    </div>
  );
};

export default TicketCard;
