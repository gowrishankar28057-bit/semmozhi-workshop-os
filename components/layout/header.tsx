import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-maroon/10 bg-parchment/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-maroon"
        >
          <span className="grid size-10 place-items-center rounded-full bg-maroon text-sm text-gold">
            செ
          </span>
          <span>Semmozhi Workshop OS</span>
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-5 text-sm font-medium"
        >
          <Link href="/workshops">Workshops</Link>
          <Link href="/about" className="hidden sm:block">
            Mission
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-maroon px-4 py-2 text-maroon"
          >
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
