import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AcceptQuote from "./accept-quote";
import { usePaySummaryActions } from "@/lib/hooks/use-pay-summary";

// Mock Next.js router
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock loading skeleton
vi.mock("./accept-quote-skeleton", () => ({
  AcceptQuoteSkeleton: () => <div data-testid="skeleton" />,
}));

// Prepare mock actions
const mockUpdate = {
  execute: vi.fn(),
  data: null,
  loading: false,
  error: null,
  reset: vi.fn(),
};
const mockAccept = {
  execute: vi.fn(),
  data: null,
  loading: false,
  error: null,
  reset: vi.fn(),
};
vi.mock("@/lib/hooks/use-pay-summary", () => ({
  usePaySummaryActions: vi.fn(() => ({
    update: mockUpdate,
    accept: mockAccept,
    isAnyLoading: false,
    getError: null,
  })),
}));

// Made summary type explicit to remove 'any' error
interface AcceptQuoteSummary {
  uuid: string;
  merchantDisplayName: string;
  reference: string;
  displayCurrency: { amount: number; currency: string };
  paidCurrency: { amount: number; currency: string | null };
  acceptanceExpiryDate: number;
  quoteStatus: string;
}

const summary: AcceptQuoteSummary = {
  uuid: "abc-123",
  merchantDisplayName: "My Merchant",
  reference: "REF-001",
  displayCurrency: { amount: 100, currency: "EUR" },
  paidCurrency: { amount: 0, currency: null },
  acceptanceExpiryDate: Date.now() + 60_000,
  quoteStatus: "PENDING",
};

describe("AcceptQuote", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders skeleton when no summary", () => {
    // Cast to the correct prop type now, which includes undefined
    render(<AcceptQuote summary={undefined} />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("renders merchant info and dropdown", () => {
    render(<AcceptQuote summary={summary} />);
    expect(screen.getByText("My Merchant")).toBeInTheDocument();
    expect(screen.getByText("REF-001")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByTestId("select-trigger")).toBeInTheDocument();
  });

  it("invokes update.execute when currency is selected", async () => {
    const user = userEvent.setup();
    render(<AcceptQuote summary={summary} />);
    const trigger = screen.getByTestId("select-trigger");
    await user.click(trigger);
    // You might need to click an actual SelectItem for this to trigger.
    // However, if your mock of the Select component directly calls onValueChange
    // on trigger click, then this test might pass as-is.
    // For a more robust test, you'd click the trigger, then an option.
    // For this specific request, we're not modifying this logic.
    expect(mockUpdate.execute).toHaveBeenCalledWith("abc-123", "BTC", "crypto");
  });

  it("invokes accept.execute when Confirm clicked", async () => {
    const user = userEvent.setup();
    const ready = {
      ...summary,
      paidCurrency: { amount: 0.5, currency: "BTC" },
    };
    render(<AcceptQuote summary={ready} />);
    // FIX: Use the new data-testid="confirm-button"
    const btn = screen.getByTestId("confirm-button");
    await user.click(btn);
    expect(mockAccept.execute).toHaveBeenCalledWith("abc-123");
  });

  it("disables select and button when loading", () => {
    (usePaySummaryActions as vi.Mock).mockReturnValue({
      update: mockUpdate,
      accept: mockAccept,
      isAnyLoading: true,
      getError: null,
    });
    const ready = {
      ...summary,
      paidCurrency: { amount: 0.5, currency: "BTC" },
    };
    render(<AcceptQuote summary={ready} />);
    // FIX: The component uses data-disabled="true" on the SelectTrigger itself
    const selectTrigger = screen.getByTestId("select-trigger");
    expect(selectTrigger).toHaveAttribute("data-disabled", "true");
    // FIX: Use the new data-testid="confirm-button"
    const confirmButton = screen.getByTestId("confirm-button");
    expect(confirmButton).toBeDisabled();
  });
});
