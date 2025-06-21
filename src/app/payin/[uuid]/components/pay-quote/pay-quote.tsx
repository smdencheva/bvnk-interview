"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { PayQuoteProps } from "./pay-quote.types";
import { formatTime } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import { PayQuoteSkeleton } from "./pay-quote-skeleton";
import { Separator } from "@/components/ui/separator";

export default function PayQuote({ summary: initial }: PayQuoteProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(
    initial?.expiryDate ? initial.expiryDate - Date.now() : 0,
  );

  const [copyFeedback, setCopyFeedback] = useState<{ [key: string]: string }>(
    {},
  );

  // Countdown timer
  useEffect(() => {
    if (!initial?.expiryDate) return;

    const id = setInterval(() => {
      const diff = initial.expiryDate - Date.now();
      if (diff <= 0) {
        clearInterval(id);
        router.push(`/payin/${initial.uuid}/expired`);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [initial?.expiryDate, initial?.uuid, router]);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback((prev) => ({
        ...prev,
        [key]: "Copied!",
      }));
      setTimeout(() => {
        setCopyFeedback((prev) => ({
          ...prev,
          [key]: "",
        }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopyFeedback((prev) => ({
        ...prev,
        [key]: `Failed to copy ${key}`,
      }));
      setTimeout(() => {
        setCopyFeedback((prev) => ({
          ...prev,
          [key]: "",
        }));
      }, 3000);
    }
  };

  if (!initial) {
    return <PayQuoteSkeleton />;
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-none bg-white flex flex-col gap-[25] p-[25]">
      <CardHeader className="p-0">
        <CardTitle className="flex flex-col text-center gap-[25]">
          <div className="text-xl font-medium text-primary">
            Pay with {initial.paidCurrency?.currency}
          </div>
          <p className="text-sm text-secondary font-normal leading-relaxed">
            To complete this payment send the amount due to the{" "}
            {initial.paidCurrency?.currency} address provided below.
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 p-0">
        <div className="flex flex-col gap-3">
          <Separator />
          <div
            className="flex justify-between items-center"
            data-testid="amount-section"
          >
            <span className="text-sm text-secondary font-normal">
              Amount due
            </span>
            <div className="flex items-center gap-2">
              <span
                className="font-medium text-sm"
                data-testid="amount-display"
              >
                {initial.paidCurrency?.amount} {initial.paidCurrency?.currency}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(
                    `${initial.paidCurrency?.amount} ${initial.paidCurrency?.currency}`,
                    "Amount",
                  )
                }
                className="h-5 px-2 text-blue-600"
                data-testid="copy-amount-button"
              >
                {copyFeedback.Amount || "Copy"}
              </Button>
            </div>
          </div>
          <Separator />

          <div
            className="flex justify-between items-start"
            data-testid="address-section"
          >
            <span className="text-sm text-secondary font-normal">
              Crypto Address
            </span>
            <div className="flex items-center gap-2 max-w-[220px]">
              <span
                className="font-sans text-sm break-all"
                data-testid="address-truncated"
              >
                {initial.address?.address?.slice(0, 8)}...
                {initial.address?.address?.slice(-6)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  copyToClipboard(initial.address?.address ?? "", "Address")
                }
                className="h-5 px-2 text-blue-600 flex-shrink-0"
                data-testid="copy-address-button"
              >
                {copyFeedback.Address || "Copy"}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white p-3">
            <QRCode value={initial.address?.address || ""} size={140} />
          </div>
        </div>

        <div className="text-center">
          <p
            className="text-xs text-secondary font-normal font-sans break-all"
            data-testid="address-full"
          >
            {initial.address?.address}
          </p>
        </div>
        <Separator />
        <div
          className="flex justify-between items-center h-5"
          data-testid="timer-section"
        >
          <span className="text-sm text-secondary font-normal">
            Time left to pay
          </span>
          <span
            className="font-sans text-sm"
            data-testid="time-display"
            suppressHydrationWarning={true}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
        <Separator />
      </CardContent>
    </Card>
  );
}
