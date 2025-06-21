import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";

// Mock skeleton components
export const AcceptQuoteSkeleton = () => (
  <div data-testid="accept-quote-skeleton">Loading...</div>
);
export const PayQuoteSkeleton = () => (
  <div data-testid="pay-quote-skeleton">Loading...</div>
);

// Custom render function with providers if needed
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  return render(ui, {
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render };
