import Link from "next/link";
import type { ReactNode } from "react";

export function DashboardShell({
  role,
  children,
}: {
  role: "Admin" | "Organizer" | "Participant";
  children: ReactNode;
}) {
  const root = `/${role.toLowerCase()}`;
  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      <header className="flex items-center justify-between bg-maroon px-6 py-4 text-white">
        <Link href="/" className="font-bold">
          Semmozhi OS
        </Link>
        <span>{role} workspace</span>
      </header>
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-maroon/10 bg-white p-4">
          <nav className="grid gap-2 text-sm">
            <Link href={`${root}/dashboard`}>Overview</Link>
            <Link href={`${root}/workshops`}>Workshops</Link>
            <Link href={`${root}/notifications`}>Notifications</Link>
            <Link href={`${root}/settings`}>Settings</Link>
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
