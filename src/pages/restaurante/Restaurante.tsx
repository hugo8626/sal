import "./Restaurante.css";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import heroImg from "../../assets/images/restaurante/axidosincopa.png";
import brasaImg from "../../assets/images/restaurante/photo_2026-02-14_18-51-06.jpg";
import marImg from "../../assets/images/restaurante/oxido.png";

import SEO from "../../components/seo/SEO";

/**
 * ✅ Nombres de iconos permitidos (type-safe)
 */
type IconName = "fork" | "sun" | "waves" | "book" | "sparkle" | "parking" | "wifi";

/**
 * ✅ Idiomas soportados en rutas
 * (ideal: mover a un utils compartido, pero aquí lo dejamos listo y consistente)
 */
const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

function getLangFromPath(pathname: string): SupportedLang {
  const first = pathname.split("/")[1]?.toLowerCase() ?? "";
  return (SUPPORTED as readonly string[]).includes(first) ? (first as SupportedLang) : "es";
}

/**
 * ✅ Helper para construir rutas internas multiidioma
 */
function route(lang: SupportedLang, path: string) {
  const clean = path.replace(/^\/+/, "");
  return `/${lang}/${clean}`;
}

/**
 * ✅ Iconos inline SVG (sin dependencias)
 */
function Icon({ name }: { name: IconName }) {
  switch (name) {
    case "fork":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 2v7a2 2 0 0 0 2 2v11h2V11a2 2 0 0 0 2-2V2h-2v7H10V2H8v7H6V2H6zm11 0v9h2v11h2V2h-4z" />
        </svg>
      );
    case "sun":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-16h1V0h-2v2h1zm0 22h1v-2h-2v2h1zM4.22 5.64 2.81 4.22 1.39 5.64l1.41 1.41 1.42-1.41zM21.19 19.78l1.41 1.41 1.41-1.41-1.41-1.41-1.41 1.41zM0 13h2v-2H0v2zm22 0h2v-2h-2v2zM4.22 18.36 2.81 19.78 1.39 18.36l1.41-1.41 1.42 1.41zM21.19 4.22l1.41-1.41 1.41 1.41-1.41 1.41-1.41-1.41z" />
        </svg>
      );
    case "waves":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2 7c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1v2c-2 0-2 1-4 1s-2-1-4-1-2 1-4 1-2-1-4-1-2 1-4 1V7zm0 6c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1v2c-2 0-2 1-4 1s-2-1-4-1-2 1-4 1-2-1-4-1-2 1-4 1v-2zm0 6c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1v2c-2 0-2 1-4 1s-2-1-4-1-2 1-4 1-2-1-4-1-2 1-4 1v-2z" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 3h9a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3V6a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v12.17A4.98 4.98 0 0 1 6 18h9a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6z" />
        </svg>
      );
    case "sparkle":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l1.2 4.2L17.4 8 13.2 9.2 12 13.4 10.8 9.2 6.6 8l4.2-1.8L12 2zm8 8l.7 2.4 2.3.6-2.3.6L20 16l-.7-2.4-2.3-.6 2.3-.6L20 10zM5 14l.9 3 2.9.8-2.9.8L5 22l-.9-3-2.9-.8 2.9-.8L5 14z" />
        </svg>
      );
    case "parking":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3h7a5 5 0 0 1 0 10H9v8H7V3zm2 2v6h5a3 3 0 0 0 0-6H9z" />
        </svg>
      );
    case "wifi":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7.07-4.93 1.41 1.41a8 8 0 0 1 11.32 0l1.41-1.41a10 10 0 0 0-14.14 0zM2.1 9.24l1.41 1.41a12 12 0 0 1 16.98 0l1.41-1.41a14 14 0 0 0-19.8 0zM12 2C7.3 2 3.02 3.64 0 6.36l1.41 1.41A18 18 0 0 1 22.59 7.77L24 6.36A22 22 0 0 0 12 2z" />
        </svg>
      );
  }
}

