import { Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { navLinks } from "@/lib/nav";
import LinkedInIcon from "@/components/LinkedInIcon";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 font-mono text-[11px] font-bold text-accent">
              SM
            </span>
            <span className="font-semibold text-ink">{profile.name}</span>
          </a>
          <p className="mt-2 text-sm text-muted">{profile.designations.join(" · ")}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-5 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind CSS and GSAP.
          </p>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors hover:border-accent/50 hover:text-ink"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors hover:border-accent/50 hover:text-ink"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
