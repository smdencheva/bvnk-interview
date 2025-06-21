import { vi } from "vitest";

export const mockFormatTime = vi.fn((time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

vi.mock("@/lib/utils", () => ({
  formatTime: mockFormatTime,
}));
