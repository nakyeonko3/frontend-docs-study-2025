import { beforeEach, describe, it } from "vitest";

import { render, screen, waitFor } from "@testing-library/react";

import { TicketList } from "./TicketList";

import { Ticket } from "@/types";

describe("TicketList", () => {
  const tickets: Ticket[] = [
    {
      id: "ticket-1",
      title: "Ticket #1",
      description: "Ticket Description",
      status: "open",
      comments: [
        {
          id: "comment-1",
          content: "Comment Content",
        },
      ],
    },
  ];
  beforeEach(() => {});

  function renderTicketList() {
    render(<TicketList tickets={tickets} />);
  }

  it("renders tickets", async () => {
    renderTicketList();

    await waitFor(() => {
      screen.getByText(/Ticket #1/);
      screen.getByText(/Ticket Description/);
      screen.getByText(/open/i);
    });
  });
});
