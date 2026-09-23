import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioProvider } from "@/content/PortfolioProvider";
import { getPortfolio } from "@/content/getPortfolio";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectCasePage } from "@/components/projects/ProjectCasePage";
import { generateProjectJsonLd } from "@/lib/ai-engine/schemaManager";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const portfolio = await getPortfolio();
  const project = portfolio.projects.find((item) => item.id === id);
  if (!project) {
    return { title: "Project not found" };
  }

  const siteUrl = getSiteUrl();
  const title = `${project.title} — ${project.subtitle}`.slice(0, 60);
  const description = project.description.slice(0, 160);
  const url = `${siteUrl}/projects/${project.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: portfolio.personalInfo.name,
      images: [{ url: project.image, alt: `${project.title} case study preview` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const portfolio = await getPortfolio();
  const project = portfolio.projects.find((item) => item.id === id);
  if (!project) {
    notFound();
  }

  return (
    <PortfolioProvider value={portfolio}>
      <JsonLd data={generateProjectJsonLd(portfolio, project, getSiteUrl())} />
      <ProjectCasePage project={project} />
    </PortfolioProvider>
  );
}
