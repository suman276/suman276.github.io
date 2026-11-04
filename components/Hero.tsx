import Image from "next/image";
import { ArrowRight, BadgeCheck, Bot, Download, Factory } from "lucide-react";
import { certifications, experience, profile, stats } from "@/lib/data";
import Magnetic from "@/components/motion/Magnetic";

const badges = [
  {
    icon: BadgeCheck,
    text: `${certifications.length}× ServiceNow Certified`,
    className: "left-0 top-16 sm:-left-6",
  },
  {
    icon: Bot,
    text: "NOW Assist · GenAI",
    className: "right-0 top-1/3 sm:-right-4",
  },
  {
    icon: Factory,
    text: "25 plants live",
    className: "bottom-20 left-2 sm:-left-2",
  },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="hero-grid absolute inset-0" />
      <div
        aria-hidden
        data-parallax="-25"
        className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-teal/15 blur-3xl"
      />
      <div
        aria-hidden
        data-parallax="-45"
        className="pointer-events-none absolute -right-32 top-24 h-[440px] w-[440px] rounded-full bg-sky-400/15 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-16 pt-14 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:pb-20 lg:pt-20">
        <div>
          <p
            data-hero="fade"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-muted shadow-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Currently at {experience[0].company.replace(" Pvt. Ltd.", "")} · {profile.location}
          </p>

          <h1
            data-hero-name
            className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-brand-navy sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </h1>

          <p data-hero="fade" className="text-gradient mt-4 text-xl font-semibold sm:text-2xl">
            {profile.role}
          </p>

          <p data-hero="fade" className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {profile.tagline}
          </p>

          <div data-hero="fade" className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-on-primary shadow-lg shadow-shade/20 transition-colors hover:bg-primary-hover"
              >
                View projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-teal/50"
              >
                <Download className="h-4 w-4" />
                Download resume
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] lg:max-w-[380px]">
          <div
            data-hero="blob"
            aria-hidden
            className="absolute inset-x-4 bottom-6 top-12 rounded-[42%_58%_55%_45%/48%_42%_58%_52%] bg-gradient-to-br from-brand-teal/30 via-sky-300/25 to-brand-sky/10"
          />
          <div data-parallax="10" className="relative">
            <Image
              data-hero="photo"
              src="/images/profile.webp"
              alt="Suman Mondal"
              width={315}
              height={438}
              priority
              className="photo-fade relative mx-auto h-auto w-full max-w-[315px]"
            />
          </div>

          {badges.map(({ icon: Icon, text, className }) => (
            <div key={text} data-hero="badge" className={`absolute ${className}`}>
              <div
                data-float
                className="flex items-center gap-2 rounded-xl border border-border bg-surface/90 px-3 py-2 text-xs font-semibold text-brand-navy shadow-lg shadow-shade/10 backdrop-blur"
              >
                <Icon className="h-4 w-4 text-brand-teal" />
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-20">
        <dl
          data-hero="fade"
          className="grid grid-cols-2 divide-border overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-sm backdrop-blur max-lg:gap-px max-lg:bg-border lg:grid-cols-4 lg:divide-x"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface/90 px-6 py-6 lg:bg-transparent">
              <dt className="sr-only">{stat.label}</dt>
              <dd
                data-count={stat.value}
                className="text-4xl font-semibold tracking-tight text-brand-navy"
              >
                {stat.value}
              </dd>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
