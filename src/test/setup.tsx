"use client";

import "@testing-library/jest-dom";
import { vi } from "vitest";
import { act as rtlAct } from "react-dom/test-utils";

import type { ReactNode } from "react";

// Tell TS about our new global variable
declare global {
  var act: typeof rtlAct;
}

// Assign into the real globalThis
globalThis.act = rtlAct;

// Add React testing configuration
Object.defineProperty(global, "IS_REACT_ACT_ENVIRONMENT", {
  value: true,
  writable: true,
  configurable: true,
});

// Mock Next.js router
export const mockPush = vi.fn();
export const mockReplace = vi.fn();
export const mockBack = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: mockBack,
  }),
  usePathname: () => "/test-path",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock QRCode component
vi.mock("react-qr-code", () => ({
  default: ({ value }: { value: string }) => (
    <div data-testid="qr-code">{value}</div>
  ),
}));

// Mock ALL Lucide React icons with proper types

// Define proper types for component props
interface SelectProps {
  children: ReactNode;
  onValueChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
}

interface SelectItemProps {
  children: ReactNode;
  value: string;
  role?: string;
}

interface SelectTriggerProps {
  children: ReactNode;
  disabled?: boolean;
  role?: string;
  "aria-label"?: string;
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  [key: string]: unknown;
}

interface SelectValueProps {
  placeholder?: string;
  children?: ReactNode;
}

interface CardProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

// Mock the entire Radix UI Select to avoid scrollIntoView issues
vi.mock("@/components/ui/select", () => ({
  Select: ({ children, onValueChange, value, disabled }: SelectProps) => (
    <div data-testid="select" data-value={value} data-disabled={disabled}>
      <div onClick={() => !disabled && onValueChange && onValueChange("BTC")}>
        {children}
      </div>
    </div>
  ),
  SelectContent: ({ children }: { children: ReactNode }) => (
    <div data-testid="select-content">{children}</div>
  ),
  SelectItem: ({ children, value }: SelectItemProps) => (
    <div
      data-testid="select-item"
      data-value={value}
      role="option"
      aria-selected="false"
    >
      {children}
    </div>
  ),
  SelectTrigger: ({ children, disabled, ...props }: SelectTriggerProps) => (
    <button
      data-testid="select-trigger"
      role="combobox"
      disabled={disabled}
      aria-controls="select-content"
      aria-expanded="false"
      {...props}
    >
      {children}
    </button>
  ),
  SelectValue: ({ placeholder, children }: SelectValueProps) => (
    <span data-testid="select-value">{children || placeholder}</span>
  ),
}));

// Mock Card components
vi.mock("@/components/ui/card", () => ({
  Card: ({ children, ...props }: CardProps) => (
    <div data-testid="card" {...props}>
      {children}
    </div>
  ),
  CardContent: ({ children, ...props }: CardProps) => (
    <div data-testid="card-content" {...props}>
      {children}
    </div>
  ),
  CardHeader: ({ children, ...props }: CardProps) => (
    <div data-testid="card-header" {...props}>
      {children}
    </div>
  ),
  CardTitle: ({ children, ...props }: CardProps) => (
    <h3 data-testid="card-title" {...props}>
      {children}
    </h3>
  ),
  CardFooter: ({ children, ...props }: CardProps) => (
    <div data-testid="card-footer" {...props}>
      {children}
    </div>
  ),
}));
