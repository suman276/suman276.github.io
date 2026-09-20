import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-brand-navy-dark to-brand-navy text-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="section-heading text-brand-teal-light">Contact</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Let&apos;s work together
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Open to ServiceNow consulting, development, and implementation
          opportunities. Reach out and I&apos;ll get back to you.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-light"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
