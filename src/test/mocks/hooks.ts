import { vi } from "vitest";

export const mockUpdateAction = {
  data: null,
  loading: false,
  error: null,
  execute: vi.fn(),
  reset: vi.fn(),
};

export const mockAcceptAction = {
  data: null,
  loading: false,
  error: null,
  execute: vi.fn(),
  reset: vi.fn(),
};

export const mockUsePaySummaryActions = vi.fn(() => ({
  update: mockUpdateAction,
  accept: mockAcceptAction,
  isAnyLoading: false,
  getError: null,
}));

vi.mock("@/lib/hooks/use-pay-summary", () => ({
  usePaySummaryActions: mockUsePaySummaryActions,
}));
