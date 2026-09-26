import type { JsonLdGraph, JsonLdNode } from "./types";

function asTypes(node: JsonLdNode): string[] {
  const value = node["@type"];
  if (Array.isArray(value)) return value.map(String);
  return value ? [String(value)] : [];
}

export function validateJsonLdGraph(graph: JsonLdGraph): string[] {
  const issues: string[] = [];
  const nodes = graph["@graph"] ?? [];
  if (!nodes.length) {
    return ["JSON-LD graph is empty."];
  }

  const types = nodes.flatMap(asTypes);
  if (!types.includes("Person")) issues.push("Missing Person node.");
  if (!types.includes("WebSite") && !types.includes("TechArticle")) issues.push("Missing WebSite or TechArticle node.");

  for (const node of nodes) {
    const nodeTypes = asTypes(node);
    if (!node["@id"] && !nodeTypes.includes("Question") && !nodeTypes.includes("Answer") && !nodeTypes.includes("ListItem")) {
      issues.push(`${nodeTypes.join(",") || "Node"} is missing @id.`);
    }
    if (nodeTypes.includes("FAQPage")) {
      const entities = node.mainEntity;
      if (!Array.isArray(entities) || entities.length === 0) {
        issues.push("FAQPage has no mainEntity questions.");
      }
    }
    if (nodeTypes.includes("Person") && !node.image) {
      issues.push("Person is missing image.");
    }
    if (nodeTypes.includes("Person") && (node.aggregateRating || node.review)) {
      issues.push("Person must not include aggregateRating or review (unsupported by Google rich results).");
    }
    if ((nodeTypes.includes("TechArticle") || nodeTypes.includes("ImageObject")) && typeof node.image === "string" && !/^https?:\/\//.test(node.image)) {
      issues.push("Image URL is not absolute.");
    }
  }

  return issues;
}
