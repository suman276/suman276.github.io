/*
 * Every fact on the site lives here, taken from the resume. Components and the
 * Virtual Agent only read from this file, so updating it updates the whole site.
 * Case-study fields restate the resume's own points; nothing is invented.
 */

export const profile = {
  name: "Suman Mondal",
  role: "ServiceNow Consultant & Developer",
  designations: [
    "ServiceNow Consultant",
    "Developer",
    "Enterprise Solution Architect",
    "AI & Automation Enthusiast",
  ],
  headline: "Building Enterprise Solutions with ServiceNow & AI.",
  description:
    "ServiceNow Consultant and Developer specialising in enterprise implementations, platform architecture, workflow automation, CMDB, ITOM, asset management and AI-powered solutions.",
  intro:
    "I lead implementations end to end, from the first discovery workshop to go-live, for global enterprises across medical, manufacturing, FMCG, BFSI and aviation.",
  summary:
    "Results-driven ServiceNow Consultant and Developer with 3+ years of experience delivering end-to-end digital transformation engagements for global enterprises. Combines deep platform expertise — across ITSM, HAM, SAM, CMDB, App Engine, and AI-powered workflows — with strong consulting fundamentals including client discovery, solution architecture, effort estimation, and governance. Certified ServiceNow professional (CSA, CIS-ITSM, CIS-HAM, CIS-SAM, CIS-DF) with demonstrated success in pre-sales POC delivery, managed services leadership, and training.",
  email: "imsuman276@gmail.com",
  linkedin: "https://www.linkedin.com/in/mondalsuman/",
  location: "Noida, India",
};

export const stats = [
  { value: "3+", label: "Years of ServiceNow experience" },
  { value: "5", label: "ServiceNow certifications" },
  { value: "10", label: "Enterprise projects delivered" },
  { value: "25", label: "Manufacturing plants live on the DRL solution" },
];

export type ProjectGraphic =
  | "logbook"
  | "routing"
  | "ticket"
  | "governance"
  | "cmdb"
  | "document"
  | "ai"
  | "discovery"
  | "software"
  | "people";

export type Project = {
  slug: string;
  title: string;
  client: string;
  industry?: string;
  role?: string;
  category: string;
  graphic: ProjectGraphic;
  metric: { value: string; label: string };
  tags: string[];
  /** One-line problem statement for the card. */
  problem: string;
  challenge: string;
  solution: string;
  /** Illustrative implementation flow, built from the resume points. */
  flow: string[];
  modules: string[];
  integrations: string[];
  impact: string;
  /** The resume bullet points, used as "My role and responsibilities". */
  points: string[];
};

export type Experience = {
  company: string;
  role: string;
  type: "Delivery" | "Pre-Sales";
  location: string;
  period: string;
  summary: string;
  responsibilities: string[];
  projects: Project[];
};

