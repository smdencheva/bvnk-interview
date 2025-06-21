import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function PayQuoteSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto shadow-none bg-white flex flex-col gap-[25] p-[25]">
      <CardHeader className="p-0">
        <CardTitle className="flex flex-col text-center gap-[25]">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mx-auto" />
          <div className="space-y-2">
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto" />
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 p-0">
        <div className="flex flex-col gap-3">
          <Separator />

          <div className="flex justify-between items-center">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-start">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="flex items-center gap-2 max-w-[220px]">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-12 bg-gray-200 rounded animate-pulse flex-shrink-0" />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white p-3">
            <div className="h-36 w-36 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        <div className="text-center">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        </div>

        <Separator />

        <div className="flex justify-between items-center h-5">
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        </div>

        <Separator />
      </CardContent>
    </Card>
  );
}
