import { API_BASE_URL } from "@/api";
import TicketStatus from "@/components/TicketStatus";
import { Ticket } from "@/types";
import { render, screen } from "@testing-library/react";
import nock from "nock";
import { beforeEach, describe, expect, it } from "vitest";

describe("TicketStatus", () => {
  const ticket: Ticket = {
    id: "1",
    title: "Test Ticket",
    description: "This is a test ticket",
    status: "open",
    comments: [
      {
        id: "1",
        content: "This is a test comment",
      },
    ],
  };

  function renderTicketStatus() {
    render(<TicketStatus ticket={ticket} />);
  }

  beforeEach(() => {
    nock(API_BASE_URL)
      .patch(`/tickets/${ticket.id}`)
      .reply(200, {
        ...ticket,
        status: ticket.status === "open" ? "closed" : "open",
      });
  });

  it("should render the ticket status button", () => {
    renderTicketStatus();
    const button = screen.getByRole("button", {
      name: /open/i,
    });
    expect(button).toBeTruthy();
  });
});
