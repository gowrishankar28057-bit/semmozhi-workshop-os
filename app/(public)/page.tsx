import Link from "next/link";
import { Award, BookOpen, QrCode, Route } from "lucide-react";

const capabilities = [
  {
    icon: QrCode,
    title: "Trustworthy attendance",
    text: "Short-lived, server-verified QR check-ins designed for real workshop sessions.",
  },
  {
    icon: Award,
    title: "Verified certificates",
    text: "Certificates unlock only when verified attendance reaches the 90% policy.",
  },
  {
    icon: Route,
    title: "Learning passport",
    text: "A durable record of workshops, learning hours, skills, and future pathways.",
  },
  {
    icon: BookOpen,
    title: "Knowledge that stays",
    text: "Resources, recordings, and communities remain useful after a workshop ends.",
  },
];

export default function Home() {
  return (
    <>
      <section className="heritage-grid overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-maroon">
              CICT lifelong learning platform
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.05] text-charcoal sm:text-7xl">
              Tamil learning, carried{" "}
              <span className="text-maroon">beyond the workshop.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-charcoal/70">
              Plan workshops, learn together, verify participation, and preserve
              every learning journey in one modern operating system.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/workshops"
                className="rounded-full bg-maroon px-6 py-3 font-bold text-white"
              >
                Explore workshops
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-maroon px-6 py-3 font-bold text-maroon"
              >
                Sign in
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-maroon p-8 text-white shadow-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-gold">
              Learning journey
            </p>
            <div className="mt-8 space-y-6">
              {[
                "Discover a workshop",
                "Attend live sessions",
                "Reach 90% attendance",
                "Earn a verified certificate",
                "Continue in the community",
              ].map((item, i) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold font-bold text-maroon">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold">
          One connected platform
        </p>
        <h2 className="mt-3 text-4xl font-bold">
          From registration to lifelong learning
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-3xl border border-maroon/10 bg-white p-6"
            >
              <Icon className="text-maroon" />
              <h3 className="mt-5 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-charcoal/65">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-charcoal px-6 py-20 text-parchment">
        <div className="mx-auto max-w-5xl text-center">
          <p lang="ta" className="text-gold">
            செம்மொழி · அறிவு · தொடர்ச்சி
          </p>
          <h2 className="mt-4 text-4xl font-bold">
            Heritage in spirit. Modern in practice.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-parchment/70">
            A production-ready foundation for CICT organizers, participants, and
            administrators—designed to grow without losing the learning that
            came before.
          </p>
        </div>
      </section>
    </>
  );
}
