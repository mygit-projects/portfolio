export interface SocialLinks {
  whatsapp: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface PersonalInfo {
  name: string;
  initials: string;
  title: string;
  headlinePrefix: string;
  headlineAccent: string;
  navbarSubtitle: string;
  cvModalTitle: string;
  cvModalSubtitle: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  locationShort: string;
  dob: string;
  drivingLicense: string;
  drivingLicenseShort: string;
  bio: string;
  footerBio: string;
  yearsExperience: string;
  projectsCompleted: string;
  conversionGrowth: string;
  seoGrowth: string;
  profileImage: string;
  profileImageAlt: string;
  greetingBadgeLocation: string;
  greetingBadgeText: string;
  socialLinks: SocialLinks;
}

export interface HeroStat {
  id: string;
  value: string;
  label: string;
  shortLabel: string;
  category: string;
  description: string;
  detailTitle: string;
  detailBody: string;
  icon: "Award" | "TrendingUp" | "Zap";
  accentClass: string;
}

export interface Service {
  id: string;
  number: string;
  icon: string;
  title: string;
  shortDesc: string;
  description: string;
  features: string[];
  color: string;
  accent: string;
}

export interface EstimatorOption {
  id: string;
  name: string;
  category: string;
  days: number;
  badge: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectCaseStudy {
  client: string;
  role: string;
  timeline: string;
  challenge: string;
  solution: string;
  keyAchievements: string[];
  architecture: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  fullCaseStudy: ProjectCaseStudy;
  metrics: ProjectMetric[];
  tags: string[];
  liveUrl: string;
  image: string;
  badge?: string;
  previewGradient: string;
}

export interface SkillMeter {
  name: string;
  level: number;
  category: string;
}

export interface SkillTool {
  name: string;
  category: string;
  icon: string;
  color: string;
  usage: string;
  impact: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  desc: string;
  icon: string;
  color: string;
  accentBg: string;
  borderColor: string;
  deliverables: string[];
  toolsUsed: string[];
  duration: string;
  keyMetric: string;
  codeOrArtifact: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  badge?: string;
  summary: string;
  highlights: string[];
  metrics: string[];
  skillsUsed: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  field: string;
  period?: string;
  location: string;
  badge: string;
  categoryLabel: string;
  description: string;
  modules: string[];
  modulesLabel: string;
  statusLabel: string;
  icon: string;
  accent: "purple" | "indigo" | "slate";
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
  badge: string;
  description: string;
  competencies: string[];
  issuerShort: string;
  accent: "amber" | "purple";
}

export interface Language {
  language: string;
  proficiency: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  company: string;
  rating: number;
}

export interface ContactPreset {
  label: string;
  text: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface NavItem {
  name: string;
  href: string;
  id: string;
}

export interface SiteMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  locale: string;
  keywords: string[];
}

export interface SectionCopy {
  badge: string;
  heading: string;
  description: string;
}

export interface HeroWidgetPreset {
  id: string;
  title: string;
  tool: string;
  tag: string;
  prompt: string;
  codeSnippet: string;
  resultMetric: string;
}

export interface HeroStackItem {
  name: string;
  category: string;
  highlight: string;
  color: string;
}

export interface SpeedDialCopy {
  pagespeedLabel: string;
  pagespeedScore: number;
  lcp: string;
  croLift: string;
  croCaption: string;
  vitalsLabel: string;
  vitalsValue: string;
  seoLabel: string;
  seoValue: string;
}

export interface DrivingCardCopy {
  title: string;
  badge: string;
  description: string;
  highway: string;
  transit: string;
  footerLeft: string;
  footerRight: string;
}

export interface CareerSidebarStat {
  label: string;
  value: string;
  valueClass: string;
}

export interface CvCompetencyBlock {
  title: string;
  body: string;
  tone: "neutral" | "accent";
}

export interface AiAuditIssue {
  code: string;
  severity: "info" | "warning" | "critical";
  message: string;
  recommendation: string;
}

export type SeoHealth = "red" | "yellow" | "green";

export interface SeoPillarScore {
  score: number;
  health: SeoHealth;
}

export interface SerpPreview {
  title: string;
  description: string;
  displayUrl: string;
  titlePx: number;
  descriptionPx: number;
  titleFits: boolean;
  descriptionFits: boolean;
}

export interface RenderAuditSnapshot {
  fetched: boolean;
  url?: string;
  title?: string;
  canonical?: string;
  h1: string[];
  headings: Array<{ level: 1 | 2 | 3; text: string }>;
  imageAlts: string[];
  missingAlt: number;
  jsonLdTypes: string[];
  error?: string;
}

export interface CoreWebVitalsSnapshot {
  source: "crux" | "psi" | "none";
  lcpMs?: number;
  inpMs?: number;
  cls?: number;
  performanceScore?: number;
  error?: string;
}

export interface IndexationRow {
  url: string;
  coverageState?: string;
  indexingState?: string;
  lastCrawlTime?: string;
  crawledAs?: string;
  verdict?: string;
  error?: string;
}

export interface CitationClaim {
  claim: string;
  metric: string;
  source: string;
  date: string;
}

export interface NapCheck {
  aligned: boolean;
  issues: string[];
}

export interface SeoFieldScore {
  path: string;
  label: string;
  health: SeoHealth;
  issues: string[];
}

export interface SeoHeadingRow {
  level: 1 | 2 | 3;
  text: string;
  role: "page-h1" | "section-h2" | "card-h3";
}

export interface SeoSchemaNode {
  type: string;
  id?: string;
}

export interface ScoreHistoryPoint {
  createdAt: string;
  target: string;
  overall: number;
  seo: number;
  aeo: number;
  geo: number;
}

export interface GoogleInsightSummary {
  connected: boolean;
  window: "28d";
  fetchedAt?: string;
  clicks?: number;
  impressions?: number;
  ctr?: number;
  averagePosition?: number;
  sessions?: number;
  uaeShare?: number;
  gbpRating?: number;
  gbpReviewCount?: number;
  gbpTitle?: string;
  gbpAddress?: string;
  topQueries?: Array<{ query: string; clicks: number; impressions: number }>;
  topPages?: Array<{ page: string; clicks: number; impressions: number; ctr: number }>;
  questionQueries?: string[];
  previous?: { clicks?: number; impressions?: number; ctr?: number; fetchedAt?: string };
}

export interface AiAuditMetrics {
  answerFirstScore: number;
  citationAuthority: number;
  entityCoverage: number;
  geoReadiness: number;
  aeoReadiness: number;
  seoScore: number;
  overallScore: number;
  health: SeoHealth;
  pillars: {
    seo: SeoPillarScore;
    aeo: SeoPillarScore;
    geo: SeoPillarScore;
  };
  issues: AiAuditIssue[];
  recommendations: string[];
  analyzedAt: string;
  provider: "heuristic" | "gemini" | "hybrid";
  target: string;
  focusEntity?: string;
  insights?: GoogleInsightSummary;
  llmSummary?: string;
  serp?: SerpPreview;
  render?: RenderAuditSnapshot;
  vitals?: CoreWebVitalsSnapshot;
  indexation?: IndexationRow[];
  claims?: CitationClaim[];
  schemaIssues?: string[];
  schemaNodes?: SeoSchemaNode[];
  nap?: NapCheck;
  history?: ScoreHistoryPoint[];
}

export interface PortfolioContent {
  site: SiteMeta;
  personalInfo: PersonalInfo;
  navigation: NavItem[];
  ctas: {
    viewWork: string;
    downloadCv: string;
    whatsappChat: string;
    resume: string;
    letsTalk: string;
    startProject: string;
    inquireService: string;
    directInquiry: string;
  };
  hero: {
    stats: HeroStat[];
    hangingCards: {
      vibeEngine: string;
      coreWebVitals: string;
      stack: string;
    };
    vibePresets: HeroWidgetPreset[];
    stackItems: HeroStackItem[];
    speedDial: SpeedDialCopy;
  };
  services: Service[];
  estimatorOptions: EstimatorOption[];
  estimatorDefaults: string[];
  projects: Project[];
  projectCategories: string[];
  skills: {
    progressMeters: SkillMeter[];
    tools: SkillTool[];
    toolCategories: string[];
    specializedTags: string[];
  };
  processSteps: ProcessStep[];
  experience: Experience[];
  careerSidebar: {
    heading: string;
    period: string;
    blurb: string;
    stats: CareerSidebarStat[];
  };
  education: EducationItem[];
  certifications: CertificationItem[];
  languages: Language[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  contact: {
    section: SectionCopy;
    availability: string;
    dubaiTimeLabel: string;
    defaultSubject: string;
    presets: ContactPreset[];
    formNamePlaceholder: string;
    formEmailPlaceholder: string;
    formMessagePlaceholder: string;
    responseSla: string;
  };
  drivingCard: DrivingCardCopy;
  sections: {
    services: SectionCopy;
    projects: SectionCopy;
    skills: SectionCopy;
    process: SectionCopy;
    experience: SectionCopy;
    education: SectionCopy;
    faqs: SectionCopy;
  };
  cvCompetencies: CvCompetencyBlock[];
  footer: {
    newsletterHeading: string;
    newsletterCopy: string;
    copyrightSuffix: string;
    designedWith: string;
  };
}
