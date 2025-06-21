import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function AcceptQuoteSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto shadow-none bg-white gap-[25] p-[25]">
      <CardHeader className="text-center p-0 gap-0">
        <CardTitle className="text-xl font-medium text-primary flex flex-col gap-1">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mx-auto" />
          <div className="space-y-1">
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-[25] p-0">
        <div className="h-4 w-56 bg-gray-200 rounded animate-pulse mx-auto" />
        <div className="flex flex-col gap-1">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-14 w-full bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="space-y-3">
          <Separator />
          <div className="flex justify-between items-center">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <Separator />
        </div>

        <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}
