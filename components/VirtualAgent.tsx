"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  BotMessageSquare,
  ChevronRight,
  RotateCcw,
  SendHorizontal,
  X,
} from "lucide-react";
import { reply, welcome, type AgentAction, type AgentReply } from "@/lib/agent";
import { openCaseStudy, scrollToId } from "@/lib/scroll";

type Message =
  | { id: number; from: "user"; text: string }
  | { id: number; from: "bot"; reply: AgentReply };

const TEASER_KEY = "va-teaser-dismissed";

function BotAvatar() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white">
      <Bot className="h-4 w-4" />
    </span>
  );
}

export default function VirtualAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", reply: welcome }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [teaser, setTeaser] = useState(false);

  const nextId = useRef(1);
  const timer = useRef<number | undefined>(undefined);
  const log = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);

  // A one-time nudge a few seconds in, unless the visitor already dismissed it.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {}
    if (dismissed) return;
    const t = window.setTimeout(() => setTeaser(true), 5000);
    return () => window.clearTimeout(t);
  }, []);

  const hideTeaser = () => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {}
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Keep the newest message in view. A reply taller than the window is shown
  // from its start, so the visitor reads it top-down instead of landing at the end.
  useEffect(() => {
    const el = log.current;
    const newest = el?.lastElementChild as HTMLElement | null;
    if (!el || !newest) return;
    const top =
      newest.offsetHeight > el.clientHeight - 32 ? newest.offsetTop - 16 : el.scrollHeight;
    el.scrollTo({ top, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;
    const focus = window.setTimeout(() => field.current?.focus({ preventScroll: true }), 150);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focus);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => {
    hideTeaser();
    setOpen((o) => !o);
  };

  function close() {
    setOpen(false);
    launcher.current?.focus({ preventScroll: true });
  }

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text: clean }]);
    setInput("");
    setTyping(true);
    // A short pause so the answer reads like a reply, not a page change.
    timer.current = window.setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, from: "bot", reply: reply(clean) }]);
      setTyping(false);
    }, 550 + Math.min(clean.length * 8, 450));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const restart = () => {
    window.clearTimeout(timer.current);
    setTyping(false);
    setMessages([{ id: nextId.current++, from: "bot", reply: welcome }]);
  };

  const goTo = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  const openRecord = (slug: string) => {
    setOpen(false);
    openCaseStudy(slug);
  };

  const last = messages[messages.length - 1];

  return (
    <>
      {/* Teaser bubble */}
      {teaser && !open && (
        <div className="va-in fixed bottom-24 right-5 z-[60] flex max-w-[260px] items-start gap-2 rounded-2xl rounded-br-md border border-border bg-surface p-3 pr-2 text-[13px] text-ink shadow-xl shadow-shade/10">
          <button type="button" onClick={toggle} className="text-left leading-snug">
            <span className="font-semibold">Hi! Questions about Suman&apos;s work?</span>{" "}
            <span className="text-muted">Ask the Virtual Agent.</span>
          </button>
          <button
            type="button"
            onClick={hideTeaser}
            aria-label="Dismiss"
            className="rounded p-0.5 text-muted hover:text-ink"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Launcher */}
      <button
        ref={launcher}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="virtual-agent"
        aria-label={open ? "Close Virtual Agent" : "Open Virtual Agent"}
        className={`fixed bottom-5 right-5 z-[60] h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-xl shadow-shade/25 transition-transform hover:scale-105 hover:bg-primary-hover ${
          open ? "hidden sm:flex" : "flex"
        }`}
      >
        {open ? <X className="h-6 w-6" /> : <BotMessageSquare className="h-6 w-6" />}
        {!open && (
          <span className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-accent-bright" />
        )}
      </button>

      {/* Chat window */}
      <section
        id="virtual-agent"
        role="dialog"
        aria-label="Virtual Agent"
        inert={!open}
        className={`fixed inset-0 z-[60] flex flex-col overflow-hidden bg-surface text-[13px] shadow-2xl shadow-shade/25 transition-[opacity,transform,visibility] duration-300 ease-out motion-reduce:transition-none sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[min(640px,calc(100dvh-8rem))] sm:w-[384px] sm:origin-bottom-right sm:rounded-2xl sm:border sm:border-border ${
          open ? "visible opacity-100" : "invisible translate-y-4 opacity-0 sm:scale-95"
        }`}
      >
        <header className="flex shrink-0 items-center gap-3 bg-chrome px-4 py-3 text-white">
          <span className="relative">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
              <Bot className="h-5 w-5" />
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-chrome bg-emerald-400" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold leading-tight">Virtual Agent</p>
            <p className="text-[11px] text-white/60">Ask about Suman&apos;s ServiceNow work</p>
          </div>
          <button
            type="button"
            onClick={restart}
            aria-label="Start over"
            title="Start over"
            className="rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={close}
            aria-label="Close Virtual Agent"
            className="rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div
          ref={log}
          role="log"
          aria-live="polite"
          data-lenis-prevent
          className="relative flex-1 space-y-4 overflow-y-auto overscroll-contain bg-background px-4 py-5"
        >
          {messages.map((m) =>
            m.from === "user" ? (
              <div key={m.id} className="va-in flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-tr-md bg-primary px-3.5 py-2 leading-relaxed text-on-primary">
                  {m.text}
                </p>
              </div>
            ) : (
              <BotMessage
                key={m.id}
                reply={m.reply}
                showChips={m === last && !typing}
                onChip={send}
                onAction={goTo}
                onRecord={openRecord}
              />
            )
          )}

          {typing && (
            <div className="va-in flex items-end gap-2" aria-label="Virtual Agent is typing">
              <BotAvatar />
              <span className="flex gap-1 rounded-2xl rounded-tl-md border border-border bg-surface px-3.5 py-3">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted motion-reduce:animate-none"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </span>
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="shrink-0 border-t border-border bg-surface p-3">
          <div className="flex items-center gap-2 rounded-full border border-border bg-background py-1 pl-4 pr-1 focus-within:border-accent">
            <label htmlFor="va-input" className="sr-only">
              Type your question
            </label>
            <input
              id="va-input"
              ref={field}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              autoComplete="off"
              maxLength={200}
              className="min-w-0 flex-1 bg-transparent py-1.5 text-[13px] text-ink placeholder:text-muted focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-bright disabled:bg-border disabled:text-muted"
            >
              <SendHorizontal className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-muted">
            Scripted assistant. Answers come from this portfolio.
          </p>
        </form>
      </section>
    </>
  );
}

function BotMessage({
  reply: r,
  showChips,
  onChip,
  onAction,
  onRecord,
}: {
  reply: AgentReply;
  showChips: boolean;
  onChip: (text: string) => void;
  onAction: (id: string) => void;
  onRecord: (slug: string) => void;
}) {
  return (
    <div className="va-in flex items-start gap-2">
      <BotAvatar />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="space-y-2 rounded-2xl rounded-tl-md border border-border bg-surface px-3.5 py-2.5 leading-relaxed text-ink">
          {r.text.map((t) => (
            <p key={t}>{t}</p>
          ))}

          {r.list && (
            <ul className="space-y-1">
              {r.list.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {r.groups && (
            <div className="space-y-2.5 pt-1">
              {r.groups.map((g) => (
                <div key={g.title}>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{g.title}</p>
                  <ul className="mt-1 flex flex-wrap gap-1">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="rounded bg-surface-alt px-1.5 py-0.5 text-[11px] text-ink/85"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {r.timeline && (
            <ol className="space-y-3 border-l-2 border-accent/30 pl-3 pt-1">
              {r.timeline.map((t) => (
                <li key={t.title} className="relative">
                  <span className="absolute -left-[18px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-accent" />
                  <p className="font-semibold leading-snug">{t.title}</p>
                  <p className="text-[12px]">{t.subtitle}</p>
                  <p className="text-[11px] text-muted">{t.meta}</p>
                </li>
              ))}
            </ol>
          )}
        </div>

        {r.records?.map((p) => (
          <article
            key={p.number}
            className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm"
          >
            <div className="flex items-center justify-between gap-2 border-b border-border bg-surface-alt/60 px-3 py-1.5">
              <span className="font-mono text-[11px] text-accent">{p.number}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                {p.engagement}
              </span>
            </div>
            <div className="px-3 py-2.5">
              <p className="font-semibold leading-snug text-ink">{p.title}</p>
              <p className="text-[11px] text-muted">{p.client}</p>
              <p className="mt-2 flex items-baseline gap-1.5 text-[12px] text-ink/85">
                <span className="text-gradient text-base font-semibold">{p.metric.value}</span>
                <span className="line-clamp-1">{p.metric.label}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => onRecord(p.slug)}
              className="flex w-full items-center justify-between border-t border-border px-3 py-2 text-[12px] font-semibold text-accent transition-colors hover:bg-surface-alt/60"
            >
              View case study
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </article>
        ))}

        {r.actions && (
          <div className="flex flex-wrap gap-1.5">
            {r.actions.map((a) => (
              <ActionButton key={a.label} action={a} onAction={onAction} />
            ))}
          </div>
        )}

        {showChips && r.chips && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {r.chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onChip(c)}
                className="rounded-full border border-accent/40 bg-surface px-3 py-1 text-[12px] font-medium text-accent transition-colors hover:bg-accent hover:text-white"
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({ action: a, onAction }: { action: AgentAction; onAction: (id: string) => void }) {
  const className =
    "inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-[12px] font-semibold text-on-primary transition-colors hover:bg-primary-hover";
  if (a.kind === "section") {
    return (
      <button type="button" onClick={() => onAction(a.id)} className={className}>
        {a.label}
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    );
  }
  return (
    <a
      href={a.href}
      download={a.download || undefined}
      target={a.external ? "_blank" : undefined}
      rel={a.external ? "noreferrer" : undefined}
      className={className}
    >
      {a.label}
      {a.external && <ArrowUpRight className="h-3.5 w-3.5" />}
    </a>
  );
}
