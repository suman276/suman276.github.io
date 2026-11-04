import { Award, BadgeCheck, GraduationCap, Trophy } from "lucide-react";
import { achievements, certifications, education } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/motion/TiltCard";

export default function Certifications() {
  return (
    <section id="certifications" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <SectionHeading
          icon={Award}
          eyebrow="Credentials"
          title="Certified on the Now Platform."
        />

        <div className="mt-14 grid grid-flow-row-dense gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <TiltCard className="border-transparent bg-panel p-8 text-white sm:col-span-2 lg:row-span-2">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-teal/30 blur-3xl"
            />
            <div className="relative flex h-full flex-col justify-between gap-10">
              <Award className="h-10 w-10 text-brand-teal-light" />
              <div>
                <p
                  data-count={String(certifications.length)}
                  className="text-7xl font-semibold tracking-tight lg:text-8xl"
                >
                  {certifications.length}
                </p>
                <p className="mt-2 text-xl font-medium">ServiceNow certifications</p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/65">
                  System administration plus implementation specialist credentials across
                  ITSM, hardware and software asset management, and data foundations.
                </p>
              </div>
            </div>
          </TiltCard>

          {certifications.map((cert) => (
            <TiltCard key={cert.code} className="p-6">
              <BadgeCheck className="h-6 w-6 text-brand-teal" />
              <p className="mt-6 font-mono text-lg font-semibold text-brand-navy">{cert.code}</p>
              <p className="mt-1 text-sm leading-snug text-muted">{cert.name}</p>
            </TiltCard>
          ))}

          <TiltCard className="p-6 sm:col-span-2 lg:col-span-2">
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted">Education</p>
                <p className="mt-1 font-semibold text-brand-navy">{education.degree}</p>
                <p className="mt-1 text-sm text-muted">{education.school}</p>
                <span className="mt-3 inline-block rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal">
                  {education.detail}
                </span>
              </div>
            </div>
          </TiltCard>

          <TiltCard className="p-6">
            <Trophy className="h-6 w-6 text-brand-teal" />
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted">
              Beyond work
            </p>
            <ul className="mt-2 space-y-2">
              {achievements.map((item) => (
                <li key={item} className="text-sm leading-snug text-brand-navy">
                  {item}
                </li>
              ))}
            </ul>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
