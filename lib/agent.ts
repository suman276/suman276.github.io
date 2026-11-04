/*
 * The Virtual Agent's "brain". Like a ServiceNow Virtual Agent, it is a set of
 * topics plus a little natural-language matching, so it runs entirely in the
 * browser: no server, no API key, nothing to pay for on GitHub Pages.
 *
 * reply(message) works in three passes:
 *   1. Topics that should always win (contact, resume, certifications…).
 *   2. Entities: a skill or a word that appears in a project ("CMDB", "Intune").
 *   3. Broad topics (about, skills, projects, experience), then a fallback.
 */
import {
  achievements,
  certifications,
  education,
  experience,
  profile,
  skillGroups,
  workspaceProjects,
  type WorkspaceProject,
} from "@/lib/data";

export type AgentAction =
  | { kind: "link"; label: string; href: string; download?: boolean; external?: boolean }
  | { kind: "section"; label: string; id: string };

export type AgentReply = {
  text: string[];
  list?: string[];
  groups?: { title: string; items: string[] }[];
  timeline?: { title: string; subtitle: string; meta: string }[];
  records?: WorkspaceProject[];
  actions?: AgentAction[];
  /** Quick replies. Each one is sent back through reply() as if typed. */
  chips?: string[];
};

const MAIN_CHIPS = ["Projects", "Skills", "Certifications", "Experience", "Contact"];

const contactActions: AgentAction[] = [
  { kind: "link", label: "Email Suman", href: `mailto:${profile.email}` },
  { kind: "link", label: "LinkedIn", href: profile.linkedin, external: true },
  { kind: "link", label: "Resume (PDF)", href: "/resume.pdf", download: true },
];

export const welcome: AgentReply = {
  text: [
    "Hi there 👋 I'm Suman's Virtual Agent.",
    "Ask me anything about Suman's ServiceNow work, like “Have you worked on CMDB?”, or pick a topic.",
  ],
  chips: MAIN_CHIPS,
};

// ---------------------------------------------------------------- matching

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/\s+/g, " ")
    .trim();

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Whole-word (or whole-phrase) match, so "sam" doesn't match "same". */
const hasWord = (text: string, word: string) =>
  new RegExp(`(^|[^a-z0-9])${escape(word)}($|[^a-z0-9])`).test(text);

const tokenize = (s: string) =>
  normalize(s)
    .split(/[^a-z0-9.-]+/)
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ""))
    .filter(Boolean);

// Words that carry intent, plus filler. Whatever is left is treated as an entity.
const TOPIC_WORDS: Record<string, string[]> = {
  contact: ["contact", "hire", "hiring", "email", "mail", "reach", "linkedin", "connect", "call", "interview", "message", "touch"],
  resume: ["resume", "cv", "pdf", "download"],
  certifications: ["cert", "certs", "certificate", "certificates", "certification", "certifications", "certified", "credential", "credentials", "exam", "exams"],
  education: ["education", "degree", "college", "university", "study", "studied", "graduate", "graduated", "btech", "b.tech", "cgpa", "school"],
  location: ["location", "located", "based", "city", "country", "relocate"],
  beyond: ["beyond", "hobby", "hobbies", "sport", "sports", "athlete", "achievement", "achievements", "fun", "outside", "personal", "interests"],
  thanks: ["thanks", "thank", "thx", "cheers", "great", "awesome", "cool", "nice"],
  greeting: ["hi", "hello", "hey", "hiya", "yo", "namaste", "morning", "evening", "afternoon"],
  help: ["help", "menu", "options", "topics", "start"],
  about: ["about", "who", "yourself", "introduce", "introduction", "summary", "background", "bio", "profile", "overview"],
  skills: ["skill", "skills", "stack", "tech", "technology", "technologies", "tools", "toolkit", "expertise", "strengths", "modules", "module"],
  projects: ["project", "projects", "work", "portfolio", "built", "build", "delivered", "case", "studies", "examples", "poc", "pocs", "records", "record"],
  clients: ["client", "clients", "customer", "customers", "industry", "industries", "brands"],
  experience: ["experience", "experienced", "career", "job", "jobs", "company", "companies", "employer", "years", "worked", "working", "history", "role", "roles"],
};

const FILLER = new Set(
  "a an the and or of in on at to for with by from is are was were be been am do does did done can could would will should have has had any some your you yours youre ur me my i im we our us he she they them their his her its it this that these those what whats which how much many tell show give share list let know knows knew familiar using used use ever there please plz kindly also more other about around suman mondal sumans servicenow snow now platform developer consultant really very like good best top most sure ok okay yes no not just get got want see find look looking anything something everything all".split(
    " "
  )
);

const STRIP = new Set([...FILLER, ...Object.values(TOPIC_WORDS).flat()]);

function detectTopics(tokens: string[]) {
  return new Set(
    Object.entries(TOPIC_WORDS)
      .filter(([, words]) => tokens.some((t) => words.includes(t)))
      .map(([topic]) => topic)
  );
}

