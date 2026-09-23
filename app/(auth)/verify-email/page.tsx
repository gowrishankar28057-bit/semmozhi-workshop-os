import { ModulePlaceholder } from "@/components/shared/module-placeholder";
export default function VerifyEmail() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <ModulePlaceholder
        title="Verify email"
        description="Token validation and resend throttling are planned with the authentication milestone."
      />
    </div>
  );
}
