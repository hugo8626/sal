import "./History.css";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import heroImg from "../../assets/images/espacios/sala.jpg";
import pareja from "../../assets/images/espacios/pareja.jpg";
import taverna from "../../assets/images/pueblo/taverna.jpg";

import SEO from "../../components/seo/SEO";

/**
 * ✅ Idiomas soportados en rutas
 */
const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

/**
 * ✅ Lee idioma desde URL (/es/..., /en/..., etc.)
 * Fallback: "es"
 */
function getLangFromPath(pathname: string): SupportedLang {
  const first = pathname.split("/")[1]?.toLowerCase() ?? "";
  return (SUPPORTED as readonly string[]).includes(first) ? (first as SupportedLang) : "es";
}

/**
 * ✅ Construye rutas internas con idioma
 */
function route(lang: SupportedLang, path: string) {
  const clean = path.replace(/^\/+/, "");
  return `/${lang}/${clean}`;
}

export default function History() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);

  return (
    <>
      {/* ✅ SEO página Historia */}
      <SEO
        title={t("history.seo.title", { defaultValue: "Historia | Taverna de la Sal" })}
        description={t("history.seo.description", {
          defaultValue:
            "Descubre la historia de Taverna de la Sal: un hotel boutique solo adultos en L'Escala, inspirado en el Mediterráneo y el descanso real.",
        })}
        image={heroImg}
      />

      <main className="page">
        {/* ================= HERO ================= */}
        <section
          className="historyHero"
          aria-label={t("history.hero.aria", { defaultValue: "Historia" })}
        >
          <div className="historyHero__bg" style={{ backgroundImage: `url(${heroImg})` }}>
            <div className="historyHero__overlay" />
            <div className="container historyHero__content">
              <h1 className="historyHero__title">{t("history.hero.title")}</h1>
              <p className="historyHero__subtitle">{t("history.hero.subtitle")}</p>

              {/* ✅ CTA a reservar con ruta multiidioma */}
              <Link className="btn btn--outline historyHero__btn" to={route(lang, "reservar")}>
                {t("history.hero.cta")}
              </Link>
            </div>
          </div>
        </section>

        {/* ================= BLOQUE 1 ================= */}
        <section className="section section--white">
          <div className="container historyBlock historyBlock--top">
            <figure className="historyBlock__media">
              <img
                className="historyBlock__img"
                src={pareja}
                alt={t("history.block1.imageAlt", { defaultValue: "Pareja disfrutando del hotel" })}
                loading="lazy"
              />
            </figure>

            <div className="historyBlock__body">
              <p className="historyKicker">{t("history.block1.kicker")}</p>

              <p>{t("history.block1.p1")}</p>
              <p>{t("history.block1.p2")}</p>

              <blockquote className="historyQuote">
                <p>
                  {t("history.block1.quoteLines.0")}
                  <br />
                  {t("history.block1.quoteLines.1")}
                  <br />
                  {t("history.block1.quoteLines.2")}
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ================= BLOQUE 2 ================= */}
        <section className="section section--beige">
          <div className="container historyCenter">
            <figure className="historyCenter__media">
              <img
                className="historyCenter__img"
                src={taverna}
                alt={t("history.block2.imageAlt", { defaultValue: "Edificio histórico en L'Escala" })}
                loading="lazy"
              />
            </figure>

            <div className="historyCenter__text">
              <h2 className="historyCenter__title">{t("history.block2.title")}</h2>

              <p>{t("history.block2.p1")}</p>
              <p>{t("history.block2.p2")}</p>
              <p>{t("history.block2.p3")}</p>
              <p>{t("history.block2.p4")}</p>
            </div>
          </div>
        </section>

        {/* ================= FILOSOFÍA ================= */}
        <section className="section section--white">
          <div className="container philosophy">
            <h2 className="philosophy__title">{t("history.philosophy.title")}</h2>

            <div className="philosophy__lines">
              <p>{t("history.philosophy.p1")}</p>
              <p>{t("history.philosophy.p2")}</p>
            </div>
          </div>
        </section>

        {/* ================= CTA FINAL ================= */}
        <section className="section section--beige">
          <div className="container historyCTA">
            <p className="historyCTA__text">
              {t("history.final.textLine1")}
              <br />
              {t("history.final.textLine2")}
            </p>

            <Link className="btn btn--primary" to={route(lang, "reservar")}>
              {t("history.final.cta")}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}