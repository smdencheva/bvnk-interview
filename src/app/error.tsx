"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card className="w-full max-w-md mx-auto shadow-none bg-white justify-center min-h-[307px] items-center gap-[25] p-[25]">
      <CardContent className="text-center items-center gap-5 flex flex-col max-w-[336px] p-0">
        <div className="p-4 bg-white rounded-full">
          <AlertCircle
            className="w-12 h-12 text-error"
            data-testid="alert-circle-icon"
          />
        </div>
        <div className="text-xl font-semibold text-primary">
          Something went wrong
        </div>
        <div className="text-secondary font-normal text-base">
          An unexpected error occurred. Please{" "}
          <button
            onClick={() => {
              reset();
              router.refresh();
            }}
            className="text-accent underline"
          >
            retry
          </button>
          .
        </div>
      </CardContent>
    </Card>
  );
}