export const experience: Experience[] = [
  {
    company: "AWC Software Pvt. Ltd.",
    role: "Senior Solution Consultant & Developer",
    type: "Delivery",
    location: "Noida",
    period: "May 2025 — Present",
    summary:
      "Leading end-to-end ServiceNow implementations for enterprise clients across Medical and Manufacturing industries, owning the full delivery lifecycle from stakeholder workshops and solution architecture through development, UAT, and post-go-live support. Manages cross-functional teams, authors SOWs and architecture models for Fixed Price and Change Request engagements, and serves as Training Lead for a 15-member onboarding cohort on ServiceNow Core and ITSM fundamentals.",
    responsibilities: [
      "Leads end-to-end ServiceNow implementations for enterprise clients across Medical and Manufacturing industries",
      "Owns the full delivery lifecycle: stakeholder workshops, solution architecture, development, UAT and post-go-live support",
      "Manages cross-functional teams and authors SOWs and architecture models for Fixed Price and Change Request engagements",
      "Training Lead for a 15-member onboarding cohort on ServiceNow Core and ITSM fundamentals",
    ],
    projects: [
      {
        slug: "drl-logbook",
        title: "Logbook Digitisation",
        client: "Dr. Reddy's Laboratories (DRL)",
        industry: "Pharmaceutical manufacturing",
        category: "Custom Application · App Engine",
        graphic: "logbook",
        metric: { value: "25", label: "manufacturing plants live pan-India" },
        tags: ["App Engine", "Flow Designer", "Audit Trails"],
        problem: "Paper-based SOP logbooks meant manual effort, human error and compliance risk.",
        challenge:
          "Manufacturing plants ran SOP activities on manual, paper-based logbooks. That meant significant manual effort, room for human error and compliance risk, and any solution had to work across many plants without per-plant rework.",
        solution:
          "A fully paperless SOP management system built on App Engine and Flow Designer. Recurring monthly activities, generic assignments and audit trails are created automatically, and the design is plant-agnostic, so every site adopts it without per-plant customisation.",
        flow: [
          "SOP and logbook definitions",
          "Flow Designer creates recurring monthly activities",
          "Generic assignments generated for plant teams",
          "Activities completed digitally",
          "Audit trail recorded automatically",
        ],
        modules: ["App Engine", "Flow Designer"],
        integrations: [],
        impact: "Live across 25 manufacturing plants pan-India, with manual logbooks eliminated.",
        points: [
          "Designed and delivered a fully paperless SOP management system deployed across 25 manufacturing plants pan-India, eliminating manual logbook processes and reducing compliance risk",
          "Automated recurring monthly activity creation, generic assignment generation, and audit trails — cutting manual effort and human error significantly",
          "Leveraged App Engine and Flow Designer to build a scalable, plant-agnostic solution adoptable without per-plant customisation",
        ],
      },
      {
        slug: "approval-ris",
        title: "Approval Digitisation & Routing Identification System",
        client: "Enterprise Client",
        category: "Workflow Automation",
        graphic: "routing",
        metric: { value: "40", label: "approval hierarchy levels, configured without code" },
        tags: ["No-code Routing", "Approvals", "Workflow"],
        problem: "Hardcoded approval logic made every approval change a developer task.",
        challenge:
          "Approval logic was hardcoded, so every change to an approval chain needed developer intervention and a change request, with turnaround measured in days.",
        solution:
          "A code-less Routing Identification System (RIS) that builds dynamic, multi-level approval workflows from configuration. It supports approval, rejection and refer-back flows, and auto-generates approval chains of up to 40 hierarchy levels.",
        flow: [
          "Request submitted",
          "RIS identifies the route from configuration",
          "Approval chain auto-generated (up to 40 levels)",
          "Approve, reject or refer back",
          "Request proceeds",
        ],
        modules: ["Approvals", "Workflow automation"],
        integrations: [],
        impact:
          "Turnaround for approval changes cut from days to minutes, with no developer intervention.",
        points: [
          "Architected a code-less Routing Identification System (RIS) enabling dynamic, multi-level approval workflows configurable without developer intervention",
          "Supported approval, rejection, and refer-back flows with auto-generated approval chains scaling up to 40 hierarchy levels",
          "Eliminated dependency on hardcoded approval logic, reducing change request turnaround for approval modifications from days to minutes",
        ],
      },
      {
        slug: "csm-ticketing",
        title: "Custom CSM Ticketing System",
        client: "Enterprise Client",
        category: "Customer Service · App Engine",
        graphic: "ticket",
        metric: { value: "Zero", label: "additional CSM licences required" },
        tags: ["App Engine", "SLA Management", "Routing"],
        problem: "Customer ticketing was needed without the cost of extra CSM licences.",
        challenge:
          "The client needed customer ticketing with consistent response standards, without taking on the cost of additional CSM licences.",
        solution:
          "A cost-effective, App Engine-native ticketing system that replicates core CSM capabilities, with dynamic flow-based routing and SLA management to keep customer response standards consistent.",
        flow: [
          "Customer raises a ticket",
          "Flow-based dynamic routing",
          "Assigned to the right team",
          "SLA tracked to the response standard",
          "Resolved",
        ],
        modules: ["App Engine", "Flow Designer", "SLA Management"],
        integrations: [],
        impact:
          "Core CSM capabilities delivered without additional CSM licensing, a measurable licence cost saving.",
        points: [
          "Designed a cost-effective, App Engine-native customer ticketing system replicating core CSM capabilities without additional CSM licensing — delivering measurable license cost savings",
          "Built dynamic flow-based routing and SLA management to ensure consistent customer response standards",
        ],
      },
      {
        slug: "managed-services",
        title: "Managed Services Lead",
        client: "Enterprise Client",
        category: "Managed Services",
        graphic: "governance",
        metric: { value: "6", label: "month managed services engagement" },
        tags: ["Governance", "Continuous Improvement"],
        problem: "The platform needed ongoing governance, issue resolution and improvement.",
        challenge:
          "An enterprise client needed one accountable point of contact for platform governance, issue resolution and continuous improvement after go-live.",
        solution:
          "Led a 6-month managed services engagement as primary point of contact, running daily operational calls and monthly workflow reviews, and delivering monthly consulting recommendations.",
        flow: [
          "Daily operational calls",
          "Proactive issue resolution",
          "Monthly workflow review",
          "Consulting recommendations",
        ],
        modules: ["Platform governance"],
        integrations: [],
        impact:
          "Platform issues resolved before they reached the business, with improved solution performance and client satisfaction.",
        points: [
          "Led a 6-month managed services engagement as primary point of contact for governance, issue resolution, and continuous improvement",
          "Conducted daily operational calls and monthly workflow review sessions, proactively resolving platform issues before business impact",
          "Delivered monthly consulting recommendations that improved solution performance and client satisfaction",
        ],
      },
      {
        slug: "mueller-cmdb",
        title: "CMDB & Integration Engineering",
        client: "Mueller Water Products",
        industry: "Water infrastructure",
        role: "BAU Lead Developer",
        category: "CMDB & ITOM",
        graphic: "cmdb",
        metric: { value: "2", label: "monitoring tools integrated into CMDB" },
        tags: ["CMDB", "IRE", "Automox", "Auvik"],
        problem: "Endpoint and network data had to reach the CMDB without duplicate CIs.",
        challenge:
          "Endpoint, software and network data needed to reach the CMDB automatically and without duplicate CIs, so that the CMDB could be trusted as a single source of truth for ITOM.",
        solution:
          "Integrated Automox for endpoint discovery and software inventory, and Auvik for network event and alert ingestion. Designed IRE identification and reconciliation rules with data source precedence, and defined CI classes, relationships and normalization standards aligned with ITOM requirements.",
        flow: [
          "Automox: endpoints and software inventory",
          "Auvik: network events and alerts",
          "IRE identification and reconciliation",
          "Normalized CI classes and relationships",
          "CMDB as single source of truth",
        ],
        modules: ["CMDB", "IRE", "ITOM"],
        integrations: ["Automox", "Auvik"],
        impact:
          "Duplicate CIs eliminated, faster detection of network anomalies (lower MTTD), and a CMDB established as a single source of truth.",
        points: [
          "Integrated Automox with ServiceNow to automate endpoint discovery and software inventory population into CMDB",
          "Configured Auvik integration for network event and alert ingestion, reducing mean time to detect (MTTD) for network anomalies",
          "Designed CMDB IRE (Identification & Reconciliation Engine) rules — identification rules, reconciliation logic, data source precedence — eliminating duplicate CIs",
          "Defined CI classes, relationships, and normalization standards aligned with ITOM requirements, establishing CMDB as a single source of truth",
        ],
      },
    ],
  },
  {
    company: "Input Zero Technologies Pvt. Ltd.",
    role: "Solution Consultant & Pre-Sales",
    type: "Pre-Sales",
    location: "Gurugram",
    period: "June 2023 — April 2025",
    summary:
      "Drove pre-sales and solutioning efforts by delivering rapid, high-impact Proof of Concepts (POCs) to enterprise prospects across BFSI, FMCG, Manufacturing, and Aviation sectors. Owned the full pre-sales cycle — from initial client discovery calls and live demonstrations through effort estimation, SOW authoring, architecture modelling, and handover to delivery teams.",
    responsibilities: [
      "Delivered rapid, high-impact POCs to enterprise prospects across BFSI, FMCG, Manufacturing and Aviation",
      "Owned the full pre-sales cycle, from client discovery calls and live demonstrations to effort estimation",
      "Authored SOWs and architecture models, then handed over to delivery teams",
    ],
    projects: [
      {
        slug: "docintel",
        title: "DocIntel — AI-Powered Invoice Automation",
        client: "Pernod Ricard India",
        industry: "Beverages · FMCG",
        category: "AI · Document Intelligence",
        graphic: "document",
        metric: { value: "3", label: "critical invoice fields auto-validated" },
        tags: ["App Engine", "AI/ML OCR", "Vendor Portal"],
        problem: "Invoices and vendor data were verified by hand.",
        challenge:
          "Invoice handling and vendor portal management depended on manually verifying PO numbers, GST and compliance data.",
        solution:
          "An AI/ML OCR-based document intelligence solution on App Engine that automates end-to-end invoice handling and vendor portal management, with automated validation of PO numbers, GST and compliance data.",
        flow: [
          "Vendor submits invoice through the portal",
          "AI/ML OCR extracts invoice data",
          "PO number, GST and compliance validated",
          "Invoice workflow on App Engine",
          "Vendor portal updated",
        ],
        modules: ["App Engine", "AI/ML OCR", "Vendor portal"],
        integrations: [],
        impact:
          "Manual verification effort eliminated, on an integration-ready architecture that handles high invoice volumes without additional licensing overhead.",
        points: [
          "Designed and demonstrated an AI/ML OCR-based document intelligence solution on ServiceNow App Engine, automating end-to-end invoice handling and vendor portal management",
          "Built automated validation logic for PO numbers, GST, and compliance data — eliminating manual verification effort",
          "Showcased a scalable, integration-ready architecture capable of handling high invoice volumes without additional licensing overhead",
        ],
      },
      {
        slug: "now-assist-events",
        title: "NOW Assist Event Priority Handler",
        client: "Adani Enterprise",
        industry: "Conglomerate",
        category: "GenAI · Event Management",
        graphic: "ai",
        metric: { value: "GenAI", label: "event triage with no custom model" },
        tags: ["NOW Assist", "LLM", "NLP"],
        problem: "Major events were triaged by hand, slowing incident response.",
        challenge:
          "Major events had to be triaged and prioritised manually, which slowed incident response.",
        solution:
          "An NLP and ServiceNow LLM-powered event prioritisation solution using NOW Assist. It gives codeless, AI-driven triage of major events, using platform-native GenAI rather than custom model development.",
        flow: [
          "Major event raised",
          "NOW Assist (LLM + NLP) analyses the event",
          "Priority assigned automatically",
          "Faster incident response",
        ],
        modules: ["NOW Assist", "ServiceNow LLM"],
        integrations: [],
        impact:
          "Less manual triage and faster incident response, with GenAI that is quick to deploy and easy to maintain.",
        points: [
          "Architected an NLP + ServiceNow LLM-powered event prioritization solution using NOW Assist (GenAI capabilities)",
          "Enabled codeless, AI-driven triage of major events — reducing manual system triage effort and accelerating incident response",
          "Demonstrated platform-native GenAI adoption without custom model development, fast to deploy and easy to maintain",
        ],
      },
      {
        slug: "jkcl-discovery",
        title: "Discovery & Asset Management POC",
        client: "JKCL Manufacturing",
        industry: "Manufacturing",
        category: "ITAM · Discovery",
        graphic: "discovery",
        metric: { value: "40%", label: "improvement in CMDB accuracy in 12 days" },
        tags: ["Discovery", "HAM", "SAM"],
        problem: "The client needed proof that ServiceNow could beat its incumbent tool.",
        challenge:
          "The client was comparing ServiceNow against its incumbent tool and needed proof of better CMDB accuracy and asset lifecycle management, quickly.",
        solution:
          "A fully functional Discovery and Asset Management POC across 2 manufacturing locations and a central office, delivered in 12 days, which also streamlined the procurement and disposal lifecycle.",
        flow: [
          "Discovery across 2 plants and a central office",
          "CMDB populated",
          "Hardware and software assets (HAM / SAM)",
          "Procurement to disposal lifecycle",
        ],
        modules: ["Discovery", "CMDB", "HAM", "SAM"],
        integrations: [],
        impact:
          "A 40% improvement in CMDB accuracy over the incumbent tool, demonstrated in 12 days.",
        points: [
          "Delivered a fully functional Discovery and Asset Management POC across 2 manufacturing locations and a central office in just 12 days",
          "Competed directly against the client's incumbent tool and demonstrated a 40% improvement in CMDB accuracy",
          "Streamlined the client's Procurement and Disposal lifecycle within the same POC scope, showcasing end-to-end HAM/SAM capability",
        ],
      },
      {
        slug: "slk-sam",
        title: "Software Asset Management & Discovery",
        client: "SLK Software",
        industry: "IT services",
        category: "SAM · Endpoint Management",
        graphic: "software",
        metric: { value: "Real-time", label: "software inventory and compliance" },
        tags: ["Microsoft Intune", "Discovery", "ACC"],
        problem: "Software distribution and compliance tracking relied on manual IT effort.",
        challenge:
          "Software distribution, inventory and compliance tracking relied on manual IT effort.",
        solution:
          "Automated end-to-end software distribution by integrating Microsoft Intune with ServiceNow Discovery and Agent Client Collector (ACC).",
        flow: [
          "Microsoft Intune",
          "Discovery and Agent Client Collector",
          "Software inventory in ServiceNow",
          "Compliance tracking",
        ],
        modules: ["SAM", "Discovery", "Agent Client Collector"],
        integrations: ["Microsoft Intune"],
        impact:
          "Real-time software inventory visibility and compliance tracking, with less manual IT overhead.",
        points: [
          "Automated end-to-end software distribution by integrating Microsoft Intune with ServiceNow Discovery and Agent Client Collector (ACC)",
          "Enabled real-time software inventory visibility and compliance tracking, reducing manual IT overhead",
        ],
      },
      {
        slug: "adani-airports-hrsd",
        title: "HR Service Desk & Catalog Automation",
        client: "Adani Airports",
        industry: "Aviation",
        category: "HR Service Delivery",
        graphic: "people",
        metric: { value: "4", label: "HR processes digitised end-to-end" },
        tags: ["HRSD", "Service Catalog"],
        problem: "HR services depended on manual coordination.",
        challenge:
          "HR services such as onboarding, offboarding and compliance processes depended on manual HR coordination.",
        solution:
          "HRSD catalog workflows covering Onboarding, Offboarding, POSH compliance and Anti-Harassment processes, standardising and digitising HR service delivery.",
        flow: [
          "Employee request through the Service Catalog",
          "HRSD workflow: Onboarding, Offboarding, POSH, Anti-Harassment",
          "HR fulfilment",
          "Request closed",
        ],
        modules: ["HRSD", "Service Catalog"],
        integrations: [],
        impact:
          "Four HR processes digitised end to end, reducing manual HR coordination and improving employee experience at scale.",
        points: [
          "Designed and delivered HRSD catalog workflows covering Onboarding, Offboarding, POSH compliance, and Anti-Harassment processes",
          "Standardized and digitized HR service delivery, reducing dependency on manual HR coordination and improving employee experience at scale",
        ],
      },
    ],
  },
];

