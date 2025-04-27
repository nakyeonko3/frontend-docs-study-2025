"use server";
import { createTicket, fetchTickets, updateTicketStatus } from "../api";

import { readCache, writeCache } from "@/cache";
import { Ticket } from "@/types";
import { TICKETS_QUERY_KEY } from "../contants";

export default async function getTickets() {
  try {
    const tickets = await readCache<{ tickets: Ticket[] }>(TICKETS_QUERY_KEY);
    if (tickets?.tickets) {
      return tickets.tickets;
    }
    const data = await fetchTickets();
    await writeCache(TICKETS_QUERY_KEY, data);
    return data.tickets;
  } catch (error) {
    console.error("Failed to get tickets:", error);
    throw error;
  }
}

export async function invalidateTicketsCache() {
  try {
    await writeCache(TICKETS_QUERY_KEY, null);
  } catch (error) {
    console.error("Failed to invalidate tickets cache:", error);
    throw error;
  }
}

export async function createNewTicket({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  try {
    await createTicket({ title, description });
    await invalidateTicketsCache();
  } catch (error) {
    console.error("Failed to create new ticket:", error);
    throw error;
  }
}

export async function updateTicket({
  id,
  status,
}: {
  id: string;
  status: "open" | "closed";
}) {
  try {
    await updateTicketStatus({ id, status });
    await invalidateTicketsCache();
  } catch (error) {
    console.error("Failed to update ticket status:", error);
    throw error;
  }
}
