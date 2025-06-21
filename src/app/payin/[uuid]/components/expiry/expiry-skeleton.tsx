import { Card, CardContent } from "@/components/ui/card";

export function ExpirySkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto shadow-none bg-white justify-center min-h-[307px] items-center gap-[25] p-[25]">
      <CardContent className="text-center items-center gap-5 flex flex-col max-w-[336px] p-0">
        <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse" />
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
      </CardContent>
    </Card>
  );
}
