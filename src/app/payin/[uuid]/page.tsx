import AcceptQuote from "./components/accept-quote";
import { getPaySummary } from "@/lib/api";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ uuid: string }>;
};

export default async function Page({ params }: PageProps) {
  const { uuid } = await params;
  const summary = await getPaySummary(uuid);
  if (summary.quoteStatus === "EXPIRED" || summary.expiryDate <= Date.now()) {
    redirect(`/payin/${uuid}/expired`);
  }
  return <AcceptQuote summary={summary} />;
}
