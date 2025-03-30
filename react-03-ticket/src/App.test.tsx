import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

const context = describe;

describe("App", () => {
  it('renders "Add Tickert" button', () => {
    render(<App />);
    screen.getByRole("button", { name: /Add Ticket/i });
  });

  context("when user fills fields and clicks button", () => {
    it("adds a new ticket", () => {
      render(<App />);

      expect(screen.queryByText(/New Ticket/)).toBeFalsy();

      fireEvent.change(screen.getByRole("textbox", { name: /Title/ }), {
        target: { value: "New Ticket" },
      });
      fireEvent.change(screen.getByRole("textbox", { name: /Description/ }), {
        target: { value: "Ticket Description" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Add Ticket/ }));

      screen.getByText(/New Ticket/);
      screen.getByText(/Ticket Description/);
    });
  });
});
