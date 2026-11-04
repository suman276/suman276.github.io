import { ArrowRight, Download, Mail } from "lucide-react";
import { certifications, experience, profile, stats } from "@/lib/data";
import LinkedInIcon from "@/components/LinkedInIcon";
import PlatformVisual from "@/components/PlatformVisual";

const current = experience[0];

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="blueprint fade-mask absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-16 pt-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10 lg:pb-20 lg:pt-20">
        <div>
          <p
            data-hero
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            3+ years on ServiceNow · {certifications.length}× certified
          </p>

          <h1
            id="hero-title"
            data-hero="title"
            className="mt-6 text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[3.6rem]"
          >
            Building Enterprise Solutions with{" "}
            <span className="text-gradient">ServiceNow &amp; AI.</span>
          </h1>

          <ul
            data-hero
            aria-label="Designations"
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-ink/85"
          >
            {profile.designations.map((d, i) => (
              <li key={d} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-accent/70" />}
                {d}
              </li>
            ))}
          </ul>

          <p data-hero className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.description}
          </p>

          <p data-hero className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            I&apos;m <span className="font-semibold text-ink">{profile.name}</span>, {current.role} at{" "}
            {current.company.replace(" Pvt. Ltd.", "")}. {profile.intro}
          </p>

          <div data-hero className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary group">
              View projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="/resume.pdf" download className="btn btn-secondary">
              <Download className="h-4 w-4" />
              Download resume
            </a>
            <a href="#contact" className="btn btn-secondary">
              <Mail className="h-4 w-4" />
              Contact me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="btn btn-secondary px-3"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <PlatformVisual />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-20 lg:pb-24">
        <h2 className="sr-only">Professional impact</h2>
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat) => (
            // The label comes first for screen readers; flex-col-reverse puts the number on top.
            <div key={stat.label} data-reveal className="card flex flex-col-reverse px-5 py-5 sm:px-6">
              <dt className="mt-1.5 text-[13px] leading-snug text-muted">{stat.label}</dt>
              <dd
                data-count={stat.value}
                className="text-3xl font-semibold tracking-tight text-ink tabular-nums sm:text-4xl"
              >
                {stat.value}
              </dd>
              <span aria-hidden className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
