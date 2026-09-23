import type { NapCheck, PortfolioContent } from "@/content/types";
import type { GbpSnapshot } from "./google/types";

function digits(value: string): string {
  return value.replace(/\D/g, "");
}

export function checkNapAlignment(portfolio: PortfolioContent, gbp?: GbpSnapshot): NapCheck {
  if (!gbp) {
    return { aligned: true, issues: [] };
  }

  const issues: string[] = [];
  const phone = digits(portfolio.personalInfo.phone);
  const gbpBlob = `${gbp.title ?? ""} ${gbp.address ?? ""}`.toLowerCase();

  if (gbp.address && !/dubai|united arab emirates|uae|ae/.test(gbp.address.toLowerCase())) {
    issues.push("GBP address is missing Dubai / UAE.");
  }
  if (portfolio.personalInfo.location && gbp.address && !gbp.address.toLowerCase().includes("dubai")) {
    issues.push("Site location is Dubai but the selected GBP address does not mention Dubai.");
  }
  if (phone.length >= 8 && gbp.title && !gbpBlob.includes("faizan") && !gbpBlob.includes("dubai")) {
    issues.push("GBP title/address does not clearly match Muhammad Faizan or Dubai.");
  }

  return { aligned: issues.length === 0, issues };
}
