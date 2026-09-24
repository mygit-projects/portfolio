import { z } from "zod";
import type { PortfolioContent } from "@/content/types";
import { joinPortfolio, type SectionMap } from "./sections";

const stringList = z.array(z.string());

export const siteSchema = z.object({
  title: z.string(),
  description: z.string(),
  ogTitle: z.string(),
  ogDescription: z.string(),
  locale: z.string(),
  keywords: stringList,
  ga4MeasurementId: z.string().optional().default(""),
  headerHtml: z.string().optional().default(""),
  footerHtml: z.string().optional().default(""),
});

export const personalInfoSchema = z.object({
  name: z.string(),
  initials: z.string(),
  title: z.string(),
  headlinePrefix: z.string(),
  headlineAccent: z.string(),
  navbarSubtitle: z.string(),
  cvModalTitle: z.string(),
  cvModalSubtitle: z.string(),
  tagline: z.string(),
  email: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  location: z.string(),
  locationShort: z.string(),
  dob: z.string(),
  drivingLicense: z.string(),
  drivingLicenseShort: z.string(),
  bio: z.string(),
  footerBio: z.string(),
  yearsExperience: z.string(),
  projectsCompleted: z.string(),
  conversionGrowth: z.string(),
  seoGrowth: z.string(),
  profileImage: z.string(),
  profileImageAlt: z.string(),
  greetingBadgeLocation: z.string(),
  greetingBadgeText: z.string(),
  socialLinks: z.object({
    whatsapp: z.string(),
    email: z.string(),
    linkedin: z.string(),
    github: z.string(),
  }),
});

export const navigationSchema = z.array(
  z.object({
    name: z.string(),
    href: z.string(),
    id: z.string(),
  }),
);

export const ctasSchema = z.object({
  viewWork: z.string(),
  downloadCv: z.string(),
  whatsappChat: z.string(),
  resume: z.string(),
  letsTalk: z.string(),
  startProject: z.string(),
  inquireService: z.string(),
  directInquiry: z.string(),
});

export const heroSchema = z.object({
  stats: z.array(
    z.object({
      id: z.string(),
      value: z.string(),
      label: z.string(),
      shortLabel: z.string(),
      category: z.string(),
      description: z.string(),
      detailTitle: z.string(),
      detailBody: z.string(),
      icon: z.enum(["Award", "TrendingUp", "Zap"]),
      accentClass: z.string(),
    }),
  ),
  hangingCards: z.object({
    vibeEngine: z.string(),
    coreWebVitals: z.string(),
    stack: z.string(),
  }),
  vibePresets: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      tool: z.string(),
      tag: z.string(),
      prompt: z.string(),
      codeSnippet: z.string(),
      resultMetric: z.string(),
    }),
  ),
  stackItems: z.array(
    z.object({
      name: z.string(),
      category: z.string(),
      highlight: z.string(),
      color: z.string(),
    }),
  ),
  speedDial: z.object({
    pagespeedLabel: z.string(),
    pagespeedScore: z.number(),
    lcp: z.string(),
    croLift: z.string(),
    croCaption: z.string(),
    vitalsLabel: z.string(),
    vitalsValue: z.string(),
    seoLabel: z.string(),
    seoValue: z.string(),
  }),
});

export const servicesSchema = z.array(
  z.object({
    id: z.string(),
    number: z.string(),
    icon: z.string(),
    title: z.string(),
    shortDesc: z.string(),
    description: z.string(),
    features: stringList,
    color: z.string(),
    accent: z.string(),
  }),
);

export const estimatorSchema = z.object({
  options: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      category: z.string(),
      days: z.number(),
      badge: z.string(),
    }),
  ),
  defaults: stringList,
});

export const projectsSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      category: z.string(),
      subtitle: z.string(),
      description: z.string(),
      fullCaseStudy: z.object({
        client: z.string(),
        role: z.string(),
        timeline: z.string(),
        challenge: z.string(),
        solution: z.string(),
        keyAchievements: stringList,
        architecture: stringList,
      }),
      metrics: z.array(z.object({ label: z.string(), value: z.string() })),
      tags: stringList,
      liveUrl: z.string(),
      image: z.string(),
      badge: z.string().optional(),
      previewGradient: z.string(),
    }),
  ),
  categories: stringList,
});

