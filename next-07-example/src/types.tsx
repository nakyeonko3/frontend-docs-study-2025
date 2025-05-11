export type TicketStatus = "open" | "closed";
export interface Comment {
  id: string;
  content: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  comments: Comment[];
}
