export type Job = {
  id: string;
  title: string;
  company: string;
  companyId: string;
  logo: string;
  location: string;
  remote: boolean;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  category: string;
  salaryMin: number;
  salaryMax: number;
  posted: string;
  summary: string;
  description: string;
  requirements: string[];
  perks: string[];
  tags: string[];
};

export type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  size: string;
  about: string;
  accent: string;
};

export const categories = [
  "Engineering",
  "Design",
  "Marketing",
  "Data",
  "Product",
  "Support",
] as const;

export const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"] as const;

export const companies: Company[] = [
  {
    id: "nebula",
    name: "Nebula Labs",
    logo: "NL",
    industry: "AI Infrastructure",
    location: "San Francisco, CA",
    size: "120-250",
    about: "Building the developer platform for large-scale model training and inference.",
    accent: "from-primary to-violet",
  },
  {
    id: "lumen",
    name: "Lumen Studio",
    logo: "LS",
    industry: "Design & Brand",
    location: "Lisbon, Portugal",
    size: "20-50",
    about: "A product design studio crafting interfaces for climate-tech founders.",
    accent: "from-pink to-coral",
  },
  {
    id: "orbit",
    name: "Orbit Financial",
    logo: "OF",
    industry: "Fintech",
    location: "London, UK",
    size: "500-1000",
    about: "Modern banking rails for cross-border businesses in 40+ markets.",
    accent: "from-teal to-primary",
  },
  {
    id: "verdant",
    name: "Verdant Health",
    logo: "VH",
    industry: "Health Tech",
    location: "Austin, TX",
    size: "80-120",
    about: "Preventive care software used by 1,400 clinics across North America.",
    accent: "from-teal to-amber",
  },
  {
    id: "pixelforge",
    name: "PixelForge",
    logo: "PF",
    industry: "Gaming",
    location: "Berlin, Germany",
    size: "250-500",
    about: "Independent game studio behind three award-winning narrative titles.",
    accent: "from-violet to-pink",
  },
  {
    id: "cargolink",
    name: "CargoLink",
    logo: "CL",
    industry: "Logistics",
    location: "Singapore",
    size: "1000+",
    about: "Freight visibility and routing intelligence for global supply chains.",
    accent: "from-amber to-coral",
  },
];