export default function Restaurante() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);

  return (
    <>
      {/* ✅ SEO específico de la página */}
      <SEO
        title={t("restaurant.seo.title", { defaultValue: "Restaurante | Taverna de la Sal" })}
        description={t("restaurant.seo.description", {
          defaultValue:
            "Restaurante en Taverna de la Sal: cocina mediterránea, brasa, desayunos y terraza. Sabor local y ambiente tranquilo en L'Escala.",
        })}
        image={heroImg}
      />

      <main className="restPage">
        {/* ================= HERO ================= */}
        <section
          className="restHero"
          style={{ backgroundImage: `url(${heroImg})` }}
          aria-label={t("restaurant.hero.aria", { defaultValue: "Restaurante" })}
        >
          <div className="restHero__overlay" />
          <div className="container restHero__content">
            <h1 className="restHero__title">{t("restaurant.hero.title")}</h1>
            <p className="restHero__subtitle">{t("restaurant.hero.subtitle")}</p>
          </div>
        </section>

        {/* ================= BLOQUE 1: BRASA ================= */}
        <section className="section section--white">
          <div className="container restSplit">
            <div className="restSplit__body">
              <span className="restIcon" aria-hidden="true">
                <Icon name="fork" />
              </span>

              <p className="restEyebrow">{t("restaurant.brasa.eyebrow")}</p>
              <h2 className="restH2">{t("restaurant.brasa.title")}</h2>

              <p className="restP">{t("restaurant.brasa.text1")}</p>
              <p className="restP">{t("restaurant.brasa.text2")}</p>

              {/* ✅ Enlace externo: usamos <a>, pero con seguridad completa */}
              <a
                className="restBtnOutline"
                href="https://docs.google.com/spreadsheets/d/1lL9lPbsDWwKE3LHYwamj8LwcEVSEZxYX/edit?usp=sharing&ouid=115921718176696134396&rtpof=true&sd=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("restaurant.brasa.ctaAria", {
                  defaultValue: "Abrir menú en una nueva pestaña",
                })}
              >
                {t("restaurant.brasa.cta")}
              </a>
            </div>

            <figure className="restSplit__media">
              <img
                className="restImg"
                src={brasaImg}
                alt={t("restaurant.brasa.imageAlt", { defaultValue: "Cocina a la brasa" })}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* ================= BLOQUE 2: DESAYUNO ================= */}
        <section className="section section--white">
          <div className="container restSplit restSplit--reverse">
            <div className="restSplit__body">
              <span className="restIcon" aria-hidden="true">
                <Icon name="sun" />
              </span>

              <p className="restEyebrow">{t("restaurant.breakfast.eyebrow")}</p>
              <h2 className="restH2">{t("restaurant.breakfast.title")}</h2>

              <p className="restP restP--highlight">{t("restaurant.breakfast.text")}</p>
            </div>

            <figure className="restSplit__media">
              <img
                className="restImg"
                src={marImg}
                alt={t("restaurant.breakfast.imageAlt", { defaultValue: "Desayuno mediterráneo" })}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* ================= BLOQUE 3: TERRAZA ================= */}
        <section className="section section--white">
          <div className="container restSplit">
            <div className="restSplit__body">
              <span className="restIcon" aria-hidden="true">
                <Icon name="waves" />
              </span>

              <h2 className="restH2">{t("restaurant.terrace.title")}</h2>
              <p className="restP">{t("restaurant.terrace.text")}</p>
            </div>

            <figure className="restSplit__media">
              <img
                className="restImg"
                src={marImg}
                alt={t("restaurant.terrace.imageAlt", { defaultValue: "Terraza junto al mar" })}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* ================= BLOQUE 4: LECTURA ================= */}
        <section className="section section--white">
          <div className="container restSplit restSplit--reverse">
            <div className="restSplit__body">
              <span className="restIcon" aria-hidden="true">
                <Icon name="book" />
              </span>

              <h2 className="restH2">{t("restaurant.reading.title")}</h2>
              <p className="restP">{t("restaurant.reading.text")}</p>
            </div>

            <figure className="restSplit__media">
              <img
                className="restImg"
                src={brasaImg}
                alt={t("restaurant.reading.imageAlt", { defaultValue: "Rincón de lectura" })}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* ================= CARDS 3 ================= */}
        <section className="section section--white">
          <div className="container">
            <div className="restCards">
              <article className="restCard">
                <span className="restCard__icon" aria-hidden="true">
                  <Icon name="sparkle" />
                </span>
                <h3 className="restCard__title">{t("restaurant.cards.0.title")}</h3>
                <p className="restCard__text">{t("restaurant.cards.0.text")}</p>
              </article>

              <article className="restCard">
                <span className="restCard__icon" aria-hidden="true">
                  <Icon name="parking" />
                </span>
                <h3 className="restCard__title">{t("restaurant.cards.1.title")}</h3>
                <p className="restCard__text">{t("restaurant.cards.1.text")}</p>
              </article>

              <article className="restCard">
                <span className="restCard__icon" aria-hidden="true">
                  <Icon name="wifi" />
                </span>
                <h3 className="restCard__title">{t("restaurant.cards.2.title")}</h3>
                <p className="restCard__text">{t("restaurant.cards.2.text")}</p>
              </article>
            </div>
          </div>
        </section>

        {/* ================= CTA FINAL ================= */}
        <section className="section section--beige restFinal">
          <div className="container restFinal__inner">
            <h2 className="restFinal__title">{t("restaurant.final.title")}</h2>

            <Link className="restFinal__btn" to={route(lang, "reservar")}>
              {t("restaurant.final.cta")}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}