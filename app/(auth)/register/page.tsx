import { ModulePlaceholder } from "@/components/shared/module-placeholder";
export default function Register() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <ModulePlaceholder
        title="Create participant account"
        description="Validated participant registration will be wired to Auth.js and Turnstile in P1."
      />
    </div>
  );
}
