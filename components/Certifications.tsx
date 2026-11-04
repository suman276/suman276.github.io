import { ArrowUpRight, Award, BadgeCheck, GraduationCap, Trophy } from "lucide-react";
import { achievements, certifications, education } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

export default function Certifications() {
  return (
    <section id="credentials" className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="06"
            eyebrow="Credentials"
            title="Certified on the Now Platform."
            description="One administrator credential and four implementation specialist credentials."
          />
          <p data-reveal className="flex items-center gap-3 lg:mb-2">
            <span data-count={String(certifications.length)} className="text-5xl font-semibold tracking-tight text-ink tabular-nums">
              {certifications.length}
            </span>
            <span className="text-sm leading-snug text-muted">
              ServiceNow
              <br />
              certifications
            </span>
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {certifications.map((cert) => (
            <li key={cert.code} data-reveal className="card card-hover flex flex-col p-5">
              {/* Badge slot: swap in the official badge image here once available. */}
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                <BadgeCheck aria-hidden className="h-5 w-5" />
              </span>
              <p className="mt-5 font-mono text-base font-semibold text-ink">{cert.code}</p>
              <p className="mt-1 flex-1 text-[13px] leading-snug text-muted">{cert.name}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
                <span className="text-muted">{cert.issuer}</span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-accent"
                  >
                    Verify <ArrowUpRight aria-hidden className="h-3 w-3" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div data-reveal className="card flex gap-4 p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
              <GraduationCap aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Education</h3>
              <p className="mt-1.5 font-semibold text-ink">{education.degree}</p>
              <p className="mt-1 text-sm text-muted">{education.school}</p>
              <span className="mt-3 inline-block rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-xs font-semibold text-accent">
                {education.detail}
              </span>
            </div>
          </div>

          <div data-reveal className="card flex gap-4 p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
              <Trophy aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Achievements</h3>
              <ul className="mt-1.5 space-y-2.5">
                {achievements.map((a) => {
                  const [title, detail] = a.split(" — ");
                  return (
                    <li key={a} className="flex gap-2.5 text-sm">
                      <Award aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>
                        <span className="font-semibold text-ink">{title}</span>
                        {detail && <span className="text-muted"> — {detail}</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
