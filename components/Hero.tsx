import { profile, stats } from "@/lib/data";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function Hero() {
  return (
    <section
      id="top"
      className="border-b border-border bg-gradient-to-b from-brand-navy to-brand-navy-dark text-white"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_auto] md:items-center md:py-28">
        <div>
          <p className="section-heading text-brand-teal-light">
            {profile.role}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-light"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Get in Touch
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-bold text-brand-teal-light">
                  {stat.value}
                </dd>
                <p className="mt-1 text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>

        <div
          aria-hidden
          className="flex h-40 w-40 items-center justify-center justify-self-center rounded-full border border-white/20 bg-white/5 text-4xl font-bold text-white md:h-56 md:w-56 md:text-6xl"
        >
          {initials(profile.name)}
        </div>
      </div>
    </section>
  );
}
