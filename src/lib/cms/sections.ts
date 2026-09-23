import type { PortfolioContent } from "@/content/types";

export const SECTION_KEYS = [
  "site",
  "personalInfo",
  "navigation",
  "ctas",
  "hero",
  "services",
  "estimator",
  "projects",
  "skills",
  "processSteps",
  "experience",
  "careerSidebar",
  "education",
  "certifications",
  "languages",
  "testimonials",
  "faqs",
  "contact",
  "drivingCard",
  "sections",
  "cvCompetencies",
  "footer",
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

export const ATF_KEYS = [
  "site",
  "personalInfo",
  "navigation",
  "ctas",
  "hero",
  "contact",
] as const satisfies readonly SectionKey[];

export const BELOW_KEYS = SECTION_KEYS.filter((key) => key !== "hero");

export type EstimatorSection = {
  options: PortfolioContent["estimatorOptions"];
  defaults: PortfolioContent["estimatorDefaults"];
};

export type ProjectsSection = {
  items: PortfolioContent["projects"];
  categories: PortfolioContent["projectCategories"];
};

export type SectionMap = {
  site: PortfolioContent["site"];
  personalInfo: PortfolioContent["personalInfo"];
  navigation: PortfolioContent["navigation"];
  ctas: PortfolioContent["ctas"];
  hero: PortfolioContent["hero"];
  services: PortfolioContent["services"];
  estimator: EstimatorSection;
  projects: ProjectsSection;
  skills: PortfolioContent["skills"];
  processSteps: PortfolioContent["processSteps"];
  experience: PortfolioContent["experience"];
  careerSidebar: PortfolioContent["careerSidebar"];
  education: PortfolioContent["education"];
  certifications: PortfolioContent["certifications"];
  languages: PortfolioContent["languages"];
  testimonials: PortfolioContent["testimonials"];
  faqs: PortfolioContent["faqs"];
  contact: PortfolioContent["contact"];
  drivingCard: PortfolioContent["drivingCard"];
  sections: PortfolioContent["sections"];
  cvCompetencies: PortfolioContent["cvCompetencies"];
  footer: PortfolioContent["footer"];
};

export function splitPortfolio(data: PortfolioContent): SectionMap {
  return {
    site: data.site,
    personalInfo: data.personalInfo,
    navigation: data.navigation,
    ctas: data.ctas,
    hero: data.hero,
    services: data.services,
    estimator: { options: data.estimatorOptions, defaults: data.estimatorDefaults },
    projects: { items: data.projects, categories: data.projectCategories },
    skills: data.skills,
    processSteps: data.processSteps,
    experience: data.experience,
    careerSidebar: data.careerSidebar,
    education: data.education,
    certifications: data.certifications,
    languages: data.languages,
    testimonials: data.testimonials,
    faqs: data.faqs,
    contact: data.contact,
    drivingCard: data.drivingCard,
    sections: data.sections,
    cvCompetencies: data.cvCompetencies,
    footer: data.footer,
  };
}

export function joinPortfolio(sections: SectionMap): PortfolioContent {
  return {
    site: sections.site,
    personalInfo: sections.personalInfo,
    navigation: sections.navigation,
    ctas: sections.ctas,
    hero: sections.hero,
    services: sections.services,
    estimatorOptions: sections.estimator.options,
    estimatorDefaults: sections.estimator.defaults,
    projects: sections.projects.items,
    projectCategories: sections.projects.categories,
    skills: sections.skills,
    processSteps: sections.processSteps,
    experience: sections.experience,
    careerSidebar: sections.careerSidebar,
    education: sections.education,
    certifications: sections.certifications,
    languages: sections.languages,
    testimonials: sections.testimonials,
    faqs: sections.faqs,
    contact: sections.contact,
    drivingCard: sections.drivingCard,
    sections: sections.sections,
    cvCompetencies: sections.cvCompetencies,
    footer: sections.footer,
  };
}
