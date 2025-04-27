import TicketStatus from "@/components/TicketStatus";
import Link from "next/link";
import { Ticket } from "../types";

export default function TicketItem({ ticket }: { ticket: Ticket }) {
  return (
    <li>
      <div className="title">
        <Link href={`/tickets/${ticket.id}`} className="ticket">
          {ticket.title}
        </Link>
      </div>
      <div className="description">{ticket.description}</div>
      <TicketStatus ticket={ticket} />
      <div className="comments">
        Comments:
        <span>{ticket.comments.length}</span>
      </div>
    </li>
  );
}
