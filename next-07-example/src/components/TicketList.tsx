import TicketItem from "@/components/TicketItem";
import getTickets from "@/services/ticketService";
import { Ticket } from "@/types";

export function TicketList({ tickets }: { tickets: Ticket[] }) {
  return (
    <ul className="ticket-list">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </ul>
  );
}

export default async function TicketListWrapper() {
  const tickets = await getTickets();
  return <TicketList tickets={tickets} />;
}
