import { Award, BadgeCheck, GraduationCap } from "lucide-react";
import { certifications, education, achievements } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionHeading
              icon={Award}
              eyebrow="Certifications"
              title="ServiceNow Credentials"
            />
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {certifications.map((cert, i) => (
              <Reveal key={cert.code} delay={i * 80}>
                <li className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-brand-teal" />
                    <p className="font-bold text-brand-navy">{cert.code}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted">{cert.name}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div>
          <Reveal>
            <SectionHeading
              icon={GraduationCap}
              eyebrow="Education"
              title="Academic Background"
            />
          </Reveal>

          <Reveal delay={80}>
            <div className="glass-card mt-8 rounded-xl p-5">
              <p className="font-semibold text-brand-navy">
                {education.degree}
              </p>
              <p className="mt-1 text-sm text-muted">{education.school}</p>
              <p className="mt-1 text-sm text-muted">{education.detail}</p>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <ul className="mt-6 space-y-2">
              {achievements.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-teal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
