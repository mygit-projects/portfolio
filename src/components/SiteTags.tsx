"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function parseGa4MeasurementId(value: string | undefined) {
  const match = value?.toUpperCase().match(/G-[A-Z0-9]+/);
  return match?.[0] ?? null;
}

function mountHtml(html: string, target: HTMLElement) {
  const template = document.createElement("template");
  template.innerHTML = html;
  const added: HTMLElement[] = [];

  for (const node of Array.from(template.content.childNodes)) {
    if (node.nodeName === "SCRIPT") {
      const source = node as HTMLScriptElement;
      const script = document.createElement("script");
      for (const attr of Array.from(source.attributes)) {
        script.setAttribute(attr.name, attr.value);
      }
      script.text = source.text;
      target.appendChild(script);
      added.push(script);
      continue;
    }
    if (node instanceof HTMLElement) {
      target.appendChild(node);
      added.push(node);
    }
  }

  return added;
}

export function SiteTags({
  ga4MeasurementId = "",
  headerHtml = "",
  footerHtml = "",
}: {
  ga4MeasurementId?: string;
  headerHtml?: string;
  footerHtml?: string;
}) {
  const pathname = usePathname();
  const skip = pathname.startsWith("/admin") || pathname === "/login";
  const ga4 = parseGa4MeasurementId(ga4MeasurementId);

  useEffect(() => {
    if (skip) return;

    const added: HTMLElement[] = [];

    if (ga4 && !document.querySelector(`script[data-cms-ga4="${ga4}"]`)) {
      const loader = document.createElement("script");
      loader.async = true;
      loader.src = `https://www.googletagmanager.com/gtag/js?id=${ga4}`;
      loader.dataset.cmsGa4 = ga4;
      document.head.appendChild(loader);
      added.push(loader);

      const init = document.createElement("script");
      init.dataset.cmsGa4 = `${ga4}-init`;
      init.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}');`;
      document.head.appendChild(init);
      added.push(init);
    }

    if (headerHtml.trim()) {
      added.push(...mountHtml(headerHtml, document.head));
    }
    if (footerHtml.trim()) {
      added.push(...mountHtml(footerHtml, document.body));
    }

    return () => {
      for (const node of added) {
        node.remove();
      }
    };
  }, [skip, ga4, headerHtml, footerHtml]);

  return null;
}
