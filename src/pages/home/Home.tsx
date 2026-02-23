import "./Home.css";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import type { TFunction } from "i18next";
import type { CSSProperties } from "react";
import SEO from "../../components/seo/SEO";

import storyImg from "../../assets/images/heroimg/entrada.png";
import pezdecoration from "../../assets/images/heroimg/vistas.png";
import escaleraimg from "../../assets/images/heroimg/cenital.png";
import camaimg from "../../assets/images/heroimg/camazul.png";
import azoteaimg from "../../assets/images/heroimg/terraza.png";
import restauranteimg from "../../assets/images/restaurante/chorizos.png";
import salaimg from "../../assets/images/espacios/IMG-20240419-WA0062.jpg";

/*
  Backgrounds del hero:
  Importo las imágenes para que Vite las gestione como assets y no se rompan rutas en producción.
  Las paso a CSS como variables para cambiar de desktop a móvil con media queries en Home.css.
*/
import heroDesktop from "../../assets/images/heroimg/herofinal.png";
import heroMobile from "../../assets/images/heroimg/heromovil.png";

import { BOOKING_URL } from "../../config/links";

/* ================= IDIOMAS SOPORTADOS ================= */

const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

function getLangFromPath(pathname: string): SupportedLang {
  const first = pathname.split("/")[1]?.toLowerCase() ?? "";
  return (SUPPORTED as readonly string[]).includes(first) ? (first as SupportedLang) : "es";
}

function route(lang: SupportedLang, path: string) {
  const clean = path.replace(/^\/+/, "");
  return `/${lang}/${clean}`;
}

/* ================= HELPERS i18n TIPADOS ================= */

function tArray(t: TFunction, key: string): string[] {
  const v: unknown = t(key, { returnObjects: true });
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string");
}

type Review = { quote: string; name: string; city: string };

function tReviews(t: TFunction, key: string): Review[] {
  const v: unknown = t(key, { returnObjects: true });
  if (!Array.isArray(v)) return [];

  return v.filter((x): x is Review => {
    if (typeof x !== "object" || x === null) return false;
    const r = x as Record<string, unknown>;
    return typeof r.quote === "string" && typeof r.name === "string" && typeof r.city === "string";
  });
}

