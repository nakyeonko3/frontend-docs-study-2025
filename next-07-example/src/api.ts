import axios from "axios";

import { Ticket } from "./types";

export interface TicketListDto {
  tickets: Ticket[];
}

export const API_BASE_URL = "https://tickets-api.codedemo.co";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
});

export async function fetchTickets(): Promise<TicketListDto> {
  try {
    const { data } = await instance.get("/tickets");
    return data;
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    throw error;
  }
}

export async function fetchTicket({
  ticketId,
}: {
  ticketId: string;
}): Promise<Ticket> {
  try {
    const { data } = await instance.get(`/tickets/${ticketId}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch ticket ${ticketId}:`, error);
    throw error;
  }
}

export async function createTicket({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  try {
    await instance.post("/tickets", { title, description });
  } catch (error) {
    console.error("Failed to create ticket:", error);
    throw error;
  }
}

export async function updateTicketStatus({
  id,
  status,
}: {
  id: string;
  status: "open" | "closed";
}) {
  try {
    await instance.patch(`/tickets/${id}`, { status });
  } catch (error) {
    console.error(`Failed to update ticket ${id} status:`, error);
    throw error;
  }
}

export async function createComment({
  ticketId,
  content,
}: {
  ticketId: string;
  content: string;
}) {
  try {
    await instance.post(`/tickets/${ticketId}/comments`, { content });
  } catch (error) {
    console.error(`Failed to create comment for ticket ${ticketId}:`, error);
    throw error;
  }
}
