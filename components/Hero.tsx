import Image from "next/image";
import { profile, stats } from "@/lib/data";
import AnimatedNumber from "@/components/AnimatedNumber";
import ParallaxGlow from "@/components/ParallaxGlow";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="gradient-hero relative overflow-hidden text-white"
    >
      <ParallaxGlow />

      {/* Photo — bleeds to the section's right and bottom edge on desktop */}
      <div className="relative mt-10 flex h-64 justify-center sm:h-80 md:absolute md:inset-y-0 md:right-0 md:mt-0 md:h-auto md:w-[42%] md:justify-end md:pr-6 lg:w-[38%] lg:pr-10">
        <div
          aria-hidden
          className="absolute bottom-0 right-6 top-10 w-[75%] rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-sm md:right-10"
        />
        <Image
          src="/images/profile.webp"
          alt="Suman Mondal"
          fill
          priority
          sizes="(min-width: 768px) 40vw, 320px"
          className="z-10 object-contain object-bottom"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-xl md:max-w-lg">
          <p className="section-heading text-brand-teal-light">
            {profile.role}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-5 text-lg text-white/80">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-brand-teal-light"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-white/10"
            >
              Get in Touch
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 md:max-w-md">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-bold text-brand-teal-light">
                  <AnimatedNumber value={stat.value} />
                </dd>
                <p className="mt-1 text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
