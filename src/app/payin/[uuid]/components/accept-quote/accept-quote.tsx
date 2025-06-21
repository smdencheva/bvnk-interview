"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { AcceptQuoteProps } from "./accept-quote.types";
import { formatTime } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { usePaySummaryActions } from "@/lib/hooks/use-pay-summary";
import { AcceptQuoteSkeleton } from "./accept-quote-skeleton";
import { Separator } from "@/components/ui/separator";

export default function AcceptQuote({ summary: initial }: AcceptQuoteProps) {
  const router = useRouter();
  const { update, accept, isAnyLoading } = usePaySummaryActions();

  const [summary, setSummary] = useState(initial);
  const [currency, setCurrency] = useState<string>(
    initial?.paidCurrency?.currency ?? "",
  );
  const [timeLeft, setTimeLeft] = useState(() =>
    initial?.acceptanceExpiryDate
      ? initial.acceptanceExpiryDate - Date.now()
      : 0,
  );

  useEffect(() => {
    if (update.error) {
      router.push(`/payin/${initial.uuid}/expired`);
    }
  }, [update.error, initial?.uuid, router]);

  // Update summary when API calls succeed
  useEffect(() => {
    if (update.data) {
      setSummary(update.data);
      if (update.data.acceptanceExpiryDate) {
        setTimeLeft(update.data.acceptanceExpiryDate - Date.now());
      }
    }
  }, [update.data]);

  // Countdown timer
  useEffect(() => {
    const id = setInterval(async () => {
      if (summary.acceptanceExpiryDate) {
        const diff = summary.acceptanceExpiryDate - Date.now() + 5;
        if (diff <= 0) {
          clearInterval(id);
          const updated = await update.execute(
            initial.uuid,
            currency,
            "crypto",
          );
          if (updated?.quoteStatus === "EXPIRED") {
            router.push(`/payin/${initial.uuid}/expired`);
          }
        } else {
          setTimeLeft(diff);
        }
      }
    }, 1000);
    return () => clearInterval(id);
  }, [summary?.acceptanceExpiryDate, initial?.uuid, router, currency, update]);

  if (!summary) {
    return <AcceptQuoteSkeleton />;
  }

  const handleCurrencyChange = async (val: string) => {
    setCurrency(val);
    const updated = await update.execute(initial.uuid, val, "crypto");
    if (!updated) {
      router.push(`/payin/${initial.uuid}/expired`);
    }
  };

  const handleConfirm = async () => {
    const accepted = await accept.execute(initial.uuid);
    if (accepted?.quoteStatus === "ACCEPTED") {
      router.push(`/payin/${initial.uuid}/pay`);
    } else if (!accepted) {
      router.push(`/payin/${initial.uuid}/expired`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-none bg-white gap-[25] p-[25]">
      <CardHeader className="text-center p-0 gap-0">
        <CardTitle className="text-xl font-medium text-primary flex flex-col gap-1">
          <div className="text-center">{summary.merchantDisplayName}</div>
          <div className="text-center">
            <div className="space-y-1">
              <div className="text-[32px]/[40px] font-semibold text-primary">
                {summary.displayCurrency.amount}{" "}
                <span className="text-xl font-semibold text-primary">
                  {summary.displayCurrency.currency}
                </span>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-[25] p-0">
        <p className="text-sm font-normal text-secondary font-normal text-center">
          For reference number:{" "}
          <span className="font-medium text-primary">{summary.reference}</span>
        </p>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="currency"
            className="text-sm font-medium text-primary"
          >
            <span className="text-sm font-medium">Pay with</span>
          </label>
          <Select
            value={currency}
            onValueChange={handleCurrencyChange}
            disabled={isAnyLoading}
          >
            <SelectTrigger
              id="currency"
              className="w-full data-[size=default]:h-14 py-4"
              data-testid="select-trigger"
              data-disabled={isAnyLoading ? "true" : "false"}
            >
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTC">Bitcoin</SelectItem>
              <SelectItem value="ETH">Ethereum</SelectItem>
              <SelectItem value="LTC">Litecoin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {currency && (
          <div className="flex flex-col gap-3">
            <Separator />
            <div className="flex justify-between items-center text-sm/[22px]">
              <span className="text-secondary font-normal">Amount due</span>
              {update.loading ? (
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              ) : (
                <span className="font-sans text-primary">
                  {summary.paidCurrency?.amount}{" "}
                  {summary.paidCurrency?.currency}{" "}
                </span>
              )}
            </div>
            <Separator />
            <div className="flex text-sm/[22px] justify-between items-center">
              <span className="text-secondary font-normal">
                Quoted price expires in
              </span>
              <div className="flex items-center gap-1 text-error">
                {update.loading ? (
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                ) : (
                  <span
                    className="font-sans text-primary"
                    suppressHydrationWarning={true}
                  >
                    {formatTime(timeLeft)}
                  </span>
                )}
              </div>
            </div>
            <Separator />
          </div>
        )}

        {currency && (
          <Button
            onClick={handleConfirm}
            disabled={!currency || isAnyLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            data-testid="confirm-button"
          >
            {accept.loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Confirming...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
