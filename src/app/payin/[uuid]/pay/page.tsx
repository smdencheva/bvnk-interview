import PayQuote from "../components/pay-quote";
import { getPaySummary } from "@/lib/api";

type PageProps = {
  params: Promise<{ uuid: string }>;
};

export default async function Page({ params }: PageProps) {
  const { uuid } = await params;
  const summary = await getPaySummary(uuid);
  return <PayQuote summary={summary} />;
}
