import { ArrowUpRight, Download, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import LinkedInIcon from "@/components/LinkedInIcon";
import Magnetic from "@/components/motion/Magnetic";

export default function Contact() {
  return (
    <section id="contact" className="px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-panel px-6 py-20 text-white sm:px-16 lg:py-28">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand-teal/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

        <div className="relative">
          <SectionHeading
            icon={Mail}
            eyebrow="Contact"
            title="Let's build something great on ServiceNow."
            description="Open to ServiceNow consulting, development and implementation opportunities. Reach out and I'll get back to you."
            dark
            center
          />

          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-4">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="Email"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-teal px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-light"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <LinkedInIcon />
                LinkedIn
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
