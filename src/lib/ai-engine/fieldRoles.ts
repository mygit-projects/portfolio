export type SeoPillar = "SEO" | "AEO" | "GEO";

export interface FieldRole {
  role: string;
  pillars: SeoPillar[];
  scorePath?: string;
}

export const FIELD_ROLES: Record<string, FieldRole> = {
  "site.title": { role: "Meta title", pillars: ["SEO"], scorePath: "site.title" },
  "site.description": { role: "Meta description", pillars: ["SEO", "AEO"], scorePath: "site.description" },
  "site.ogTitle": { role: "OG title", pillars: ["SEO"] },
  "site.ogDescription": { role: "OG description", pillars: ["SEO"] },
  "site.keywords": { role: "Keywords", pillars: ["SEO"] },

  "personalInfo.name": { role: "H1", pillars: ["SEO", "AEO"] },
  "personalInfo.title": { role: "Job title", pillars: ["SEO", "AEO"] },
  "personalInfo.headlinePrefix": { role: "H2", pillars: ["SEO", "AEO"] },
  "personalInfo.headlineAccent": { role: "H2 accent", pillars: ["SEO", "AEO"] },
  "personalInfo.tagline": { role: "Tagline", pillars: ["AEO", "GEO"] },
  "personalInfo.bio": { role: "Opening copy", pillars: ["AEO", "GEO"], scorePath: "personalInfo.bio" },
  "personalInfo.footerBio": { role: "Footer copy", pillars: ["AEO"] },
  "personalInfo.profileImageAlt": { role: "Image alt", pillars: ["SEO"], scorePath: "personalInfo.profileImageAlt" },
  "personalInfo.location": { role: "NAP", pillars: ["GEO"], scorePath: "nap" },
  "personalInfo.locationShort": { role: "NAP short", pillars: ["GEO"], scorePath: "nap" },
  "personalInfo.phone": { role: "NAP", pillars: ["GEO"], scorePath: "nap" },
  "personalInfo.whatsapp": { role: "NAP", pillars: ["GEO"], scorePath: "nap" },
  "personalInfo.email": { role: "Contact", pillars: ["GEO"] },
  "personalInfo.yearsExperience": { role: "Proof metric", pillars: ["AEO", "GEO"] },
  "personalInfo.conversionGrowth": { role: "Proof metric", pillars: ["AEO", "GEO"] },
  "personalInfo.seoGrowth": { role: "Proof metric", pillars: ["AEO", "GEO"] },
  "personalInfo.projectsCompleted": { role: "Proof metric", pillars: ["GEO"] },
  "personalInfo.greetingBadgeText": { role: "Speakable", pillars: ["AEO"] },
  "personalInfo.greetingBadgeLocation": { role: "Speakable", pillars: ["GEO"] },
  "personalInfo.socialLinks.linkedin": { role: "sameAs", pillars: ["SEO", "GEO"] },
  "personalInfo.socialLinks.github": { role: "sameAs", pillars: ["SEO"] },

  "sections.heading": { role: "H2", pillars: ["SEO"], scorePath: "outline" },
  "sections.description": { role: "Intro copy", pillars: ["AEO", "GEO"] },
  "sections.badge": { role: "Eyebrow", pillars: ["SEO"] },
  "contact.heading": { role: "H2", pillars: ["SEO"], scorePath: "outline" },
  "contact.description": { role: "Intro copy", pillars: ["AEO"] },

  "services.title": { role: "H3", pillars: ["SEO"] },
  "services.shortDesc": { role: "Card summary", pillars: ["AEO"] },
  "services.description": { role: "Body", pillars: ["AEO", "GEO"] },
  "services.features": { role: "List", pillars: ["GEO"] },

  "projects.title": { role: "H3 / page H1", pillars: ["SEO"] },
  "projects.subtitle": { role: "Subtitle", pillars: ["SEO", "AEO"] },
  "projects.description": { role: "Body", pillars: ["AEO", "GEO"] },
  "projects.challenge": { role: "H2 body", pillars: ["AEO"] },
  "projects.solution": { role: "H2 body", pillars: ["AEO"] },
  "projects.achievements": { role: "List", pillars: ["AEO", "GEO"] },
  "projects.architecture": { role: "List", pillars: ["GEO"] },
  "projects.image": { role: "Image", pillars: ["SEO"] },
  "projects.liveUrl": { role: "Citation URL", pillars: ["GEO"] },
  "projects.metrics": { role: "Proof metric", pillars: ["GEO"] },

  "experience.title": { role: "H3", pillars: ["SEO", "GEO"] },
  "experience.company": { role: "Entity", pillars: ["GEO"] },
  "experience.location": { role: "GEO", pillars: ["GEO"] },
  "experience.summary": { role: "Body", pillars: ["AEO", "GEO"] },
  "experience.highlights": { role: "List", pillars: ["GEO"] },
  "careerSidebar.heading": { role: "H4", pillars: ["SEO"] },
  "careerSidebar.blurb": { role: "Body", pillars: ["GEO"] },

  "education.degree": { role: "H3", pillars: ["SEO"] },
  "education.institution": { role: "Entity", pillars: ["GEO"] },
  "education.description": { role: "Body", pillars: ["AEO"] },
  "certifications.title": { role: "H3", pillars: ["SEO"] },
  "languages.language": { role: "H3", pillars: ["GEO"] },

  "faqs.question": { role: "H3 / FAQ", pillars: ["AEO"], scorePath: "faqs" },
  "faqs.answer": { role: "FAQ answer", pillars: ["AEO"], scorePath: "faqs" },

  "testimonials.quote": { role: "Review", pillars: ["AEO", "GEO"] },
  "testimonials.author": { role: "H4", pillars: ["GEO"] },
  "testimonials.company": { role: "Entity", pillars: ["GEO"] },

  "hero.stats.value": { role: "Proof metric", pillars: ["GEO"] },
  "hero.stats.label": { role: "Caption", pillars: ["GEO"] },
  "hero.stats.description": { role: "Proof copy", pillars: ["AEO", "GEO"] },
  "hero.hangingCards.vibeEngine": { role: "UI card", pillars: ["AEO"] },
  "hero.hangingCards.coreWebVitals": { role: "UI card", pillars: ["SEO"] },
  "hero.hangingCards.stack": { role: "UI card", pillars: ["GEO"] },
  "hero.speedDial.pagespeedLabel": { role: "UI label", pillars: ["SEO"] },
  "hero.speedDial.lcp": { role: "UI metric", pillars: ["SEO"] },
  "hero.speedDial.seoLabel": { role: "UI label", pillars: ["SEO"] },
  "hero.speedDial.seoValue": { role: "UI metric", pillars: ["SEO"] },

  "process.title": { role: "H3", pillars: ["SEO"] },
  "process.desc": { role: "Body", pillars: ["AEO"] },
  "skills.name": { role: "Entity", pillars: ["GEO"] },
};

export function getFieldRole(path: string): FieldRole | null {
  return FIELD_ROLES[path] ?? null;
}