// A few everyday words people use for things the data names differently.
const SYNONYMS: Record<string, string[]> = {
  ai: ["now assist", "llm", "nlp", "ai/ml", "genai"],
  genai: ["now assist", "llm", "genai"],
  presales: ["pre-sales"],
  hr: ["hrsd"],
  assets: ["ham", "sam", "asset"],
  asset: ["ham", "sam", "asset"],
  js: ["javascript"],
  intune: ["microsoft intune"],
};

/** Every phrase that should count as a mention of this skill. */
function skillVariants(skill: string) {
  const n = normalize(skill);
  const inner = n.match(/\(([^)]+)\)/)?.[1];
  const outer = n.replace(/\([^)]*\)/, "").trim();
  return [outer, inner, ...outer.split("/")].filter((v): v is string => !!v && v.length > 1);
}

const skillIndex = skillGroups.flatMap((g) =>
  g.skills.map((skill) => ({ skill, group: g.title, variants: skillVariants(skill) }))
);

const projectText = new Map(
  workspaceProjects.map((p) => [
    p.number,
    normalize([p.title, p.client, p.company, p.engagement, ...p.tags, ...p.points].join(" ")),
  ])
);

// Skills are only confirmed when actually named (so "AI projects" doesn't claim
// a specific skill); the broader SYNONYMS above only widen the project search.
const SKILL_SYNONYMS: Record<string, string> = { js: "javascript", intune: "microsoft intune" };

function findSkills(query: string, tokens: string[]) {
  const expanded = [query, ...tokens.map((t) => SKILL_SYNONYMS[t] ?? "")].join(" | ");
  return skillIndex.filter((s) => s.variants.some((v) => hasWord(expanded, v)));
}

/** Projects ranked by how many of the entity terms they mention. */
function findProjects(terms: string[]) {
  if (terms.length === 0) return [];
  const scored = workspaceProjects
    .map((p) => {
      const text = projectText.get(p.number)!;
      const score = terms.filter((term) => {
        const forms = [term, ...(SYNONYMS[term] ?? [])];
        if (term.length > 4 && term.endsWith("s")) forms.push(term.slice(0, -1));
        return forms.some((f) => hasWord(text, f));
      }).length;
      return { p, score };
    })
    .filter((s) => s.score > 0);
  const best = Math.max(0, ...scored.map((s) => s.score));
  return scored.filter((s) => s.score === best).map((s) => s.p);
}

const byNumber = (...numbers: string[]) =>
  numbers
    .map((n) => workspaceProjects.find((p) => p.number === n))
    .filter((p): p is WorkspaceProject => !!p);

const projectsSection: AgentAction = { kind: "section", label: "Open Project Workspace", id: "projects" };

// ------------------------------------------------------------------ topics

