import { fetchTicket } from "@/api";
import TicketStatus from "@/components/TicketStatus";
import { BackButton } from "@/components/backButton";

export default async function TicketDetail({ params }) {
  const { id: ticketId } = await params;
  const ticket = await fetchTicket({ ticketId });
  return (
    <div className="ticket-detail">
      <div className="title">{ticket.title}</div>
      <div className="description">{ticket.description}</div>
      <TicketStatus ticket={ticket} />
      <div className="comment-count">Comments: {ticket.comments.length}</div>
      <BackButton />
    </div>
  );
}
