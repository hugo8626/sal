import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import i18n from "../../i18n";

const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

function getLangFromPath(pathname: string): SupportedLang | null {
  const first = pathname.split("/")[1];
  if (!first) return null;

  if ((SUPPORTED as readonly string[]).includes(first)) {
    return first as SupportedLang;
  }

  return null;
}

export default function LanguageSync() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lang = getLangFromPath(pathname);
    if (!lang) return;

    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }

    // Mejora SEO: actualiza atributo lang del HTML
    document.documentElement.lang = lang;
  }, [pathname]);

  return null;
}