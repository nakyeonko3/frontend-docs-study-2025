"use client";
import StatusButton from "@/components/ui/StatusButton";
import { updateTicket } from "@/services/ticketService";
import { Ticket } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TicketStatus({ ticket }: { ticket: Ticket }) {
  const router = useRouter();
  const [ticketStatus, setTicketStatus] = useState(ticket.status);

  const handleClick = async () => {
    const currentStatus = ticketStatus;
    setTicketStatus(ticketStatus === "open" ? "closed" : "open");
    try {
      await updateTicket({
        id: ticket.id,
        status: ticket.status === "open" ? "closed" : "open",
      });
      router.refresh();
    } catch (error) {
      setTicketStatus(currentStatus);
      console.error(error);
    }
  };

  return <StatusButton status={ticketStatus} onClick={handleClick} />;
}
