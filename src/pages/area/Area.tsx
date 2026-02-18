import "./Area.css";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";

import heroImg from "../../assets/images/pueblo/bonitcala.jpg";
import antigua from "../../assets/images/pueblo/anchoabn.jpg";
import casco from "../../assets/images/pueblo/iglesia.jpg";
import alfoli from "../../assets/images/pueblo/alfolisal.jpg";
import ruinas from "../../assets/images/pueblo/ruinas.jpg";
import museo from "../../assets/images/pueblo/museo.jpg";
import banerplaya from "../../assets/images/pueblo/rocaplaya.jpg";
import emporda from "../../assets/images/pueblo/emporda.jpg";
import kayak from "../../assets/images/pueblo/kayak.jpg";
import barcos from "../../assets/images/pueblo/barcos.avif";
import pescado from "../../assets/images/pueblo/pescado.jpg";

import SEO from "../../components/seo/SEO";

/**
 * ✅ Idiomas soportados en rutas
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

export default function Area() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);

  return (
    <>
      {/* ✅ SEO página Entorno */}
      <SEO
        title={t("area.seo.title", { defaultValue: "Entorno | Taverna de la Sal" })}
        description={t("area.seo.description", {
          defaultValue:
            "Descubre L'Escala y la Costa Brava: calas, patrimonio, gastronomía y experiencias cerca del hotel.",
        })}
        image={heroImg}
      />

      <main className="areaPage">
        {/* ================= HERO ================= */}
        <section
          className="areaHero"
          style={{ backgroundImage: `url(${heroImg})` }}
          aria-label={t("area.hero.aria", { defaultValue: "Entorno" })}
        >
          <div className="areaHero__overlay" />
          <div className="areaHero__content">
            <h1>{t("area.hero.title")}</h1>
            <p>{t("area.hero.subtitle")}</p>
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="section section--white areaIntro">
          <div className="areaIntro__container">
            <div className="areaIntro__media">
              <img
                src={antigua}
                alt={t("area.intro.imageAlt", { defaultValue: "L'Escala y su tradición marinera" })}
                loading="lazy"
              />
            </div>

            <div className="areaIntro__content">
              <h2>{t("area.intro.title")}</h2>

              <p className="areaIntro__lead">{t("area.intro.lead")}</p>

              <div className="areaIntro__text">
                <p>{t("area.intro.p1")}</p>
                <p>{t("area.intro.p2")}</p>
                <p>{t("area.intro.p3")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ARQUEOLOGÍA ================= */}
        <section className="section section--beige areaPlaces">
          <div className="areaPlaces__container">
            <div className="areaPlaces__header">
              <h2>{t("area.places.header.title")}</h2>
              <p>{t("area.places.header.subtitle")}</p>
            </div>

            <div className="areaPlaces__grid">
              <article className="placeCard">
                <img
                  src={ruinas}
                  alt={t("area.places.cards.0.imageAlt", { defaultValue: "Ruinas de Empúries" })}
                  loading="lazy"
                />
                <div className="placeCard__body">
                  <h3>
                    {t("area.places.cards.0.title")}{" "}
                    <span>{t("area.places.cards.0.distance")}</span>
                  </h3>

                  <p>{t("area.places.cards.0.text")}</p>

                  {/* ✅ Enlace externo seguro */}
                  <a
                    className="placeCard__link"
                    href={t("area.places.cards.0.url")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("area.places.cards.0.aria", {
                      defaultValue: "Abrir enlace en una nueva pestaña",
                    })}
                  >
                    {t("area.places.cards.0.linkText")} →
                  </a>
                </div>
              </article>

              <article className="placeCard">
                <img
                  src={casco}
                  alt={t("area.places.cards.1.imageAlt", { defaultValue: "Casco antiguo" })}
                  loading="lazy"
                />
                <div className="placeCard__body">
                  <h3>{t("area.places.cards.1.title")}</h3>
                  <p>{t("area.places.cards.1.text")}</p>
                </div>
              </article>

              <article className="placeCard">
                <img
                  src={alfoli}
                  alt={t("area.places.cards.2.imageAlt", { defaultValue: "Alfolí de la Sal" })}
                  loading="lazy"
                />
                <div className="placeCard__body">
                  <h3>{t("area.places.cards.2.title")}</h3>
                  <p>{t("area.places.cards.2.text")}</p>
                </div>
              </article>

              <article className="placeCard">
                <img
                  src={museo}
                  alt={t("area.places.cards.3.imageAlt", { defaultValue: "Museo" })}
                  loading="lazy"
                />
                <div className="placeCard__body">
                  <h3>{t("area.places.cards.3.title")}</h3>
                  <p>{t("area.places.cards.3.text")}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ================= BANNER ================= */}
        <section
          className="areaBanner"
          style={{ backgroundImage: `url(${banerplaya})` }}
          aria-label={t("area.banner.aria", { defaultValue: "Costa Brava" })}
        >
          <div className="areaBanner__overlay" />
          <div className="areaBanner__content">
            <h2>{t("area.banner.title")}</h2>
          </div>
        </section>

        {/* ================= PLAYAS ================= */}
        <section className="section section--white areaBeaches">
          <div className="areaBeaches__container">
            <p className="areaBeaches__intro">{t("area.beaches.intro")}</p>

            <div className="areaBeaches__grid">
              <article className="beachItem">
                <h3>
                  {t("area.beaches.items.0.title")}{" "}
                  <span>{t("area.beaches.items.0.distance")}</span>
                </h3>
                <p>{t("area.beaches.items.0.text")}</p>
              </article>

              <article className="beachItem">
                <h3>{t("area.beaches.items.1.title")}</h3>
                <p>{t("area.beaches.items.1.text")}</p>
              </article>

              <article className="beachItem">
                <h3>{t("area.beaches.items.2.title")}</h3>
                <p>{t("area.beaches.items.2.text")}</p>
              </article>

              <article className="beachItem">
                <h3>{t("area.beaches.items.3.title")}</h3>
                <p>{t("area.beaches.items.3.text")}</p>
              </article>
            </div>

            {/* ✅ Enlace externo seguro */}
            <a
              className="areaBeaches__link"
              href={t("area.beaches.url")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("area.beaches.aria", { defaultValue: "Abrir enlace en una nueva pestaña" })}
            >
              {t("area.beaches.linkText")} →
            </a>
          </div>
        </section>

        {/* ================= NATURALEZA ================= */}
        <section className="section section--beige areaNature">
          <div className="areaNature__container">
            <div className="areaNature__media">
              <img
                src={emporda}
                alt={t("area.nature.imageAlt", { defaultValue: "Paisajes del Empordà" })}
                loading="lazy"
              />
            </div>

            <div className="areaNature__content">
              <h2>{t("area.nature.title")}</h2>

              <p>{t("area.nature.p1")}</p>

              <div className="paisajes">
                <div className="paisajes__item">
                  <h3>{t("area.nature.items.0.title")}</h3>
                  <p>{t("area.nature.items.0.text")}</p>
                </div>

                <div className="paisajes__item">
                  <h3>{t("area.nature.items.1.title")}</h3>
                  <p>{t("area.nature.items.1.text")}</p>
                </div>

                <div className="paisajes__item">
                  <h3>{t("area.nature.items.2.title")}</h3>
                  <p>{t("area.nature.items.2.text")}</p>

                  {/* ✅ Enlace externo seguro */}
                  <a
                    className="areaNature__link"
                    href={t("area.nature.items.2.url")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("area.nature.items.2.aria", {
                      defaultValue: "Abrir enlace en una nueva pestaña",
                    })}
                  >
                    {t("area.nature.items.2.linkText")} →
                  </a>
                </div>
              </div>

              <p className="areaNature__note">{t("area.nature.note")}</p>
            </div>
          </div>
        </section>

        {/* ================= EXPERIENCIAS ================= */}
        <section className="section section--white areaExperiences">
          <div className="areaExperiences__container">
            <header className="areaExperiences__header">
              <h2>{t("area.experiences.title")}</h2>
            </header>

            <div className="areaExperiences__layout">
              <div className="areaExperiences__media">
                <img
                  src={kayak}
                  alt={t("area.experiences.images.0", { defaultValue: "Kayak en la Costa Brava" })}
                  loading="lazy"
                />
                <img
                  src={barcos}
                  alt={t("area.experiences.images.1", { defaultValue: "Barcos y mar" })}
                  loading="lazy"
                />
              </div>

              <div className="areaExperiences__list">
                <div className="expItem">
                  <span>01</span>
                  <div>
                    <h3>{t("area.experiences.items.0.title")}</h3>
                    <p>{t("area.experiences.items.0.text")}</p>
                  </div>
                </div>

                <div className="expItem">
                  <span>02</span>
                  <div>
                    <h3>{t("area.experiences.items.1.title")}</h3>
                    <p>{t("area.experiences.items.1.text")}</p>
                  </div>
                </div>

                <div className="expItem">
                  <span>03</span>
                  <div>
                    <h3>{t("area.experiences.items.2.title")}</h3>
                    <p>{t("area.experiences.items.2.text")}</p>
                  </div>
                </div>

                <div className="expItem">
                  <span>04</span>
                  <div>
                    <h3>{t("area.experiences.items.3.title")}</h3>
                    <p>{t("area.experiences.items.3.text")}</p>
                  </div>
                </div>

                <div className="expItem">
                  <span>05</span>
                  <div>
                    <h3>{t("area.experiences.items.4.title")}</h3>
                    <p>{t("area.experiences.items.4.text")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SABORES ================= */}
        <section className="section section--beige areaFood">
          <div className="areaFood__container">
            <div className="areaFood__content">
              <h2>{t("area.food.title")}</h2>

              <p>{t("area.food.p1")}</p>
              <p>{t("area.food.p2")}</p>
              <p>{t("area.food.p3")}</p>

              <p className="areaFood__italic">{t("area.food.italic")}</p>

              {/* ✅ Link interno multiidioma */}
              <Link className="areaFood__btn" to={route(lang, "restaurante")}>
                {t("area.food.button")} <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="areaFood__media">
              <img
                src={pescado}
                alt={t("area.food.imageAlt", { defaultValue: "Gastronomía local" })}
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}