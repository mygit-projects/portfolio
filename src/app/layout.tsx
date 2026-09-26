import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { SiteTags } from "@/components/SiteTags";
import { StripExtensionAttrs } from "@/components/StripExtensionAttrs";
import { getAboveTheFoldPortfolio } from "@/content/getPortfolio";
import { getPublicSiteUrl } from "@/lib/site";
import "./globals.css";

export const dynamic = "force-dynamic";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getAboveTheFoldPortfolio();
  const siteUrl = getPublicSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: portfolio.site.title,
    description: portfolio.site.description,
    keywords: portfolio.site.keywords,
    authors: [{ name: portfolio.personalInfo.name, url: siteUrl }],
    creator: portfolio.personalInfo.name,
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: "website",
      locale: portfolio.site.locale,
      url: siteUrl,
      title: portfolio.site.ogTitle,
      description: portfolio.site.ogDescription,
      siteName: portfolio.personalInfo.name,
      images: [{ url: portfolio.personalInfo.profileImage, alt: portfolio.personalInfo.profileImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: portfolio.site.ogTitle,
      description: portfolio.site.ogDescription,
      images: [portfolio.personalInfo.profileImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const portfolio = await getAboveTheFoldPortfolio();

  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth`} suppressHydrationWarning>
      <body
        className={`${plusJakarta.className} bg-[#F8F9FD] text-[#2A2E3D] antialiased selection:bg-[#7C5CFC]/20 selection:text-[#5B3DE0]`}
        suppressHydrationWarning
      >
        <StripExtensionAttrs />
        <SiteTags
          ga4MeasurementId={portfolio.site.ga4MeasurementId}
          headerHtml={portfolio.site.headerHtml}
          footerHtml={portfolio.site.footerHtml}
        />
        {children}
      </body>
    </html>
  );
}
