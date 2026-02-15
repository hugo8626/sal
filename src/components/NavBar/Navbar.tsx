import "./Navbar.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  const current = (i18n.language || "es").split("-")[0];

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

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

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo__link" onClick={close}>
            Taverna de la Sal
          </Link>
        </div>

        {/* Desktop + Tablet */}
        <ul className="navbar-links navbar-links--desktop">
          <li>
            <NavLink
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link--active" : ""}`
              }
              to="/habitaciones"
            >
              {t("nav.rooms")}
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link--active" : ""}`
              }
              to="/restaurante"
            >
              {t("nav.restaurant")}
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link--active" : ""}`
              }
              to="/historia"
            >
              {t("nav.history")}
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link--active" : ""}`
              }
              to="/entorno"
            >
              {t("nav.area")}
            </NavLink>
          </li>

          {/* NUEVO: Contacto */}
          <li>
            <NavLink
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link--active" : ""}`
              }
              to="/contacto"
            >
              {t("nav.contact")}
            </NavLink>
          </li>
        </ul>

        <div className="navbar-right">
          <NavLink
            className={({ isActive }) =>
              `navbar-reserve ${isActive ? "navbar-reserve--active" : ""}`
            }
            to="/reservar"
          >
            {t("nav.reserve")}
          </NavLink>

          <select
            className="navbar-lang"
            value={current}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            aria-label="Cambiar idioma"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="ca">CA</option>
          </select>

          <button
            className="navbar-burger"
            onClick={toggle}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
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
          aria-label="Cerrar menú"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") close();
          }}
        />
      )}

      <aside
        id="mobile-menu"
        className={`popover ${open ? "popover--open" : ""}`}
        aria-hidden={!open}
      >
        <div className="popover-header">
          <span className="popover-title">Menú</span>
          <button
            className="popover-close"
            onClick={close}
            aria-label="Cerrar"
            type="button"
          >
            ✕
          </button>
        </div>

        <nav className="popover-links" aria-label="Menú móvil">
          <NavLink to="/habitaciones" onClick={close}>
            {t("nav.rooms")}
          </NavLink>
          <NavLink to="/restaurante" onClick={close}>
            {t("nav.restaurant")}
          </NavLink>
          <NavLink to="/historia" onClick={close}>
            {t("nav.history")}
          </NavLink>
          <NavLink to="/entorno" onClick={close}>
            {t("nav.area")}
          </NavLink>

          {/* NUEVO: Contacto móvil */}
          <NavLink to="/contacto" onClick={close}>
            {t("nav.contact")}
          </NavLink>

          <NavLink to="/reservar" onClick={close}>
            {t("nav.reserve")}
          </NavLink>
        </nav>
      </aside>
    </nav>
  );
}