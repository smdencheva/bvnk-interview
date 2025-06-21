import { Card, CardContent } from "@/components/ui/card";
import { AlertIcon } from "@/components/ui/alert-icon";

export default function Expiry() {
  return (
    <Card className="w-full max-w-md mx-auto shadow-none bg-white justify-center min-h-[307px] items-center gap-[25] p-[25]">
      <CardContent className="text-center items-center gap-5 flex flex-col max-w-[336px] p-0">
        <AlertIcon data-testid="alert-circle-icon" />
        <p className="text-xl font-semibold text-primary ">
          Payment details expired
        </p>
        <p className="text-secondary font-normal text-base">
          The payment details for your transaction have expired.
        </p>
      </CardContent>
    </Card>
  );
}
