"use client";

import { useAsyncAction } from "./use-async-action";
import { updatePaySummary, acceptPaySummary } from "@/lib/api";

export function useUpdatePaySummary() {
  return useAsyncAction(updatePaySummary);
}

export function useAcceptPaySummary() {
  return useAsyncAction(acceptPaySummary);
}

export function usePaySummaryActions() {
  const updateAction = useUpdatePaySummary();
  const acceptAction = useAcceptPaySummary();

  return {
    update: updateAction,
    accept: acceptAction,
    isAnyLoading: updateAction.loading || acceptAction.loading,
    getError: updateAction.error || acceptAction.error,
  };
}
