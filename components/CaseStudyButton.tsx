"use client";

import { ReactNode } from "react";
import { openCaseStudy } from "@/lib/scroll";

/** A button anywhere on the page that opens a project's case study. */
export default function CaseStudyButton({
  slug,
  className,
  children,
  label,
}: {
  slug: string;
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  return (
    <button type="button" onClick={() => openCaseStudy(slug)} aria-label={label} className={className}>
      {children}
    </button>
  );
}
