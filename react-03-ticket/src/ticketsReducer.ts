import { Ticket } from "./types";

interface AddTicketAction {
  type: "addTicket";
  title: string;
  description: string;
}

interface ToggleTicketStatusAction {
  type: "toggleTicketStatus";
  id: number;
}

type TicketAction = AddTicketAction | ToggleTicketStatusAction;

export type Dispatch = (action: TicketAction) => void;

export function ticketsReducer(
  tickets: Ticket[],
  action: TicketAction
): Ticket[] {
  switch (action.type) {
    case "addTicket": {
      const id = Math.max(...tickets.map((ticket) => ticket.id), 0) + 1;
      const ticket: Ticket = {
        id,
        title: action.title,
        description: action.description,
        status: "open",
      };
      return [...tickets, ticket];
    }

    case "toggleTicketStatus": {
      return tickets.map((ticket) =>
        ticket.id === action.id
          ? { ...ticket, status: ticket.status === "open" ? "closed" : "open" }
          : ticket
      );
    }
  }
}