export default function Home() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);

  /*
    Listas traducidas.
    Si alguna key no existe o viene mal, devuelvo arrays vacíos para que no reviente el render.
  */
  const roomsFeatures = tArray(t, "home.rooms.features");
  const servicesItems = tArray(t, "home.services.items");
  const areaItems = tArray(t, "home.area.items");
  const reviewsItems = tReviews(t, "home.reviews.items");

  const servicesIcons = ["☕", "☀", "✦", "⌁", "🚗"] as const;
  const areaIcons = ["≋", "⌂", "🏛", "🐟"] as const;

  /*
    Variables CSS para el hero.
    En Home.css uso:
      background-image: var(--hero-desktop);
    y en el media query móvil:
      background-image: var(--hero-mobile);

    Aquí no uso any. Le digo al tipado que estas dos custom properties existen.
  */
  type HeroVars = CSSProperties & Record<"--hero-desktop" | "--hero-mobile", string>;

  const heroVars: HeroVars = {
    "--hero-desktop": `url(${heroDesktop})`,
    "--hero-mobile": `url(${heroMobile})`,
  };

  return (
    <>
      <SEO
        title={t("home.seo.title", {
          defaultValue: "Hotel Taverna de la Sal | Hotel boutique en L'Escala",
        })}
        description={t("home.seo.description", {
          defaultValue:
            "Hotel boutique solo adultos en L'Escala, Costa Brava. Seis habitaciones íntimas en un edificio del siglo XIX junto al mar.",
        })}
        image={storyImg}
      />

      <main className="page">
        {/* ================= HERO ================= */}
        <section className="hero" aria-label={t("home.hero.aria", { defaultValue: "Portada" })}>
          <div className="hero__background" style={heroVars}>
            <div className="container hero__content">
              <p className="eyebrow eyebrow--light">{t("home.hero.eyebrow")}</p>
              <h1 className="hero__title">{t("home.hero.title")}</h1>
              <p className="hero__subtitle">{t("home.hero.subtitle")}</p>

              <a className="btn btn--primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                {t("home.hero.cta")}
              </a>
            </div>
          </div>
        </section>

        {/* ================= HISTORIA ================= */}
        <section className="section section--white">
          <div className="container story">
            <figure className="story__media">
              <img
                className="story__img"
                src={storyImg}
                alt={t("home.story.imageAlt", { defaultValue: "Historia del hotel" })}
                loading="lazy"
              />
            </figure>

            <div className="story__body">
              <p className="eyebrow">{t("home.story.eyebrow")}</p>
              <h2 className="title">{t("home.story.title")}</h2>
              <p className="text">{t("home.story.text")}</p>

              <Link className="link" to={route(lang, "historia")}>
                {t("home.story.link")}
              </Link>
            </div>
          </div>
        </section>

        {/* ================= REFUGIO ================= */}
        <section className="section section--beige">
          <div className="container center">
            <p className="eyebrow">{t("home.refuge.eyebrow")}</p>
            <h2 className="title">{t("home.refuge.title")}</h2>

            <div className="cards3">
              <article className="card">
                <div className="icon" aria-hidden="true">
                  %
                </div>
                <h3 className="card__title">{t("home.refuge.cards.0.title")}</h3>
                <p className="card__text">{t("home.refuge.cards.0.text")}</p>
              </article>

              <article className="card">
                <div className="icon" aria-hidden="true">
                  ★
                </div>
                <h3 className="card__title">{t("home.refuge.cards.1.title")}</h3>
                <p className="card__text">{t("home.refuge.cards.1.text")}</p>
              </article>

              <article className="card">
                <div className="icon" aria-hidden="true">
                  ☀
                </div>
                <h3 className="card__title">{t("home.refuge.cards.2.title")}</h3>
                <p className="card__text">{t("home.refuge.cards.2.text")}</p>
              </article>
            </div>
          </div>
        </section>

        {/* ================= ATMÓSFERA ================= */}
        <section className="section section--white">
          <div className="container center">
            <p className="eyebrow">{t("home.atmosphere.eyebrow")}</p>
            <h2 className="title">{t("home.atmosphere.title")}</h2>

            <p className="text text--muted">{t("home.atmosphere.text")}</p>

            <div className="atmosphere">
              <figure className="atmosphere__item atmosphere__item--large">
                <img
                  src={pezdecoration}
                  alt={t("home.atmosphere.images.0", { defaultValue: "Detalle del hotel" })}
                  loading="lazy"
                  className="atmosphere__img"
                />
              </figure>

              <figure className="atmosphere__item">
                <img
                  src={escaleraimg}
                  alt={t("home.atmosphere.images.1", { defaultValue: "Escalera interior" })}
                  loading="lazy"
                  className="atmosphere__img"
                />
              </figure>

              <figure className="atmosphere__item atmosphere__item--large">
                <img
                  src={salaimg}
                  alt={t("home.atmosphere.images.2", { defaultValue: "Sala del hotel" })}
                  loading="lazy"
                  className="atmosphere__img"
                />
              </figure>

              <figure className="atmosphere__item">
                <img
                  src={azoteaimg}
                  alt={t("home.atmosphere.images.3", { defaultValue: "Terraza" })}
                  loading="lazy"
                  className="atmosphere__img"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* ================= BENEFICIOS ================= */}
        <section className="section section--beige">
          <div className="container center">
            <p className="eyebrow">{t("home.benefits.eyebrow")}</p>
            <h2 className="title">{t("home.benefits.title")}</h2>

            <div className="cards3">
              <article className="card">
                <div className="icon" aria-hidden="true">
                  10%
                </div>
                <h3 className="card__title">{t("home.benefits.cards.0.title")}</h3>
                <p className="card__text">{t("home.benefits.cards.0.text")}</p>
              </article>

              <article className="card">
                <div className="icon" aria-hidden="true">
                  €
                </div>
                <h3 className="card__title">{t("home.benefits.cards.1.title")}</h3>
                <p className="card__text">{t("home.benefits.cards.1.text")}</p>
              </article>

              <article className="card">
                <div className="icon" aria-hidden="true">
                  ✉
                </div>
                <h3 className="card__title">{t("home.benefits.cards.2.title")}</h3>
                <p className="card__text">{t("home.benefits.cards.2.text")}</p>
              </article>
            </div>
          </div>
        </section>

        {/* ================= HABITACIONES ================= */}
        <section className="section section--white">
          <div className="container rooms">
            <div className="rooms__content">
              <p className="eyebrow">{t("home.rooms.eyebrow")}</p>
              <h2 className="title">{t("home.rooms.title")}</h2>

              <p className="text">{t("home.rooms.text")}</p>

              <ul className="features">
                {roomsFeatures.map((x) => (
                  <li className="text" key={x}>
                    {x}
                  </li>
                ))}
              </ul>

              <div className="actions">
                <Link to={route(lang, "habitaciones")} className="btn btn--outline">
                  {t("home.rooms.details")}
                </Link>

                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  {t("home.rooms.cta")}
                </a>
              </div>
            </div>

            <figure className="rooms__media">
              <img
                className="rooms__img"
                src={camaimg}
                alt={t("home.rooms.imageAlt", { defaultValue: "Habitación del hotel" })}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* ================= RESTAURANTE ================= */}
        <section className="section section--beige">
          <div className="container feature">
            <figure className="feature__media">
              <img
                className="feature__img"
                src={restauranteimg}
                alt={t("home.restaurant.imageAlt", { defaultValue: "Restaurante del hotel" })}
                loading="lazy"
              />
            </figure>

            <div className="feature__body">
              <p className="eyebrow">{t("home.restaurant.eyebrow")}</p>
              <h2 className="title">{t("home.restaurant.title")}</h2>
              <p className="text">{t("home.restaurant.text")}</p>

              <Link className="link" to={route(lang, "restaurante")}>
                {t("home.restaurant.cta")}
              </Link>
            </div>
          </div>
        </section>

        {/* ================= SERVICIOS ================= */}
        <section className="section section--white">
          <div className="container center">
            <p className="eyebrow">{t("home.services.eyebrow")}</p>
            <h2 className="title">{t("home.services.title")}</h2>

            <div className="services">
              {servicesIcons.map((icon, i) => (
                <article className="service" key={`${icon}-${i}`}>
                  <span className="service__icon" aria-hidden="true">
                    {icon}
                  </span>
                  <p>{servicesItems[i] ?? ""}</p>
                </article>
              ))}
            </div>

            <Link className="link link--center" to={route(lang, "servicios")}>
              {t("home.services.link")}
            </Link>
          </div>
        </section>

        {/* ================= ENTORNO ================= */}
        <section className="section section--beige">
          <div className="container area">
            <div className="area__body">
              <p className="eyebrow">{t("home.area.eyebrow")}</p>
              <h2 className="title">{t("home.area.title")}</h2>

              <p className="text">{t("home.area.text")}</p>

              <ul className="area__list">
                {areaIcons.map((icon, i) => (
                  <li key={`${icon}-${i}`}>
                    <span className="area__icon" aria-hidden="true">
                      {icon}
                    </span>
                    <span className="text">{areaItems[i] ?? ""}</span>
                  </li>
                ))}
              </ul>

              <Link className="link link--left" to={route(lang, "entorno")}>
                {t("home.area.link")}
              </Link>
            </div>

            <figure className="area__media">
              <img
                className="area__img"
                src={pezdecoration}
                alt={t("home.area.imageAlt", { defaultValue: "Entorno en L'Escala" })}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* ================= OPINIONES ================= */}
        <section className="reviews section section--white">
          <div className="container reviews__inner">
            <p className="reviews__eyebrow">{t("home.reviews.eyebrow")}</p>
            <h2 className="title reviews__title">{t("home.reviews.title")}</h2>

            <div className="reviews__grid">
              {reviewsItems.map((r, idx) => (
                <article className="review" key={`${r.name}-${idx}`}>
                  <div className="review__stars" aria-label={t("home.reviews.starsAria")}>
                    ★★★★★
                  </div>
                  <p className="review__quote">{r.quote}</p>
                  <p className="review__name">{r.name}</p>
                  <p className="review__city">{r.city}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA FINAL ================= */}
        <section className="ctaFinal">
          <div className="container ctaFinal__inner">
            <h2 className="ctaFinal__title">{t("home.cta.title")}</h2>
            <p className="ctaFinal__text">{t("home.cta.text")}</p>

            <div className="ctaFinal__actions">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn--light">
                {t("home.cta.button")}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}