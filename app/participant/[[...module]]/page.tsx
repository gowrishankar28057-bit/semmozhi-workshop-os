import { ModulePlaceholder } from "@/components/shared/module-placeholder";
export default async function ParticipantModule({
  params,
}: {
  params: Promise<{ module?: string[] }>;
}) {
  const path = (await params).module?.join(" / ") ?? "dashboard";
  return (
    <ModulePlaceholder
      title={`Participant · ${path}`}
      description="Participant shell for discovery, registered workshops, attendance, resources, community, Learning Passport, certificates, notifications, and settings. Queries will be scoped to the signed-in participant."
    />
  );
}