const topics = {
  greeting: (): AgentReply => ({
    text: ["Hello! What would you like to know about Suman?"],
    chips: MAIN_CHIPS,
  }),

  help: (): AgentReply => ({
    text: ["Here's what I can help with. You can also just type a question."],
    list: [
      "Projects, including searching by tech or client",
      "Skills and ServiceNow modules",
      "Certifications and education",
      "Work experience",
      "How to get in touch",
    ],
    chips: MAIN_CHIPS,
  }),

  thanks: (): AgentReply => ({
    text: ["Anytime! Is there anything else you'd like to know?"],
    chips: ["Contact", "Resume", "Projects"],
  }),

  about: (): AgentReply => ({
    text: [
      `${profile.name} is a ${profile.role} based in ${profile.location}, with 3+ years delivering end-to-end implementations for global enterprises.`,
      `Right now Suman is a ${experience[0].role} at ${experience[0].company.replace(" Pvt. Ltd.", "")}, owning delivery from stakeholder workshops and solution architecture through development, UAT and go-live.`,
      `That comes with ${certifications.length} ServiceNow certifications and a pre-sales background building POCs for BFSI, FMCG, Manufacturing and Aviation prospects.`,
    ],
    chips: ["Experience", "Projects", "Certifications", "Contact"],
  }),

  skills: (): AgentReply => ({
    text: ["Here's Suman's toolkit, grouped by area:"],
    groups: skillGroups.map((g) => ({ title: g.title, items: g.skills })),
    chips: ["Have you used Flow Designer?", "CMDB work", "Certifications"],
  }),

  certifications: (tokens: string[]): AgentReply => {
    const asked = certifications.find((c) =>
      tokens.some((t) => t === normalize(c.code) || t === normalize(c.code).replace("cis-", ""))
    );
    return {
      text: asked
        ? [
            `Yes. Suman holds ${asked.code}: ${asked.name}.`,
            `That's one of ${certifications.length} ServiceNow certifications:`,
          ]
        : [`Suman holds ${certifications.length} ServiceNow certifications:`],
      list: certifications.map((c) => `${c.code}: ${c.name}`),
      actions: [{ kind: "section", label: "View credentials", id: "certifications" }],
      chips: ["Skills", "Education", "Projects"],
    };
  },

  education: (): AgentReply => ({
    text: [`${education.degree}, ${education.school}, with ${education.detail}.`],
    chips: ["Certifications", "Beyond work", "Experience"],
  }),

  beyond: (): AgentReply => ({
    text: ["Outside ServiceNow, a couple of things Suman is proud of:"],
    list: achievements,
    chips: ["About Suman", "Contact"],
  }),

  location: (): AgentReply => ({
    text: [`Suman is based in ${profile.location}.`],
    chips: ["Contact", "Experience"],
  }),

  experience: (): AgentReply => ({
    text: ["Suman has 3+ years in the ServiceNow ecosystem, across two companies:"],
    timeline: experience.map((job) => ({
      title: job.role,
      subtitle: job.company.replace(" Pvt. Ltd.", ""),
      meta: `${job.period} · ${job.location}`,
    })),
    actions: [{ kind: "section", label: "View full experience", id: "experience" }],
    chips: ["Projects", "Skills", "Pre-sales POCs"],
  }),

  projects: (): AgentReply => ({
    text: [
      `Suman has ${workspaceProjects.length} projects on record. Here are three highlights; open any of them in the Project Workspace.`,
    ],
    records: byNumber("PRJ0010001", "PRJ0010008", "PRJ0010007"),
    actions: [projectsSection],
    chips: ["AI projects", "CMDB work", "Pre-sales POCs"],
  }),

  clients: (): AgentReply => {
    const named = Array.from(
      new Set(workspaceProjects.map((p) => p.client).filter((c) => c !== "Enterprise Client"))
    );
    return {
      text: [
        `Suman has delivered for ${named.length} named clients, plus enterprise clients kept anonymous here:`,
      ],
      list: named,
      chips: ["Projects", "Experience"],
    };
  },

  contact: (): AgentReply => ({
    text: [
      "Suman is open to ServiceNow consulting, development and implementation opportunities.",
      `Email is the quickest way to reach Suman: ${profile.email}`,
    ],
    actions: contactActions,
    chips: ["Resume", "Projects"],
  }),

  resume: (): AgentReply => ({
    text: ["Here's Suman's resume as a PDF."],
    actions: [contactActions[2], contactActions[0]],
    chips: ["Contact", "Certifications"],
  }),
};

// The order matters: earlier topics win when a message mentions several.
const PRIORITY = ["contact", "resume", "certifications", "education", "beyond", "location"] as const;
const BROAD = ["about", "clients", "skills", "projects", "experience"] as const;

function entityReply(raw: string, terms: string[], skills: ReturnType<typeof findSkills>) {
  const records = findProjects(terms);
  const label = raw.trim().length <= 40 ? `“${raw.trim()}”` : "that";

  if (skills.length === 0 && records.length === 0) return null;

  const text: string[] = [];
  if (skills.length > 0) {
    const names = Array.from(new Set(skills.map((s) => s.skill)));
    const group = skills[0].group;
    text.push(
      names.length === 1
        ? `Yes, ${names[0]} is in Suman's toolkit (${group}).`
        : `Yes, Suman works with ${names.join(", ")}.`
    );
  }
  if (records.length > 0) {
    text.push(
      records.length === 1
        ? skills.length > 0
          ? "Here's the project where it shows up:"
          : "Here's the matching project:"
        : `I found ${records.length} projects related to ${label}${records.length > 3 ? ". Here are the top 3" : ""}:`
    );
  } else {
    text.push("Ask me about another skill, or browse the projects.");
  }

  return {
    text,
    records: records.slice(0, 3),
    actions: records.length > 3 ? [projectsSection] : undefined,
    chips: ["Skills", "Projects", "Contact"],
  } satisfies AgentReply;
}

export function reply(message: string): AgentReply {
  const query = normalize(message);
  const tokens = tokenize(message);
  const found = detectTopics(tokens);
  const terms = tokens.filter((t) => !STRIP.has(t) && t.length > 1);

  for (const topic of PRIORITY) {
    if (found.has(topic)) return topics[topic](tokens);
  }

  const skills = findSkills(query, tokens);
  const entity = entityReply(message, terms, skills);
  if (entity) return entity;

  for (const topic of BROAD) {
    if (found.has(topic)) return topics[topic]();
  }

  if (found.has("help")) return topics.help();
  if (found.has("thanks")) return topics.thanks();
  if (found.has("greeting")) return topics.greeting();

  return {
    text: terms.length
      ? [
          `I couldn't find “${terms.slice(0, 3).join(" ")}” in Suman's skills or projects.`,
          "Try another technology or client, pick a topic below, or ask Suman directly.",
        ]
      : ["Sorry, I didn't quite catch that. Pick a topic, or ask about a technology or client."],
    actions: terms.length ? [contactActions[0]] : undefined,
    chips: MAIN_CHIPS,
  };
}
