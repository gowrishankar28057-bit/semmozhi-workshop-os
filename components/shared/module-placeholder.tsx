export function ModulePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-3xl border border-maroon/10 bg-white p-8 shadow-sm">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-gold">
        Scaffolded module
      </p>
      <h1 className="text-3xl font-bold text-maroon">{title}</h1>
      <p className="mt-3 max-w-2xl text-charcoal/70">{description}</p>
      <div className="mt-8 rounded-2xl bg-parchment p-5 text-sm">
        This route has its navigation and ownership boundary in place. Data
        operations will be connected in the milestone assigned to this module.
      </div>
    </section>
  );
}
