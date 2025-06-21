import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Expiry from "../expiry";

describe("Expiry", () => {
  it("renders correctly", () => {
    render(<Expiry />);

    expect(screen.getByText("Payment details expired")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The payment details for your transaction have expired.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId("alert-circle-icon")).toBeInTheDocument();
  });

  it("has correct styling classes", () => {
    render(<Expiry />);

    const card = screen
      .getByText("Payment details expired")
      .closest("[class*='w-full']");
    expect(card).toHaveClass("w-full");
  });

  it("displays alert icon in propper container", () => {
    render(<Expiry />);

    const iconContainer = screen.getByTestId("alert-circle-icon").parentElement;
    expect(iconContainer).toHaveClass("gap-5", "p-0");
  });

  it("has centered layout", () => {
    render(<Expiry />);

    const content = screen.getByText(
      "The payment details for your transaction have expired.",
    ).parentElement;
    expect(content).toHaveClass("text-center");
  });
});