export const skillsSchema = z.object({
  progressMeters: z.array(
    z.object({
      name: z.string(),
      level: z.number(),
      category: z.string(),
    }),
  ),
  tools: z.array(
    z.object({
      name: z.string(),
      category: z.string(),
      icon: z.string(),
      color: z.string(),
      usage: z.string(),
      impact: z.string(),
    }),
  ),
  toolCategories: stringList,
  specializedTags: stringList,
});

export const processStepsSchema = z.array(
  z.object({
    step: z.string(),
    title: z.string(),
    tagline: z.string(),
    desc: z.string(),
    icon: z.string(),
    color: z.string(),
    accentBg: z.string(),
    borderColor: z.string(),
    deliverables: stringList,
    toolsUsed: stringList,
    duration: z.string(),
    keyMetric: z.string(),
    codeOrArtifact: z.string(),
  }),
);

export const experienceSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    company: z.string(),
    location: z.string(),
    period: z.string(),
    badge: z.string().optional(),
    summary: z.string(),
    highlights: stringList,
    metrics: stringList,
    skillsUsed: stringList,
  }),
);

export const careerSidebarSchema = z.object({
  heading: z.string(),
  period: z.string(),
  blurb: z.string(),
  stats: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      valueClass: z.string(),
    }),
  ),
});

export const educationSchema = z.array(
  z.object({
    id: z.string(),
    degree: z.string(),
    institution: z.string(),
    field: z.string(),
    period: z.string().optional(),
    location: z.string(),
    badge: z.string(),
    categoryLabel: z.string(),
    description: z.string(),
    modules: stringList,
    modulesLabel: z.string(),
    statusLabel: z.string(),
    icon: z.string(),
    accent: z.enum(["purple", "indigo", "slate"]),
  }),
);

export const certificationsSchema = z.array(
  z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    credentialUrl: z.string().optional(),
    skills: stringList,
    badge: z.string(),
    description: z.string(),
    competencies: stringList,
    issuerShort: z.string(),
    accent: z.enum(["amber", "purple"]),
  }),
);

export const languagesSchema = z.array(
  z.object({
    language: z.string(),
    proficiency: z.string(),
    description: z.string(),
  }),
);

export const testimonialsSchema = z.array(
  z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    avatar: z.string(),
    company: z.string(),
    rating: z.number(),
  }),
);

export const faqsSchema = z.array(
  z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
  }),
);

export const sectionCopySchema = z.object({
  badge: z.string(),
  heading: z.string(),
  description: z.string(),
});

export const contactSchema = z.object({
  section: sectionCopySchema,
  availability: z.string(),
  dubaiTimeLabel: z.string(),
  defaultSubject: z.string(),
  presets: z.array(z.object({ label: z.string(), text: z.string() })),
  formNamePlaceholder: z.string(),
  formEmailPlaceholder: z.string(),
  formMessagePlaceholder: z.string(),
  responseSla: z.string(),
});

export const drivingCardSchema = z.object({
  title: z.string(),
  badge: z.string(),
  description: z.string(),
  highway: z.string(),
  transit: z.string(),
  footerLeft: z.string(),
  footerRight: z.string(),
});

export const sectionsSchema = z.object({
  services: sectionCopySchema,
  projects: sectionCopySchema,
  skills: sectionCopySchema,
  process: sectionCopySchema,
  experience: sectionCopySchema,
  education: sectionCopySchema,
  faqs: sectionCopySchema.default({
    badge: "ANSWERS FOR SEARCH AND AI",
    heading: "Frequently Asked Questions",
    description:
      "Direct answers about Muhammad Faizan's role, Dubai-based services, featured projects, and 15+ years of delivery experience.",
  }),
});

export const cvCompetenciesSchema = z.array(
  z.object({
    title: z.string(),
    body: z.string(),
    tone: z.enum(["neutral", "accent"]),
  }),
);

export const footerSchema = z.object({
  newsletterHeading: z.string(),
  newsletterCopy: z.string(),
  copyrightSuffix: z.string(),
  designedWith: z.string(),
});