export const skillGroups = [
  {
    title: "ServiceNow Platform",
    description: "Modules implemented, configured and extended for enterprise clients.",
    skills: ["ITSM", "CMDB", "HAM", "SAM", "ITOM", "HRSD", "CSM", "App Engine", "NOW Assist", "AI Agent"],
  },
  {
    title: "Development",
    description: "Server and client-side scripting, flows and data integration.",
    skills: [
      "JavaScript",
      "Business Rules",
      "Script Includes",
      "Client Scripts",
      "GlideRecord",
      "GlideAjax",
      "Flow Designer",
      "Integration Hub",
      "REST/SOAP",
      "Transform Maps",
    ],
  },
  {
    title: "CMDB & Discovery",
    description: "Keeping the CMDB accurate, de-duplicated and trustworthy.",
    skills: [
      "IRE",
      "Discovery",
      "Agent Client Collector (ACC)",
      "CI Class Manager",
      "Normalization",
      "Reconciliation Rules",
    ],
  },
  {
    title: "Integrations",
    description: "Connecting ServiceNow to endpoint, network and HR systems.",
    skills: ["Microsoft Intune", "Automox", "Auvik", "Workday", "SCCM", "SuccessFactors APIs"],
  },
  {
    title: "Consulting",
    description: "From the first workshop to a signed SOW and beyond go-live.",
    skills: [
      "Solution Architecture",
      "SOW Authoring",
      "Pre-Sales",
      "POC Delivery",
      "Stakeholder Management",
      "Managed Services",
      "Training",
    ],
  },
  {
    title: "Also",
    description: "",
    skills: ["Python", "Agile", "ITIL", "Update Sets", "draw.io"],
  },
];

