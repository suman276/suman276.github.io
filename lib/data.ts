export const profile = {
  name: "Suman Mondal",
  role: "ServiceNow Consultant & Developer",
  tagline:
    "3+ years delivering end-to-end ServiceNow implementations across ITSM, HAM, SAM, CMDB, App Engine, and AI-powered workflows for global enterprises.",
  summary:
    "Results-driven ServiceNow Consultant and Developer with 3+ years of experience delivering end-to-end digital transformation engagements for global enterprises. Combines deep platform expertise — across ITSM, HAM, SAM, CMDB, App Engine, and AI-powered workflows — with strong consulting fundamentals including client discovery, solution architecture, effort estimation, and governance. Certified ServiceNow professional (CSA, CIS-ITSM, CIS-HAM, CIS-SAM, CIS-DF) with demonstrated success in pre-sales POC delivery, managed services leadership, and training.",
  email: "imsuman276@gmail.com",
  linkedin: "https://www.linkedin.com/in/mondalsuman/",
  location: "Noida, India",
};

export const stats = [
  { value: "3+", label: "Years in ServiceNow" },
  { value: "5", label: "Certifications" },
  { value: "10", label: "Enterprise projects delivered" },
  { value: "25+", label: "Sites/plants deployed to" },
];

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  projects: {
    title: string;
    client: string;
    points: string[];
  }[];
};

