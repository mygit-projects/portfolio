import type { FaqItem, PortfolioContent, Project } from "@/content/types";
import { getPublicSiteUrl } from "@/lib/site";
import type { JsonLdGraph, JsonLdNode } from "./types";

export function personId(siteUrl: string): string {
  return `${siteUrl}/#person`;
}

export function websiteId(siteUrl: string): string {
  return `${siteUrl}/#website`;
}

export function profilePageId(siteUrl: string): string {
  return `${siteUrl}/#profile`;
}

export function faqPageId(siteUrl: string): string {
  return `${siteUrl}/#faq`;
}

export function buildPersonSchema(portfolio: PortfolioContent, siteUrl = getPublicSiteUrl()): JsonLdNode {
  const { personalInfo, experience, skills, education } = portfolio;
  const currentRole = experience.find((item) => Boolean(item.badge)) ?? experience[0];

  return {
    "@type": "Person",
    "@id": personId(siteUrl),
    name: personalInfo.name,
    url: siteUrl,
    image: {
      "@type": "ImageObject",
      url: personalInfo.profileImage,
      contentUrl: personalInfo.profileImage,
      caption: personalInfo.profileImageAlt,
    },
    jobTitle: personalInfo.title,
    description: personalInfo.bio,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    nationality: "Pakistani",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    worksFor: currentRole
      ? {
          "@type": "Organization",
          name: currentRole.company,
          address: currentRole.location,
        }
      : undefined,
    knowsAbout: [...skills.progressMeters.map((skill) => skill.name), ...skills.specializedTags],
    alumniOf: education.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.institution,
      address: item.location,
    })),
    sameAs: [
      personalInfo.socialLinks.linkedin,
      personalInfo.socialLinks.github,
      personalInfo.socialLinks.whatsapp,
    ],
    knowsLanguage: portfolio.languages.map((item) => item.language),
  };
}

export function buildProfilePageSchema(portfolio: PortfolioContent, siteUrl = getPublicSiteUrl()): JsonLdNode {
  return {
    "@type": "ProfilePage",
    "@id": profilePageId(siteUrl),
    url: siteUrl,
    name: portfolio.site.title,
    description: portfolio.site.description,
    inLanguage: "en-AE",
    mainEntity: {
      "@id": personId(siteUrl),
    },
    about: {
      "@id": personId(siteUrl),
    },
    isPartOf: {
      "@id": websiteId(siteUrl),
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#home h1", "#faqs h2", "#hero-greeting-badge"],
    },
  };
}

export function buildWebSiteSchema(portfolio: PortfolioContent, siteUrl = getPublicSiteUrl()): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": websiteId(siteUrl),
    name: portfolio.site.title,
    url: siteUrl,
    description: portfolio.site.description,
    inLanguage: "en-AE",
    publisher: {
      "@id": personId(siteUrl),
    },
    about: {
      "@id": personId(siteUrl),
    },
  };
}

export function buildFaqPageSchema(faqs: FaqItem[], siteUrl = getPublicSiteUrl()): JsonLdNode | null {
  if (!faqs.length) {
    return null;
  }

  return {
    "@type": "FAQPage",
    "@id": faqPageId(siteUrl),
    url: `${siteUrl}/#faqs`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    isPartOf: {
      "@id": websiteId(siteUrl),
    },
  };
}

export function buildTechArticleSchema(
  project: Project,
  siteUrl = getPublicSiteUrl(),
): JsonLdNode {
  return {
    "@type": ["TechArticle", "CreativeWork"],
    "@id": `${siteUrl}/#project-${project.id}`,
    headline: `${project.title} — ${project.subtitle}`,
    name: project.title,
    description: project.description,
    url: `${siteUrl}/projects/${project.id}`,
    image: {
      "@type": "ImageObject",
      url: project.image,
      contentUrl: project.image,
      caption: `${project.title} case study preview`,
    },
    author: {
      "@id": personId(siteUrl),
    },
    creator: {
      "@id": personId(siteUrl),
    },
    keywords: project.tags.join(", "),
    about: project.fullCaseStudy.architecture,
    articleSection: project.category,
    isPartOf: {
      "@id": websiteId(siteUrl),
    },
    mainEntityOfPage: `${siteUrl}/projects/${project.id}`,
  };
}

export function buildImageObject(url: string, caption: string): JsonLdNode {
  return {
    "@type": "ImageObject",
    url,
    contentUrl: url,
    caption,
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>, siteUrl = getPublicSiteUrl()): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${items[items.length - 1]?.url ?? siteUrl}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildReviewGraph(portfolio: PortfolioContent, siteUrl = getPublicSiteUrl()): JsonLdNode[] {
  if (!portfolio.testimonials.length) return [];
  const rating =
    portfolio.testimonials.reduce((sum, item) => sum + item.rating, 0) / portfolio.testimonials.length;
  return [
    {
      "@type": "Person",
      "@id": `${personId(siteUrl)}-reviewed`,
      name: portfolio.personalInfo.name,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: Number(rating.toFixed(1)),
        reviewCount: portfolio.testimonials.length,
        bestRating: 5,
      },
      review: portfolio.testimonials.map((item) => ({
        "@type": "Review",
        reviewBody: item.quote,
        author: { "@type": "Person", name: item.author },
        reviewRating: { "@type": "Rating", ratingValue: item.rating, bestRating: 5 },
      })),
    },
  ];
}

export function buildProjectJsonLd(
  portfolio: PortfolioContent,
  project: Project,
  siteUrl = getPublicSiteUrl(),
): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonSchema(portfolio, siteUrl),
      buildTechArticleSchema(project, siteUrl),
      buildBreadcrumbSchema(
        [
          { name: "Home", url: siteUrl },
          { name: "Projects", url: `${siteUrl}/#projects` },
          { name: project.title, url: `${siteUrl}/projects/${project.id}` },
        ],
        siteUrl,
      ),
    ],
  };
}

export function generateSiteJsonLd(
  portfolio: PortfolioContent,
  siteUrl = getPublicSiteUrl(),
): JsonLdGraph {
  const faq = buildFaqPageSchema(portfolio.faqs, siteUrl);
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonSchema(portfolio, siteUrl),
      buildProfilePageSchema(portfolio, siteUrl),
      buildWebSiteSchema(portfolio, siteUrl),
      ...(faq ? [faq] : []),
      ...buildReviewGraph(portfolio, siteUrl),
      buildBreadcrumbSchema(
        [
          { name: "Home", url: siteUrl },
          { name: "Projects", url: `${siteUrl}/#projects` },
        ],
        siteUrl,
      ),
      ...portfolio.projects.map((project) => buildTechArticleSchema(project, siteUrl)),
    ],
  };
}

export function generateProjectJsonLd(
  portfolio: PortfolioContent,
  project: Project,
  siteUrl = getPublicSiteUrl(),
): JsonLdGraph {
  return buildProjectJsonLd(portfolio, project, siteUrl);
}
