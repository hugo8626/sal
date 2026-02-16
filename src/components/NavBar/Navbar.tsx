import "./Navbar.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

function getLangFromPath(pathname: string): SupportedLang {
  const first = pathname.split("/")[1];
  return (SUPPORTED as readonly string[]).includes(first) ? (first as SupportedLang) : "es";
}

export default function Navbar() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const lang = getLangFromPath(pathname);
  const current = (i18n.language || lang).split("-")[0];

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  // helper rutas con idioma
  const p = (to: string) => `/${lang}${to.startsWith("/") ? to : `/${to}`}`;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleLangChange = (newLang: string) => {
    const next = (SUPPORTED as readonly string[]).includes(newLang) ? (newLang as SupportedLang) : "es";

    // Mantener misma ruta, cambiando solo el prefijo /{lang}
    const parts = pathname.split("/");
    const rest = parts.slice(2).join("/"); // todo después del lang actual
    const target = `/${next}/${rest}`.replace(/\/$/, "");

    navigate(target === `/${next}` ? `/${next}` : target, { replace: true });

    // Para que el select responda al instante (LanguageSync también lo hace)
    i18n.changeLanguage(next);
    close();
  };

  return (
    <nav className="navbar" aria-label={t("navbar.ariaMain")}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to={`/${lang}`} className="navbar-logo__link" onClick={close}>
            {t("navbar.brand")}
          </Link>
        </div>

        {/* Desktop + Tablet */}
        <ul className="navbar-links navbar-links--desktop">
          <li>
            <NavLink
              className={({ isActive }) => `navbar-link ${isActive ? "navbar-link--active" : ""}`}
              to={p("/habitaciones")}
              onClick={close}
            >
              {t("nav.rooms")}
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => `navbar-link ${isActive ? "navbar-link--active" : ""}`}
              to={p("/restaurante")}
              onClick={close}
            >
              {t("nav.restaurant")}
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => `navbar-link ${isActive ? "navbar-link--active" : ""}`}
              to={p("/historia")}
              onClick={close}
            >
              {t("nav.history")}
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => `navbar-link ${isActive ? "navbar-link--active" : ""}`}
              to={p("/entorno")}
              onClick={close}
            >
              {t("nav.area")}
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => `navbar-link ${isActive ? "navbar-link--active" : ""}`}
              to={p("/contacto")}
              onClick={close}
            >
              {t("nav.contact")}
            </NavLink>
          </li>
        </ul>

        <div className="navbar-right">
          <NavLink
            className={({ isActive }) => `navbar-reserve ${isActive ? "navbar-reserve--active" : ""}`}
            to={p("/reservar")}
            onClick={close}
          >
            {t("nav.reserve")}
          </NavLink>

          <select
            className="navbar-lang"
            value={(SUPPORTED as readonly string[]).includes(current) ? current : lang}
            onChange={(e) => handleLangChange(e.target.value)}
            aria-label={t("navbar.langSelectAria")}
          >
            <option value="es">{t("navbar.lang.es")}</option>
            <option value="en">{t("navbar.lang.en")}</option>
            <option value="fr">{t("navbar.lang.fr")}</option>
            <option value="ca">{t("navbar.lang.ca")}</option>
          </select>

          <button
            className="navbar-burger"
            onClick={toggle}
            aria-label={open ? t("navbar.burger.close") : t("navbar.burger.open")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            type="button"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div
          className="overlay"
          onClick={close}
          role="button"
          tabIndex={0}
          aria-label={t("navbar.overlayCloseAria")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") close();
          }}
        />
      )}

      <aside
        id="mobile-menu"
        className={`popover ${open ? "popover--open" : ""}`}
        aria-hidden={!open}
        hidden={!open}
      >
        <div className="popover-header">
          <span className="popover-title">{t("navbar.mobile.title")}</span>
          <button
            className="popover-close"
            onClick={close}
            aria-label={t("navbar.mobile.close")}
            type="button"
          >
            ✕
          </button>
        </div>

        <nav className="popover-links" aria-label={t("navbar.mobile.aria")}>
          <NavLink to={p("/habitaciones")} onClick={close}>
            {t("nav.rooms")}
          </NavLink>
          <NavLink to={p("/restaurante")} onClick={close}>
            {t("nav.restaurant")}
          </NavLink>
          <NavLink to={p("/historia")} onClick={close}>
            {t("nav.history")}
          </NavLink>
          <NavLink to={p("/entorno")} onClick={close}>
            {t("nav.area")}
          </NavLink>
          <NavLink to={p("/contacto")} onClick={close}>
            {t("nav.contact")}
          </NavLink>
          <NavLink to={p("/reservar")} onClick={close}>
            {t("nav.reserve")}
          </NavLink>
        </nav>
      </aside>
    </nav>
  );
}