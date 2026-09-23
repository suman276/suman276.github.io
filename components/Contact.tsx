import { Mail } from "lucide-react";
import { profile } from "@/lib/data";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="gradient-contact text-white">
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <Reveal>
          <div className="flex flex-col items-center">
            <SectionHeading
              icon={Mail}
              eyebrow="Contact"
              title="Let's work together"
              dark
            />
          </div>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Open to ServiceNow consulting, development, and implementation
            opportunities. Reach out and I&apos;ll get back to you.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-brand-teal-light"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-white/10"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
