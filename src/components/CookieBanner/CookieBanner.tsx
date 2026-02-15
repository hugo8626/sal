import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CookieBanner.css";

type CookiePrefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cookie_consent_v1";

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
  // ✅ visible se calcula al inicio (sin setState en useEffect)
  const [visible, setVisible] = useState(() => {
    const prefs = readPrefs();
    return !prefs; // si no hay prefs => mostrar banner
  });

  const [showSettings, setShowSettings] = useState(false);

  // toggles
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // ✅ Si ya existían prefs, las notificamos al resto de la app
  useEffect(() => {
    const prefs = readPrefs();
    if (!prefs) return;

    window.dispatchEvent(
      new CustomEvent("cookie-consent-updated", { detail: prefs })
    );
  }, []);

  const acceptAll = () => {
    const prefs: CookiePrefs = { necessary: true, analytics: true, marketing: true };
    savePrefs(prefs);
    window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: prefs }));
    setVisible(false);
  };

  const rejectAll = () => {
    const prefs: CookiePrefs = { necessary: true, analytics: false, marketing: false };
    savePrefs(prefs);
    window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: prefs }));
    setVisible(false);
  };

  const saveSelection = () => {
    const prefs: CookiePrefs = { necessary: true, analytics, marketing };
    savePrefs(prefs);
    window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: prefs }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookieBanner"
      role="dialog"
      aria-live="polite"
      aria-label="Preferencias de cookies"
    >
      <div className="cookieBanner__box">
        <div className="cookieBanner__text">
          <p className="cookieBanner__title">Cookies</p>
          <p className="cookieBanner__desc">
            Usamos cookies necesarias para que la web funcione y, con tu permiso, cookies de análisis y marketing.
            Puedes aceptar, rechazar o configurar.
          </p>

          <p className="cookieBanner__links">
            <Link to="/cookies">Política de Cookies</Link>
            <span> · </span>
            <Link to="/privacidad">Privacidad</Link>
          </p>
        </div>

        {!showSettings ? (
          <div className="cookieBanner__actions">
            <button className="cookieBtn cookieBtn--ghost" onClick={rejectAll}>
              Rechazar
            </button>
            <button
              className="cookieBtn cookieBtn--ghost"
              onClick={() => setShowSettings(true)}
            >
              Configurar
            </button>
            <button className="cookieBtn cookieBtn--primary" onClick={acceptAll}>
              Aceptar
            </button>
          </div>
        ) : (
          <div className="cookieBanner__settings">
            <div className="cookieRow">
              <div>
                <p className="cookieRow__name">Necesarias</p>
                <p className="cookieRow__hint">Siempre activas para el funcionamiento básico.</p>
              </div>
              <input type="checkbox" checked disabled />
            </div>

            <div className="cookieRow">
              <div>
                <p className="cookieRow__name">Analítica</p>
                <p className="cookieRow__hint">Medir tráfico y uso (ej. Analytics).</p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
            </div>

            <div className="cookieRow">
              <div>
                <p className="cookieRow__name">Marketing</p>
                <p className="cookieRow__hint">Publicidad y remarketing.</p>
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
                onClick={() => setShowSettings(false)}
              >
                Volver
              </button>
              <button className="cookieBtn cookieBtn--ghost" onClick={rejectAll}>
                Rechazar todo
              </button>
              <button className="cookieBtn cookieBtn--primary" onClick={saveSelection}>
                Guardar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}