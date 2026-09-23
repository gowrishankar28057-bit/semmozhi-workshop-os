import { ModulePlaceholder } from "@/components/shared/module-placeholder";
export default async function WorkshopDetail({
  params,
}: {
  params: Promise<{ workshopId: string }>;
}) {
  const { workshopId } = await params;
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <ModulePlaceholder
        title="Workshop details"
        description={`Public workshop route ready for database record: ${workshopId}. Registration, schedule, resources, and prerequisites connect here.`}
      />
    </div>
  );
}
