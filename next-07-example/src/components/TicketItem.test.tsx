import { describe, it } from "vitest";

import { render, screen } from "@testing-library/react";

import TicketItem from "./TicketItem";

import { Ticket } from "../types";

describe("TicketItem", () => {
  const ticket: Ticket = {
    id: "ticket-1",
    title: "TITLE",
    description: "DESCRIPTION",
    status: "open",
    comments: [{ id: "comment-1", content: "COMMENT" }],
  };

  function renderTicketItem() {
    render(<TicketItem ticket={ticket} />);
  }

  it("renders title and status", () => {
    renderTicketItem();

    screen.getByText("TITLE");
    screen.getByText(/Open/);
  });
});
