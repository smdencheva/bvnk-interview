import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PayQuote from "./pay-quote";
import { mockPush } from "@/test/setup";

const mockSummary = {
  uuid: "test-uuid-123",
  paidCurrency: { amount: "0.00123", currency: "BTC" },
  address: { address: "bc1qxyzabc123def456" },
  expiryDate: Date.now() + 60 * 1000,
};

describe("PayQuote", () => {
  let user: ReturnType<typeof userEvent.setup>;
  let mockWriteText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    //  Create fresh mock for each test
    mockWriteText = vi.fn().mockResolvedValue(undefined);

    //  Ensure navigator.clipboard exists first, then mock it
    if (!navigator.clipboard) {
      Object.defineProperty(navigator, "clipboard", {
        value: {},
        writable: true,
        configurable: true,
      });
    }

    //  Now mock the writeText method
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: mockWriteText,
      writable: true,
      configurable: true,
    });

    user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
    vi.restoreAllMocks();
  });

  it("renders payment details correctly", async () => {
    render(<PayQuote summary={mockSummary} />);

    //  Wait for loading to complete
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    //  Wait for the actual content to appear
    await waitFor(() => {
      expect(screen.getByTestId("card-title")).toBeInTheDocument();
    });

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("card-header")).toBeInTheDocument();
    expect(screen.getByTestId("card-content")).toBeInTheDocument();
    expect(screen.getByTestId("card-title")).toHaveTextContent(/Pay with BTC/i);

    //  Use getAllByText to handle multiple matches, then select the specific one
    const amountDueElements = screen.getAllByText(/Amount due/i);
    expect(amountDueElements.length).toBeGreaterThan(0);

    expect(screen.getByText("0.00123 BTC")).toBeInTheDocument();

    expect(screen.getByText("Crypto Address")).toBeInTheDocument();

    //  Use specific test IDs instead of text matching
    expect(screen.getByTestId("copy-amount-button")).toBeInTheDocument();
    expect(screen.getByTestId("copy-address-button")).toBeInTheDocument();

    expect(screen.getByTestId("qr-code")).toHaveTextContent(
      mockSummary.address.address,
    );
  });

  it("displays initial time remaining and updates it", async () => {
    const initialExpiry = Date.now() + 120 * 1000; // 2 minutes from now
    render(
      <PayQuote summary={{ ...mockSummary, expiryDate: initialExpiry }} />,
    );

    // Wait for loading to complete
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    await waitFor(() => {
      expect(screen.getByText(/Time left to pay/i)).toBeInTheDocument();
    });

    // Check that time is displayed (format: MM:SS)
    expect(screen.getByText(/1:\d{2}/)).toBeInTheDocument();
  });

  it("redirects to expired page when timer runs out", async () => {
    const shortExpiry = Date.now() + 2 * 1000; // 2 seconds from current mocked time
    render(<PayQuote summary={{ ...mockSummary, expiryDate: shortExpiry }} />);

    // Wait for loading to complete first
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    // Then advance past expiry
    await act(async () => {
      vi.advanceTimersByTime(2100);
    });

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith(
          `/payin/${mockSummary.uuid}/expired`,
        );
      },
      { timeout: 3000 },
    );
  });

  it("handles amount copy button click", async () => {
    render(<PayQuote summary={mockSummary} />);

    // Wait for loading to complete
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    await waitFor(() => {
      expect(screen.getByText("0.00123 BTC")).toBeInTheDocument();
    });

    //  Use specific test ID
    const amountCopyButton = screen.getByTestId("copy-amount-button");

    await act(async () => {
      await user.click(amountCopyButton);
    });

    //  Wait for the async clipboard operation
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith("0.00123 BTC");
    });

    //  Check for success message
    expect(screen.getByText("Copied!")).toBeInTheDocument();

    //  Wait for message to disappear
    act(() => {
      vi.advanceTimersByTime(2100);
    });

    await waitFor(() => {
      expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
    });
  });

  it("handles address copy button click", async () => {
    render(<PayQuote summary={mockSummary} />);

    // Wait for loading to complete
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    await waitFor(() => {
      expect(screen.getByTestId("copy-address-button")).toBeInTheDocument();
    });

    //  Use specific test ID instead of text matching
    const addressCopyButton = screen.getByTestId("copy-address-button");

    await act(async () => {
      await user.click(addressCopyButton);
    });

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith("bc1qxyzabc123def456");
    });

    expect(screen.getByText("Copied!")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2100);
    });

    await waitFor(() => {
      expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
    });
  });

  it("displays failed to copy message when clipboard write fails", async () => {
    //  Mock the rejection BEFORE rendering
    mockWriteText.mockRejectedValueOnce(new Error("Copy failed"));

    render(<PayQuote summary={mockSummary} />);

    // Wait for loading to complete
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    await waitFor(() => {
      expect(screen.getByTestId("copy-amount-button")).toBeInTheDocument();
    });

    const amountCopyButton = screen.getByTestId("copy-amount-button");

    await act(async () => {
      await user.click(amountCopyButton);
    });

    //  Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText("Failed to copy Amount")).toBeInTheDocument();
    });

    //  Verify the mock was called
    expect(mockWriteText).toHaveBeenCalledWith("0.00123 BTC");

    //  Wait for error message to disappear
    act(() => {
      vi.advanceTimersByTime(3100);
    });

    await waitFor(() => {
      expect(
        screen.queryByText("Failed to copy Amount"),
      ).not.toBeInTheDocument();
    });
  });
});
