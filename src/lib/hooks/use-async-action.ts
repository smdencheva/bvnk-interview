"use client";

import { useState, useCallback } from "react";

interface UseAsyncActionReturn<T, P extends unknown[]> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: P) => Promise<T | null>;
  reset: () => void;
}

export function useAsyncAction<T, P extends unknown[]>(
  asyncFunction: (...args: P) => Promise<T>,
): UseAsyncActionReturn<T, P> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (...args: P): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const result = await asyncFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}
