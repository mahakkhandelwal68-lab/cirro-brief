import { CompletedBriefClient } from "@/components/CompletedBriefClient";

export default async function CompletedBriefPage({ params }: PageProps<"/dashboard/briefs/[id]">) {
  const { id } = await params;
  return <CompletedBriefClient id={id} />;
}
