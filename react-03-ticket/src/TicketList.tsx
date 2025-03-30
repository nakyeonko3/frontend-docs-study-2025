import { TicketItemMemo } from "./TicketItem";
import { Dispatch } from "./ticketsReducer";
import { Ticket } from "./types";

interface TicketListProps {
  tickets: Ticket[];
  dispatch: Dispatch;
}

export default function TicketList({ tickets, dispatch }: TicketListProps) {
  return (
    <ul className="ticket-list">
      {tickets.map((ticket) => (
        <TicketItemMemo key={ticket.id} ticket={ticket} dispatch={dispatch} />
      ))}
    </ul>
  );
}
