import Link from "next/link";
export function WorkshopCard({
  id,
  title,
  category,
  mode,
}: {
  id: string;
  title: string;
  category: string;
  mode: string;
}) {
  return (
    <article className="rounded-3xl border border-maroon/10 bg-white p-6 shadow-sm">
      <span className="text-xs font-bold uppercase tracking-wider text-gold">
        {category}
      </span>
      <h3 className="mt-3 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-charcoal/60">{mode}</p>
      <Link
        href={`/workshops/${id}`}
        className="mt-6 inline-block font-semibold text-maroon"
      >
        View workshop →
      </Link>
    </article>
  );
}