export type Certification = {
  code: string;
  name: string;
  issuer: string;
  /** Add the official verification link (e.g. from ServiceNow's credential portal) to show a "Verify" button. */
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  { code: "CSA", name: "Certified System Administrator", issuer: "ServiceNow" },
  { code: "CIS-ITSM", name: "Certified Implementation Specialist — IT Service Management", issuer: "ServiceNow" },
  { code: "CIS-HAM", name: "Certified Implementation Specialist — Hardware Asset Management", issuer: "ServiceNow" },
  { code: "CIS-SAM", name: "Certified Implementation Specialist — Software Asset Management", issuer: "ServiceNow" },
  { code: "CIS-DF", name: "Certified Implementation Specialist — Data Foundations", issuer: "ServiceNow" },
];

export const education = {
  school: "University Institute of Engineering and Technology (UIET), Kurukshetra University",
  degree: "B.Tech in Electronics and Communication Engineering",
  detail: "8.34 CGPA",
};

export const achievements = [
  "National Kho-Kho Championship — 1st Runner-Up",
  "Academic Excellence — 100% Scholarship and 3rd Rank in District",
];

/** "How I build" delivery stages, grounded in the responsibilities above. */
export const deliveryStages = [
  {
    title: "Discovery & Requirement Analysis",
    detail: "Stakeholder workshops and client discovery calls to map processes, pain points and success criteria.",
  },
  {
    title: "Solution Architecture & Design",
    detail: "Solution architecture and effort estimation, captured in SOWs and architecture models.",
  },
  {
    title: "Development & Integration",
    detail: "Building on App Engine, Flow Designer and platform scripting, and integrating tools like Intune, Automox and Auvik.",
  },
  {
    title: "Testing & UAT",
    detail: "Testing with the business and user acceptance testing before go-live.",
  },
  {
    title: "Deployment & Continuous Improvement",
    detail: "Go-live, post-go-live support, and managed-services governance with monthly improvement reviews.",
  },
];

