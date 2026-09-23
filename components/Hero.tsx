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

      {/* Photo — full-length cutout, no card or background behind it */}
      <div className="relative mt-10 flex justify-center md:absolute md:inset-y-0 md:right-0 md:mt-0 md:w-[38%] md:items-end md:justify-end lg:w-[34%] lg:pr-6">
        <Image
          src="/images/profile.webp"
          alt="Suman Mondal"
          width={315}
          height={438}
          priority
          className="h-72 w-auto object-contain sm:h-96 md:h-[85%] md:max-h-[560px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="max-w-xl md:max-w-none">
          <p className="section-heading text-brand-teal-light">
            {profile.role}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-5 text-lg text-white/80 md:max-w-2xl">
            {profile.tagline}
          </p>

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

          <dl className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-4xl font-bold text-brand-teal-light">
                  <AnimatedNumber value={stat.value} />
                </dd>
                <p className="mt-1 text-base text-white/70">{stat.label}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
