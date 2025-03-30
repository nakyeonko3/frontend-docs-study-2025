import { memo } from "react";
import { Ticket, TicketActions } from "./types";
import { Dispatch } from "./ticketsReducer";

interface TicketItemProps {
  ticket: Ticket;
  dispatch: Dispatch;
}

function TicketItem({ ticket, dispatch }: TicketItemProps) {
  const handleClick = () => {
    dispatch({ type: "toggleTicketStatus", id: ticket.id });
  };

  console.log("Render TicketItem", ticket.id);

  return (
    <li>
      <div className="title">{ticket.title}</div>
      <div className="description">{ticket.description}</div>
      <button className="status" onClick={handleClick}>
        {ticket.status === "open" ? "Open" : "Closed"}
      </button>
    </li>
  );
}

export const TicketItemMemo = memo(TicketItem);
export default TicketItem;