export const sectionSchemas = {
  site: siteSchema,
  personalInfo: personalInfoSchema,
  navigation: navigationSchema,
  ctas: ctasSchema,
  hero: heroSchema,
  services: servicesSchema,
  estimator: estimatorSchema,
  projects: projectsSchema,
  skills: skillsSchema,
  processSteps: processStepsSchema,
  experience: experienceSchema,
  careerSidebar: careerSidebarSchema,
  education: educationSchema,
  certifications: certificationsSchema,
  languages: languagesSchema,
  testimonials: testimonialsSchema,
  faqs: faqsSchema,
  contact: contactSchema,
  drivingCard: drivingCardSchema,
  sections: sectionsSchema,
  cvCompetencies: cvCompetenciesSchema,
  footer: footerSchema,
} as const;

function parseOrFallback<K extends keyof SectionMap>(
  key: K,
  value: unknown,
  fallback: SectionMap[K],
): SectionMap[K] {
  const parsed = sectionSchemas[key].safeParse(value);
  return (parsed.success ? parsed.data : fallback) as SectionMap[K];
}

export function assemblePortfolio(
  rows: Array<{ key: string; data: unknown }>,
  fallback: PortfolioContent,
): PortfolioContent {
  const map = new Map(rows.map((row) => [row.key, row.data]));
  const splitFallback = {
    site: fallback.site,
    personalInfo: fallback.personalInfo,
    navigation: fallback.navigation,
    ctas: fallback.ctas,
    hero: fallback.hero,
    services: fallback.services,
    estimator: { options: fallback.estimatorOptions, defaults: fallback.estimatorDefaults },
    projects: { items: fallback.projects, categories: fallback.projectCategories },
    skills: fallback.skills,
    processSteps: fallback.processSteps,
    experience: fallback.experience,
    careerSidebar: fallback.careerSidebar,
    education: fallback.education,
    certifications: fallback.certifications,
    languages: fallback.languages,
    testimonials: fallback.testimonials,
    faqs: fallback.faqs,
    contact: fallback.contact,
    drivingCard: fallback.drivingCard,
    sections: fallback.sections,
    cvCompetencies: fallback.cvCompetencies,
    footer: fallback.footer,
  } satisfies SectionMap;

  return joinPortfolio({
    site: parseOrFallback("site", map.get("site"), splitFallback.site),
    personalInfo: parseOrFallback("personalInfo", map.get("personalInfo"), splitFallback.personalInfo),
    navigation: parseOrFallback("navigation", map.get("navigation"), splitFallback.navigation),
    ctas: parseOrFallback("ctas", map.get("ctas"), splitFallback.ctas),
    hero: parseOrFallback("hero", map.get("hero"), splitFallback.hero),
    services: parseOrFallback("services", map.get("services"), splitFallback.services),
    estimator: parseOrFallback("estimator", map.get("estimator"), splitFallback.estimator),
    projects: parseOrFallback("projects", map.get("projects"), splitFallback.projects),
    skills: parseOrFallback("skills", map.get("skills"), splitFallback.skills),
    processSteps: parseOrFallback("processSteps", map.get("processSteps"), splitFallback.processSteps),
    experience: parseOrFallback("experience", map.get("experience"), splitFallback.experience),
    careerSidebar: parseOrFallback("careerSidebar", map.get("careerSidebar"), splitFallback.careerSidebar),
    education: parseOrFallback("education", map.get("education"), splitFallback.education),
    certifications: parseOrFallback("certifications", map.get("certifications"), splitFallback.certifications),
    languages: parseOrFallback("languages", map.get("languages"), splitFallback.languages),
    testimonials: parseOrFallback("testimonials", map.get("testimonials"), splitFallback.testimonials),
    faqs: parseOrFallback("faqs", map.get("faqs"), splitFallback.faqs),
    contact: parseOrFallback("contact", map.get("contact"), splitFallback.contact),
    drivingCard: parseOrFallback("drivingCard", map.get("drivingCard"), splitFallback.drivingCard),
    sections: parseOrFallback("sections", map.get("sections"), splitFallback.sections),
    cvCompetencies: parseOrFallback("cvCompetencies", map.get("cvCompetencies"), splitFallback.cvCompetencies),
    footer: parseOrFallback("footer", map.get("footer"), splitFallback.footer),
  });
}
