import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./CookieBanner.css";

type CookiePrefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cookie_consent_v1";

const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

function getLangFromPath(pathname: string): SupportedLang {
  const first = pathname.split("/")[1]?.toLowerCase() ?? "";
  return (SUPPORTED as readonly string[]).includes(first)
    ? (first as SupportedLang)
    : "es";
}

function readPrefs(): CookiePrefs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePrefs;
  } catch {
    return null;
  }
}

function savePrefs(prefs: CookiePrefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export default function CookieBanner() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);

  const [initialPrefs] = useState<CookiePrefs | null>(() => readPrefs());
  const [visible, setVisible] = useState(() => !initialPrefs);
  const [showSettings, setShowSettings] = useState(false);

  const [analytics, setAnalytics] = useState<boolean>(
    () => initialPrefs?.analytics ?? false
  );
  const [marketing, setMarketing] = useState<boolean>(
    () => initialPrefs?.marketing ?? false
  );

  useEffect(() => {
    if (!initialPrefs) return;
    window.dispatchEvent(
      new CustomEvent("cookie-consent-updated", { detail: initialPrefs })
    );
  }, [initialPrefs]);

  const acceptAll = () => {
    const prefs: CookiePrefs = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePrefs(prefs);
    window.dispatchEvent(
      new CustomEvent("cookie-consent-updated", { detail: prefs })
    );
    setVisible(false);
  };

  const rejectAll = () => {
    const prefs: CookiePrefs = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePrefs(prefs);
    window.dispatchEvent(
      new CustomEvent("cookie-consent-updated", { detail: prefs })
    );
    setVisible(false);
  };

  const saveSelection = () => {
    const prefs: CookiePrefs = {
      necessary: true,
      analytics,
      marketing,
    };
    savePrefs(prefs);
    window.dispatchEvent(
      new CustomEvent("cookie-consent-updated", { detail: prefs })
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookieBanner"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookieBannerTitle"
      aria-describedby="cookieBannerDesc"
    >
      <div className="cookieBanner__box">
        <div className="cookieBanner__text">
          <p id="cookieBannerTitle" className="cookieBanner__title">
            {t("cookiesBanner.title")}
          </p>

          <p id="cookieBannerDesc" className="cookieBanner__desc">
            {t("cookiesBanner.description")}
          </p>

          <p className="cookieBanner__links">
            <Link to={`/${lang}/cookies`}>
              {t("cookiesBanner.links.cookies")}
            </Link>
            <span> · </span>
            <Link to={`/${lang}/privacidad`}>
              {t("cookiesBanner.links.privacy")}
            </Link>
          </p>
        </div>

        {!showSettings ? (
          <div className="cookieBanner__actions">
            <button
              className="cookieBtn cookieBtn--ghost"
              type="button"
              onClick={rejectAll}
            >
              {t("cookiesBanner.buttons.reject")}
            </button>

            <button
              className="cookieBtn cookieBtn--ghost"
              type="button"
              onClick={() => setShowSettings(true)}
            >
              {t("cookiesBanner.buttons.configure")}
            </button>

            <button
              className="cookieBtn cookieBtn--primary"
              type="button"
              onClick={acceptAll}
            >
              {t("cookiesBanner.buttons.accept")}
            </button>
          </div>
        ) : (
          <div className="cookieBanner__settings">
            <div className="cookieRow">
              <div>
                <p className="cookieRow__name">
                  {t("cookiesBanner.categories.necessary.title")}
                </p>
                <p className="cookieRow__hint">
                  {t("cookiesBanner.categories.necessary.hint")}
                </p>
              </div>
              <input type="checkbox" checked disabled />
            </div>

            <div className="cookieRow">
              <div>
                <p className="cookieRow__name">
                  {t("cookiesBanner.categories.analytics.title")}
                </p>
                <p className="cookieRow__hint">
                  {t("cookiesBanner.categories.analytics.hint")}
                </p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
            </div>

            <div className="cookieRow">
              <div>
                <p className="cookieRow__name">
                  {t("cookiesBanner.categories.marketing.title")}
                </p>
                <p className="cookieRow__hint">
                  {t("cookiesBanner.categories.marketing.hint")}
                </p>
              </div>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
            </div>

            <div className="cookieBanner__actions">
              <button
                className="cookieBtn cookieBtn--ghost"
                type="button"
                onClick={() => setShowSettings(false)}
              >
                {t("cookiesBanner.buttons.back")}
              </button>

              <button
                className="cookieBtn cookieBtn--ghost"
                type="button"
                onClick={rejectAll}
              >
                {t("cookiesBanner.buttons.rejectAll")}
              </button>

              <button
                className="cookieBtn cookieBtn--primary"
                type="button"
                onClick={saveSelection}
              >
                {t("cookiesBanner.buttons.save")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}