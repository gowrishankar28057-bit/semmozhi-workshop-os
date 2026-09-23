import { ModulePlaceholder } from "@/components/shared/module-placeholder";
export default function Login() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <ModulePlaceholder
        title="Sign in"
        description="Auth.js credentials/provider configuration and server-side Turnstile verification are the next P1 milestone."
      />
    </div>
  );
}
