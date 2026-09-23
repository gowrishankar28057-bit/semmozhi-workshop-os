import { WorkshopCard } from "@/components/workshops/workshop-card";
export default function WorkshopsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm font-bold uppercase tracking-[.2em] text-gold">
        Discover
      </p>
      <h1 className="mt-2 text-4xl font-bold">Upcoming workshops</h1>
      <p className="mt-4 max-w-2xl text-charcoal/65">
        Workshop discovery is scaffolded. Live listings will be connected to
        Neon in the participant milestone.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <WorkshopCard
          id="foundation-preview"
          title="Classical Tamil Foundations"
          category="Language"
          mode="Hybrid"
        />
      </div>
    </section>
  );
}