export type ArchitectureNode = { title: string; detail?: string };

/** Illustrative diagrams of delivered work. Each node maps to a resume statement. */
export const architectures: {
  title: string;
  source: string;
  slug: string;
  columns: { label: string; nodes: ArchitectureNode[] }[];
}[] = [
  {
    title: "CMDB Integration Architecture",
    source: "Mueller Water Products",
    slug: "mueller-cmdb",
    columns: [
      {
        label: "Sources",
        nodes: [
          { title: "Automox", detail: "Endpoints and software inventory" },
          { title: "Auvik", detail: "Network events and alerts" },
        ],
      },
      {
        label: "Identification",
        nodes: [
          { title: "IRE", detail: "Identification and reconciliation rules, data source precedence" },
          { title: "Normalization", detail: "CI classes and relationships" },
        ],
      },
      {
        label: "Platform",
        nodes: [{ title: "CMDB", detail: "Single source of truth for ITOM" }],
      },
    ],
  },
  {
    title: "AI-Powered Invoice Automation",
    source: "Pernod Ricard India · DocIntel",
    slug: "docintel",
    columns: [
      { label: "Intake", nodes: [{ title: "Vendor portal", detail: "Invoice submission" }] },
      { label: "Extraction", nodes: [{ title: "AI/ML OCR", detail: "Reads invoice data" }] },
      {
        label: "Validation",
        nodes: [{ title: "Validation rules", detail: "PO number, GST and compliance data" }],
      },
      { label: "Workflow", nodes: [{ title: "App Engine", detail: "End-to-end invoice handling" }] },
    ],
  },
  {
    title: "Discovery & Asset Management",
    source: "JKCL Manufacturing · SLK Software",
    slug: "jkcl-discovery",
    columns: [
      {
        label: "Discover",
        nodes: [
          { title: "Discovery", detail: "2 plants and a central office" },
          { title: "Intune + ACC", detail: "Software distribution and inventory" },
        ],
      },
      { label: "Record", nodes: [{ title: "CMDB", detail: "Accurate, reconciled CIs" }] },
      {
        label: "Manage",
        nodes: [
          { title: "HAM", detail: "Procurement to disposal" },
          { title: "SAM", detail: "Software compliance" },
        ],
      },
    ],
  },
];

export type WorkspaceProject = Project & {
  number: string;
  company: string;
  engagement: "Delivery" | "Pre-Sales";
  role: string;
};

/** Every project as a numbered record, shared by the projects section and the Virtual Agent. */
export const workspaceProjects: WorkspaceProject[] = experience
  .flatMap((job) =>
    job.projects.map((project) => ({
      ...project,
      company: job.company.replace(" Pvt. Ltd.", ""),
      engagement: job.type,
      role: project.role ?? job.role,
    }))
  )
  .map((project, i) => ({ ...project, number: `PRJ${String(10001 + i).padStart(7, "0")}` }));

/** The case studies featured as cards, in priority order. */
export const featuredSlugs = [
  "drl-logbook",
  "approval-ris",
  "csm-ticketing",
  "mueller-cmdb",
  "docintel",
  "now-assist-events",
  "jkcl-discovery",
  "slk-sam",
  "adani-airports-hrsd",
];