export const experience: Experience[] = [
  {
    company: "AWC Software Pvt. Ltd.",
    role: "Senior Solution Consultant & Developer",
    location: "Noida",
    period: "May 2025 — Present",
    summary:
      "Leading end-to-end ServiceNow implementations for enterprise clients across Medical and Manufacturing industries, owning the full delivery lifecycle from stakeholder workshops and solution architecture through development, UAT, and post-go-live support. Manages cross-functional teams, authors SOWs and architecture models for Fixed Price and Change Request engagements, and serves as Training Lead for a 15-member onboarding cohort on ServiceNow Core and ITSM fundamentals.",
    projects: [
      {
        title: "Logbook Digitisation",
        client: "Dr. Reddy's Laboratories (DRL)",
        points: [
          "Designed and delivered a fully paperless SOP management system deployed across 25 manufacturing plants pan-India, eliminating manual logbook processes and reducing compliance risk",
          "Automated recurring monthly activity creation, generic assignment generation, and audit trails — cutting manual effort and human error significantly",
          "Leveraged App Engine and Flow Designer to build a scalable, plant-agnostic solution adoptable without per-plant customisation",
        ],
      },
      {
        title: "Approval Digitisation & Transformation",
        client: "Enterprise Client",
        points: [
          "Architected a code-less Routing Identification System (RIS) enabling dynamic, multi-level approval workflows configurable without developer intervention",
          "Supported approval, rejection, and refer-back flows with auto-generated approval chains scaling up to 40 hierarchy levels",
          "Eliminated dependency on hardcoded approval logic, reducing change request turnaround for approval modifications from days to minutes",
        ],
      },
      {
        title: "Custom CSM Ticketing System",
        client: "App Engine",
        points: [
          "Designed a cost-effective, App Engine-native customer ticketing system replicating core CSM capabilities without additional CSM licensing — delivering measurable license cost savings",
          "Built dynamic flow-based routing and SLA management to ensure consistent customer response standards",
        ],
      },
      {
        title: "Managed Services Lead",
        client: "Post-Implementation Support",
        points: [
          "Led a 6-month managed services engagement as primary point of contact for governance, issue resolution, and continuous improvement",
          "Conducted daily operational calls and monthly workflow review sessions, proactively resolving platform issues before business impact",
          "Delivered monthly consulting recommendations that improved solution performance and client satisfaction",
        ],
      },
      {
        title: "CMDB & Integration Engineering",
        client: "Mueller Water Products (BAU Lead Developer)",
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
    location: "Gurugram",
    period: "June 2023 — April 2025",
    summary:
      "Drove pre-sales and solutioning efforts by delivering rapid, high-impact Proof of Concepts (POCs) to enterprise prospects across BFSI, FMCG, Manufacturing, and Aviation sectors. Owned the full pre-sales cycle — from initial client discovery calls and live demonstrations through effort estimation, SOW authoring, architecture modelling, and handover to delivery teams.",
    projects: [
      {
        title: "DocIntel — AI-Powered Invoice Automation",
        client: "Pernod Ricard India",
        points: [
          "Designed and demonstrated an AI/ML OCR-based document intelligence solution on ServiceNow App Engine, automating end-to-end invoice handling and vendor portal management",
          "Built automated validation logic for PO numbers, GST, and compliance data — eliminating manual verification effort",
          "Showcased a scalable, integration-ready architecture capable of handling high invoice volumes without additional licensing overhead",
        ],
      },
      {
        title: "NOW Assist Event Priority Handler",
        client: "Adani Enterprise",
        points: [
          "Architected an NLP + ServiceNow LLM-powered event prioritization solution using NOW Assist (GenAI capabilities)",
          "Enabled codeless, AI-driven triage of major events — reducing manual system triage effort and accelerating incident response",
          "Demonstrated platform-native GenAI adoption without custom model development, fast to deploy and easy to maintain",
        ],
      },
      {
        title: "Discovery & Asset Management POC",
        client: "JKCL Manufacturing",
        points: [
          "Delivered a fully functional Discovery and Asset Management POC across 2 manufacturing locations and a central office in just 12 days",
          "Competed directly against the client's incumbent tool and demonstrated a 40% improvement in CMDB accuracy",
          "Streamlined the client's Procurement and Disposal lifecycle within the same POC scope, showcasing end-to-end HAM/SAM capability",
        ],
      },
      {
        title: "Software Asset Management & Discovery",
        client: "SLK Software",
        points: [
          "Automated end-to-end software distribution by integrating Microsoft Intune with ServiceNow Discovery and Agent Client Collector (ACC)",
          "Enabled real-time software inventory visibility and compliance tracking, reducing manual IT overhead",
        ],
      },
      {
        title: "HR Service Desk & Catalog Automation",
        client: "Adani Airports",
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
    title: "ServiceNow Modules",
    skills: [
      "ITSM",
      "CMDB",
      "HAM",
      "SAM",
      "App Engine",
      "CSM",
      "ITOM",
      "HRSD",
      "NOW Assist",
      "AI Agent",
    ],
  },
  {
    title: "Development",
    skills: [
      "Flow Designer",
      "Integration Hub",
      "Business Rules",
      "Script Includes",
      "Client Scripts",
      "GlideRecord",
      "GlideAjax",
      "REST/SOAP",
      "Transform Maps",
      "Update Sets",
    ],
  },
  {
    title: "CMDB & Discovery",
    skills: [
      "IRE",
      "Discovery",
      "Agent Client Collector (ACC)",
      "CI Class Management",
      "Normalization",
    ],
  },
  {
    title: "Integrations",
    skills: [
      "Automox",
      "Auvik",
      "Microsoft Intune",
      "Workday",
      "SCCM",
      "SuccessFactors REST APIs",
    ],
  },
  {
    title: "Consulting",
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
    title: "Other",
    skills: ["JavaScript", "Python", "Agile", "ITIL", "draw.io"],
  },
];

export const certifications = [
  {
    code: "CSA",
    name: "Certified System Administrator",
  },
  {
    code: "CIS-ITSM",
    name: "Certified Implementation Specialist — ITSM",
  },
  {
    code: "CIS-HAM",
    name: "Certified Implementation Specialist — HAM",
  },
  {
    code: "CIS-SAM",
    name: "Certified Implementation Specialist — SAM",
  },
  {
    code: "CIS-DF",
    name: "Certified Implementation Specialist — Data Foundations",
  },
];

export const education = {
  school: "University Institute of Engineering and Technology, Kurukshetra University, India",
  degree: "B.Tech in Electronics and Communication Engineering",
  detail: "8.34 CGPA",
};

export const achievements = [
  "National Athlete — 1st Runner-Up, National Kho-Kho Championship",
  "Academic Excellence — 100% Scholarship, 3rd Rank in District (DPS Admission Exam)",
];
