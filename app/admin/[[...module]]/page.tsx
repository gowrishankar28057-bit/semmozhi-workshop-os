import { ModulePlaceholder } from "@/components/shared/module-placeholder";
export default async function AdminModule({
  params,
}: {
  params: Promise<{ module?: string[] }>;
}) {
  const path = (await params).module?.join(" / ") ?? "dashboard";
  return (
    <ModulePlaceholder
      title={`Admin · ${path}`}
      description="Admin shell for organizers, participants, workshops, certificates, analytics, audit, and platform settings. Backend access will require ADMIN on every operation."
    />
  );
}
