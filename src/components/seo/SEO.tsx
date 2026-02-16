import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  image?: string; // puede venir relativo (/assets/..) o absoluto (https://..)
}

const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

function getLangFromPath(pathname: string): SupportedLang {
  const first = pathname.split("/")[1];
  return (SUPPORTED as readonly string[]).includes(first) ? (first as SupportedLang) : "es";
}

function stripLangFromPath(pathname: string) {
  // "/en/habitaciones" -> "/habitaciones"
  const parts = pathname.split("/");
  const first = parts[1];
  if ((SUPPORTED as readonly string[]).includes(first)) {
    const rest = `/${parts.slice(2).join("/")}`.replace(/\/$/, "");
    return rest === "" ? "/" : rest;
  }
  return pathname || "/";
}

function toAbsoluteUrl(origin: string, maybeUrl?: string) {
  if (!maybeUrl) return undefined;
  if (/^https?:\/\//i.test(maybeUrl)) return maybeUrl;
  const clean = maybeUrl.startsWith("/") ? maybeUrl : `/${maybeUrl}`;
  return `${origin}${clean}`;
}

export default function SEO({ title, description, image }: SEOProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const lang = getLangFromPath(pathname);
    const pathWithoutLang = stripLangFromPath(pathname);
    const origin = window.location.origin;

    // Canonical real de la página actual
    const currentUrl =
      pathWithoutLang === "/" ? `${origin}/${lang}` : `${origin}/${lang}${pathWithoutLang}`;

    // Imagen absoluta para OG/Twitter + Schema
    const absoluteImage = toAbsoluteUrl(origin, image);

    document.title = title;

    const setMeta = (key: string, content: string) => {
      const isOG = key.startsWith("og:");
      const attr = isOG ? "property" : "name"; // twitter:* y meta normales => name

      let element = document.querySelector(`meta[${attr}='${key}']`) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // ===== Basic SEO =====
    setMeta("description", description);

    // ===== Open Graph =====
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:type", "website");
    setMeta("og:url", currentUrl);
    if (absoluteImage) setMeta("og:image", absoluteImage);

    // ===== Twitter =====
    setMeta("twitter:card", absoluteImage ? "summary_large_image" : "summary");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    if (absoluteImage) setMeta("twitter:image", absoluteImage);

    // ===== Canonical =====
    {
      let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = currentUrl;
    }

    // ===== Hreflang =====
    SUPPORTED.forEach((l) => {
      const linkId = `hreflang-${l}`;
      let alt = document.getElementById(linkId) as HTMLLinkElement | null;

      const href = pathWithoutLang === "/" ? `${origin}/${l}` : `${origin}/${l}${pathWithoutLang}`;

      if (!alt) {
        alt = document.createElement("link");
        alt.rel = "alternate";
        alt.hreflang = l;
        alt.id = linkId;
        document.head.appendChild(alt);
      }
      alt.href = href;
    });

    // ===== x-default =====
    {
      const linkId = "hreflang-x-default";
      let xd = document.getElementById(linkId) as HTMLLinkElement | null;

      const hrefDefault =
        pathWithoutLang === "/" ? `${origin}/es` : `${origin}/es${pathWithoutLang}`;

      if (!xd) {
        xd = document.createElement("link");
        xd.rel = "alternate";
        xd.hreflang = "x-default";
        xd.id = linkId;
        document.head.appendChild(xd);
      }
      xd.href = hrefDefault;
    }

    // ===== Schema.org Hotel =====
    const scriptId = "hotel-schema";
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Hotel",
      name: "Hotel Taverna de la Sal",
      image: absoluteImage || "",
      address: {
        "@type": "PostalAddress",
        addressLocality: "L'Escala",
        addressRegion: "Girona",
        addressCountry: "ES",
      },
      url: currentUrl,
      description,
      inLanguage: lang,
    };

    const json = JSON.stringify(schemaData);

    if (!existingScript) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      script.textContent = json;
      document.head.appendChild(script);
    } else {
      existingScript.textContent = json;
    }
  }, [title, description, image, pathname]);

  return null;
}