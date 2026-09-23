import { ModulePlaceholder } from "@/components/shared/module-placeholder";
export default async function Verify({
  params,
}: {
  params: Promise<{ certificateCode: string }>;
}) {
  const { certificateCode } = await params;
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <ModulePlaceholder
        title="Certificate verification"
        description={`Verification boundary ready for certificate code ${certificateCode}. Only public, non-sensitive certificate fields will be returned.`}
      />
    </div>
  );
}