export const jobs: Job[] = [
  {
    id: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    company: "Nebula Labs",
    companyId: "nebula",
    logo: "NL",
    location: "San Francisco, CA",
    remote: true,
    type: "Full-time",
    category: "Engineering",
    salaryMin: 160000,
    salaryMax: 210000,
    posted: "2 days ago",
    summary: "Own the interface layer of a developer platform used by thousands of ML teams.",
    description:
      "You will lead frontend architecture for our model training console, partnering with design and infra to ship interfaces that make distributed training feel effortless. Expect deep ownership, fast iteration, and a codebase that values clarity over cleverness.",
    requirements: [
      "5+ years building production React applications",
      "Strong TypeScript and modern state management experience",
      "Comfort with data-dense dashboards and real-time updates",
      "Track record of mentoring engineers",
    ],
    perks: ["Equity", "Remote-first", "Learning budget", "Health & dental"],
    tags: ["React", "TypeScript", "Design Systems"],
  },
  {
    id: "product-designer",
    title: "Product Designer",
    company: "Lumen Studio",
    companyId: "lumen",
    logo: "LS",
    location: "Lisbon, Portugal",
    remote: true,
    type: "Full-time",
    category: "Design",
    salaryMin: 70000,
    salaryMax: 95000,
    posted: "5 days ago",
    summary: "Shape end-to-end product experiences for climate-tech founders.",
    description:
      "Join a small senior team where designers write the brief, run research, and ship the final UI. You will work across 2-3 client engagements per year with real ownership of outcomes.",
    requirements: [
      "Portfolio showing shipped product work",
      "Fluency in Figma and prototyping",
      "Comfortable presenting to founders",
    ],
    perks: ["4-day summer weeks", "Studio retreats", "Hardware budget"],
    tags: ["Figma", "Research", "Prototyping"],
  },
  {
    id: "backend-engineer-payments",
    title: "Backend Engineer, Payments",
    company: "Orbit Financial",
    companyId: "orbit",
    logo: "OF",
    location: "London, UK",
    remote: false,
    type: "Full-time",
    category: "Engineering",
    salaryMin: 95000,
    salaryMax: 130000,
    posted: "1 day ago",
    summary: "Build the ledger and settlement services behind cross-border transfers.",
    description:
      "Our payments core moves money across 40 markets. You will design idempotent services, harden reconciliation, and reduce settlement latency for high-volume corridors.",
    requirements: [
      "Strong Go, Java, or Rust experience",
      "Distributed systems and event-driven design",
      "Understanding of double-entry accounting concepts",
    ],
    perks: ["Pension match", "Hybrid 3 days", "Annual bonus"],
    tags: ["Go", "Kafka", "PostgreSQL"],
  },
  {
    id: "growth-marketing-manager",
    title: "Growth Marketing Manager",
    company: "Verdant Health",
    companyId: "verdant",
    logo: "VH",
    location: "Austin, TX",
    remote: true,
    type: "Full-time",
    category: "Marketing",
    salaryMin: 85000,
    salaryMax: 115000,
    posted: "3 days ago",
    summary: "Own acquisition across paid, lifecycle, and partner channels.",
    description:
      "You will run the full growth loop for a clinical SaaS product: channel experiments, lifecycle email, and co-marketing with health systems.",
    requirements: [
      "4+ years in B2B growth or demand gen",
      "Hands-on with paid channels and analytics",
      "Strong written communication",
    ],
    perks: ["Remote", "401k", "Wellness stipend"],
    tags: ["SEO", "Lifecycle", "Paid Social"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    company: "CargoLink",
    companyId: "cargolink",
    logo: "CL",
    location: "Singapore",
    remote: false,
    type: "Full-time",
    category: "Data",
    salaryMin: 90000,
    salaryMax: 125000,
    posted: "6 days ago",
    summary: "Model routing efficiency across millions of freight movements.",
    description:
      "Work with operations and engineering to forecast ETAs, detect route anomalies, and quantify carbon impact for enterprise shippers.",
    requirements: [
      "Python, SQL, and modern ML tooling",
      "Experience with time-series forecasting",
      "Ability to communicate findings to non-technical stakeholders",
    ],
    perks: ["Relocation support", "Annual bonus", "Learning budget"],
    tags: ["Python", "Forecasting", "SQL"],
  },
  {
    id: "gameplay-engineer",
    title: "Gameplay Engineer",
    company: "PixelForge",
    companyId: "pixelforge",
    logo: "PF",
    location: "Berlin, Germany",
    remote: false,
    type: "Full-time",
    category: "Engineering",
    salaryMin: 75000,
    salaryMax: 105000,
    posted: "1 week ago",
    summary: "Craft moment-to-moment gameplay systems for a narrative action title.",
    description:
      "You will prototype combat and traversal mechanics, tune feel with designers, and keep frame budgets healthy on console targets.",
    requirements: [
      "C++ and Unreal Engine experience",
      "Strong 3D math fundamentals",
      "Shipped at least one title",
    ],
    perks: ["Relocation", "Game budget", "Flexible hours"],
    tags: ["C++", "Unreal", "Gameplay"],
  },
  {
    id: "product-manager-platform",
    title: "Product Manager, Platform",
    company: "Nebula Labs",
    companyId: "nebula",
    logo: "NL",
    location: "Remote",
    remote: true,
    type: "Full-time",
    category: "Product",
    salaryMin: 140000,
    salaryMax: 180000,
    posted: "4 days ago",
    summary: "Define the roadmap for compute orchestration and developer APIs.",
    description:
      "Partner with infra leads to turn a powerful engine into a product developers love. You will own discovery, pricing input, and launch quality.",
    requirements: [
      "Technical PM background",
      "Experience with developer or infra products",
      "Comfort writing specs and API docs",
    ],
    perks: ["Equity", "Remote-first", "Conference budget"],
    tags: ["Roadmap", "APIs", "Developer Tools"],
  },
  {
    id: "customer-support-specialist",
    title: "Customer Support Specialist",
    company: "Verdant Health",
    companyId: "verdant",
    logo: "VH",
    location: "Remote",
    remote: true,
    type: "Part-time",
    category: "Support",
    salaryMin: 42000,
    salaryMax: 56000,
    posted: "2 days ago",
    summary: "Be the first responder for clinics adopting our care platform.",
    description:
      "Handle inbound tickets, run onboarding calls, and feed recurring themes back into the product team.",
    requirements: [
      "2+ years in SaaS support",
      "Clear, empathetic writing",
      "Healthcare familiarity is a plus",
    ],
    perks: ["Flexible schedule", "Remote", "Paid training"],
    tags: ["Zendesk", "Onboarding"],
  },
  {
    id: "brand-designer-contract",
    title: "Brand Designer (Contract)",
    company: "Lumen Studio",
    companyId: "lumen",
    logo: "LS",
    location: "Remote",
    remote: true,
    type: "Contract",
    category: "Design",
    salaryMin: 60000,
    salaryMax: 80000,
    posted: "1 week ago",
    summary: "Six-month engagement building identity systems for two launches.",
    description:
      "Own visual identity from concept to guidelines: type, color, motion principles, and launch assets.",
    requirements: ["Identity design portfolio", "Motion basics", "Self-directed working style"],
    perks: ["Flexible hours", "Remote", "Extension likely"],
    tags: ["Identity", "Typography", "Motion"],
  },
  {
    id: "analytics-engineer",
    title: "Analytics Engineer",
    company: "Orbit Financial",
    companyId: "orbit",
    logo: "OF",
    location: "London, UK",
    remote: true,
    type: "Full-time",
    category: "Data",
    salaryMin: 80000,
    salaryMax: 110000,
    posted: "9 days ago",
    summary: "Own the semantic layer powering finance and product reporting.",
    description:
      "Model warehouse data, define trusted metrics, and give every team self-serve answers they can defend to auditors.",
    requirements: ["dbt and SQL depth", "Warehouse modeling experience", "Data quality mindset"],
    perks: ["Hybrid", "Pension match", "Learning budget"],
    tags: ["dbt", "Snowflake", "Metrics"],
  },
  {
    id: "marketing-intern",
    title: "Marketing Intern",
    company: "PixelForge",
    companyId: "pixelforge",
    logo: "PF",
    location: "Berlin, Germany",
    remote: false,
    type: "Internship",
    category: "Marketing",
    salaryMin: 24000,
    salaryMax: 32000,
    posted: "3 days ago",
    summary: "Support community and launch campaigns for an upcoming title.",
    description:
      "Draft community posts, help coordinate creator outreach, and report on campaign performance.",
    requirements: ["Strong writing", "Interest in games", "Available 6 months"],
    perks: ["Mentorship", "Transit pass", "Team lunches"],
    tags: ["Community", "Content"],
  },
  {
    id: "site-reliability-engineer",
    title: "Site Reliability Engineer",
    company: "CargoLink",
    companyId: "cargolink",
    logo: "CL",
    location: "Remote",
    remote: true,
    type: "Full-time",
    category: "Engineering",
    salaryMin: 120000,
    salaryMax: 165000,
    posted: "5 days ago",
    summary: "Keep global freight tracking online at four nines.",
    description:
      "Own observability, incident response, and capacity planning for a platform ingesting millions of telemetry events per hour.",
    requirements: ["Kubernetes in production", "Terraform and IaC", "On-call leadership"],
    perks: ["Remote", "Home office budget", "On-call bonus"],
    tags: ["Kubernetes", "Terraform", "Observability"],
  },
  {
    id: "ux-researcher",
    title: "UX Researcher",
    company: "Verdant Health",
    companyId: "verdant",
    logo: "VH",
    location: "Austin, TX",
    remote: true,
    type: "Contract",
    category: "Design",
    salaryMin: 65000,
    salaryMax: 90000,
    posted: "8 days ago",
    summary: "Run clinician studies that shape our next care workflow.",
    description:
      "Design and run mixed-methods research with busy clinicians, then translate findings into design decisions.",
    requirements: ["Mixed-methods experience", "Clinical or regulated domain a plus"],
    perks: ["Remote", "Flexible schedule"],
    tags: ["Interviews", "Usability", "Synthesis"],
  },
  {
    id: "junior-frontend-developer",
    title: "Junior Frontend Developer",
    company: "Lumen Studio",
    companyId: "lumen",
    logo: "LS",
    location: "Lisbon, Portugal",
    remote: false,
    type: "Full-time",
    category: "Engineering",
    salaryMin: 38000,
    salaryMax: 52000,
    posted: "1 day ago",
    summary: "Grow into a product engineer alongside senior designers.",
    description:
      "Build marketing sites and product prototypes with a heavy emphasis on craft, accessibility, and motion.",
    requirements: ["Solid HTML/CSS/JS", "Some React exposure", "Eye for detail"],
    perks: ["Mentorship", "Studio retreats", "Hardware budget"],
    tags: ["React", "CSS", "Accessibility"],
  },
];

export function getJob(id: string) {
  return jobs.find((j) => j.id === id);
}

export function formatSalary(min: number, max: number) {
  const f = (n: number) => `$${Math.round(n / 1000)}k`;
  return `${f(min)} – ${f(max)}`;
}

export const testimonials = [
  {
    name: "Amara Osei",
    role: "Product Designer at Lumen Studio",
    quote:
      "I applied on a Tuesday and had an offer in nine days. HireHub was the only board where the roles actually matched what I wanted.",
    initials: "AO",
  },
  {
    name: "Diego Marín",
    role: "Head of Talent, Orbit Financial",
    quote:
      "We filled four engineering roles in a quarter. The candidate quality is noticeably higher than the big generic boards.",
    initials: "DM",
  },
  {
    name: "Priya Raghavan",
    role: "SRE at CargoLink",
    quote:
      "The filters actually work. Remote, salary range, seniority — I found my role in about ten minutes of browsing.",
    initials: "PR",
  },
];
