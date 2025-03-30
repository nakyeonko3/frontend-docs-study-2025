import { useState, useEffect } from "react";
import { Ticket, TicketActions } from "../types";

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const ticketActions: TicketActions = {
    addTicket({ title, description }) {
      setTickets((prev) => [
        ...prev,
        {
          id: prev.length > 0 ? Math.max(...prev.map((t) => t.id)) + 1 : 1,
          title,
          description,
          status: "open",
        },
      ]);
    },

    toggleTicketStatus(id) {
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === id
            ? {
                ...ticket,
                status: ticket.status === "open" ? "closed" : "open",
              }
            : ticket
        )
      );
    },
  };
  return { tickets, ticketActions };
};
