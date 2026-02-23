import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  image?: string; // import, /images/... o URL absoluta
  robots?: string;
  twitterSite?: string;
}

const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

function getLangFromPath(pathname: string): SupportedLang {
  const first = pathname.split("/")[1];
  return (SUPPORTED as readonly string[]).includes(first)
    ? (first as SupportedLang)
    : "es";
}

function stripLangFromPath(pathname: string) {
  const parts = pathname.split("/");
  const first = parts[1];

  if ((SUPPORTED as readonly string[]).includes(first)) {
    const rest = `/${parts.slice(2).join("/")}`.replace(/\/$/, "");
    return rest === "" ? "/" : rest;
  }

  return pathname || "/";
}

function getBaseUrl() {
  const envUrl = import.meta.env.VITE_SITE_URL as string | undefined;
  const origin = window.location.origin;

  if (envUrl && /^https?:\/\//i.test(envUrl)) {
    return envUrl.replace(/\/$/, "");
  }

  return origin.replace(/\/$/, "");
}

function ogLocaleFromLang(lang: SupportedLang) {
  switch (lang) {
    case "es": return "es_ES";
    case "en": return "en_US";
    case "fr": return "fr_FR";
    case "ca": return "ca_ES";
    default: return "es_ES";
  }
}

function setMetaTag(key: string, content: string) {
  const isOG = key.startsWith("og:");
  const attr = isOG ? "property" : "name";

  let element = document.querySelector(`meta[${attr}='${key}']`) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setLinkTag(rel: string, href: string, extra?: { hreflang?: string; id?: string }) {
  let selector = `link[rel='${rel}']`;
  if (extra?.id) selector += `#${extra.id}`;

  let link = document.querySelector(selector) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    if (extra?.hreflang) link.hreflang = extra.hreflang;
    if (extra?.id) link.id = extra.id;
    document.head.appendChild(link);
  }

  if (extra?.hreflang) link.hreflang = extra.hreflang;
  link.href = href;
}

/**
 * Normaliza URL de imagen:
 * ✔ import Vite → /assets/xxxx.png
 * ✔ /images/... (public)
 * ✔ https://...
 * ✔ evita rutas inválidas en producción
 */
function normalizeImageUrl(url?: string) {
  if (!url) return undefined;

  if (/^https?:\/\//i.test(url)) return url;

  // rutas Vite build (/assets/hash.png)
  if (url.startsWith("/assets/")) return url;

  // rutas public
  if (url.startsWith("/images/")) return url;

  // evitar pasar /src en producción
  if (url.includes("/src/")) return undefined;

  return url.startsWith("/") ? url : `/${url}`;
}

function toAbsoluteUrl(origin: string, url?: string) {
  const normalized = normalizeImageUrl(url);
  if (!normalized) return undefined;
  if (/^https?:\/\//i.test(normalized)) return normalized;
  return origin + normalized;
}

export default function SEO({
  title,
  description,
  image,
  robots = "noindex, nofollow",
  twitterSite,
}: SEOProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const lang = getLangFromPath(pathname);
    const pathWithoutLang = stripLangFromPath(pathname);
    const baseUrl = getBaseUrl();

    const currentUrl =
      pathWithoutLang === "/"
        ? `${baseUrl}/${lang}`
        : `${baseUrl}/${lang}${pathWithoutLang}`;

    const absoluteImage = toAbsoluteUrl(baseUrl, image);

    document.title = title;

    setMetaTag("robots", robots);
    setMetaTag("description", description);

    // Open Graph
    setMetaTag("og:title", title);
    setMetaTag("og:description", description);
    setMetaTag("og:type", "website");
    setMetaTag("og:url", currentUrl);
    setMetaTag("og:locale", ogLocaleFromLang(lang));

    document
      .querySelectorAll("meta[property='og:locale:alternate']")
      .forEach(el => el.remove());

    SUPPORTED.filter(l => l !== lang).forEach(l => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:locale:alternate");
      meta.setAttribute("content", ogLocaleFromLang(l));
      document.head.appendChild(meta);
    });

    if (absoluteImage) {
      setMetaTag("og:image", absoluteImage);
      setMetaTag("og:image:alt", title);
    }

    // Twitter
    setMetaTag("twitter:card", absoluteImage ? "summary_large_image" : "summary");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    if (twitterSite) setMetaTag("twitter:site", twitterSite);
    if (absoluteImage) setMetaTag("twitter:image", absoluteImage);

    // Canonical
    setLinkTag("canonical", currentUrl);

    // Hreflang
    SUPPORTED.forEach(l => {
      const href =
        pathWithoutLang === "/"
          ? `${baseUrl}/${l}`
          : `${baseUrl}/${l}${pathWithoutLang}`;

      setLinkTag("alternate", href, { hreflang: l, id: `hreflang-${l}` });
    });

    // x-default
    const defaultHref =
      pathWithoutLang === "/"
        ? `${baseUrl}/es`
        : `${baseUrl}/es${pathWithoutLang}`;

    setLinkTag("alternate", defaultHref, {
      hreflang: "x-default",
      id: "hreflang-x-default",
    });

    // Schema.org Hotel
    const schema = {
      "@context": "https://schema.org",
      "@type": "Hotel",
      name: "Hotel Taverna de la Sal",
      image: absoluteImage,
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

    const id = "hotel-schema";
    let script = document.getElementById(id) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
  }, [title, description, image, robots, twitterSite, pathname]);

  return null;
}