import "./Home.css";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo/SEO";

import storyImg from "../../assets/images/heroimg/salida.png";
import pezdecoration from "../../assets/images/heroimg/entradapescado.png";
import escaleraimg from "../../assets/images/heroimg/genital.png";
import camaimg from "../../assets/images/heroimg/camazul.png";
import azoteaimg from "../../assets/images/heroimg/terraza.png";
import restauranteimg from "../../assets/images/restaurante/oxido.png";
import salaimg from "../../assets/images/espacios/IMG-20240419-WA0062.jpg";
import { BOOKING_URL } from "../../config/links";
/**
 * ✅ Idiomas soportados en rutas (/es/..., /en/..., etc.)
 * Si no encuentra un idioma válido en la URL, cae a "es".
 */
const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

function getLangFromPath(pathname: string): SupportedLang {
  // pathname: "/es/habitaciones" → ["", "es", "habitaciones"]
  const first = pathname.split("/")[1]?.toLowerCase() ?? "";
  return (SUPPORTED as readonly string[]).includes(first) ? (first as SupportedLang) : "es";
}

/**
 * Helper para construir rutas internas multiidioma
 * path debe venir SIN "/" inicial, ej: ", "habitaciones"
 */
function route(lang: SupportedLang, path: string) {
  const clean = path.replace(/^\/+/, "");
  return `/${lang}/${clean}`;
}

export default function Home() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);

  /**
   * ✅ Mejoras:
   * - useMemo: evita recalcular arrays/objetos en cada render.
   * - defaultValue en alts importantes: no dejamos el alt vacío por fallo de i18n.
   */
  const roomsFeatures = useMemo(
    () => (t("home.rooms.features", { returnObjects: true }) as string[]) ?? [],
    [t]
  );

  const servicesItems = useMemo(
    () => (t("home.services.items", { returnObjects: true }) as string[]) ?? [],
    [t]
  );

  const areaItems = useMemo(
    () => (t("home.area.items", { returnObjects: true }) as string[]) ?? [],
    [t]
  );

  const reviewsItems = useMemo(
    () =>
      (t("home.reviews.items", { returnObjects: true }) as Array<{
        quote: string;
        name: string;
        city: string;
      }>) ?? [],
    [t]
  );

  return (
    <>
      {/* ✅ SEO (canonical dinámico lo maneja tu componente SEO.tsx) */}
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
          <div className="hero__background">
            <div className="container hero__content">
              <p className="eyebrow eyebrow--light">{t("home.hero.eyebrow")}</p>
              <h1 className="hero__title">{t("home.hero.title")}</h1>
              <p className="hero__subtitle">{t("home.hero.subtitle")}</p>

             <a
                  className="btn btn--primary"
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                <div className="icon">%</div>
                <h3 className="card__title">{t("home.refuge.cards.0.title")}</h3>
                <p className="card__text">{t("home.refuge.cards.0.text")}</p>
              </article>

              <article className="card">
                <div className="icon">★</div>
                <h3 className="card__title">{t("home.refuge.cards.1.title")}</h3>
                <p className="card__text">{t("home.refuge.cards.1.text")}</p>
              </article>

              <article className="card">
                <div className="icon">☀</div>
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
                <div className="icon">10%</div>
                <h3 className="card__title">{t("home.benefits.cards.0.title")}</h3>
                <p className="card__text">{t("home.benefits.cards.0.text")}</p>
              </article>

              <article className="card">
                <div className="icon">€</div>
                <h3 className="card__title">{t("home.benefits.cards.1.title")}</h3>
                <p className="card__text">{t("home.benefits.cards.1.text")}</p>
              </article>

              <article className="card">
                <div className="icon">✉</div>
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
                {Array.isArray(roomsFeatures) && roomsFeatures.map((x) => <li key={x}>{x}</li>)}
              </ul>

              <div className="actions">
                <Link to={route(lang, "habitaciones")} className="btn btn--outline">
                  {t("home.rooms.details")}
                </Link>
              <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
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

              <Link className="btn btn--primary" to={route(lang, "restaurante")}>
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
              <article className="service">
                <span className="service__icon" aria-hidden="true">
                  ☕
                </span>
                <p>{servicesItems?.[0]}</p>
              </article>

              <article className="service">
                <span className="service__icon" aria-hidden="true">
                  ☀
                </span>
                <p>{servicesItems?.[1]}</p>
              </article>

              <article className="service">
                <span className="service__icon" aria-hidden="true">
                  ✦
                </span>
                <p>{servicesItems?.[2]}</p>
              </article>

              <article className="service">
                <span className="service__icon" aria-hidden="true">
                  ⌁
                </span>
                <p>{servicesItems?.[3]}</p>
              </article>

              <article className="service">
                <span className="service__icon" aria-hidden="true">
                  🚗
                </span>
                <p>{servicesItems?.[4]}</p>
              </article>
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
                <li>
                  <span className="area__icon">≋</span>
                  <span>{areaItems?.[0]}</span>
                </li>
                <li>
                  <span className="area__icon">⌂</span>
                  <span>{areaItems?.[1]}</span>
                </li>
                <li>
                  <span className="area__icon">🏛</span>
                  <span>{areaItems?.[2]}</span>
                </li>
                <li>
                  <span className="area__icon">🐟</span>
                  <span>{areaItems?.[3]}</span>
                </li>
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
            <h2 className="reviews__title">{t("home.reviews.title")}</h2>

            <div className="reviews__grid">
              {Array.isArray(reviewsItems) &&
                reviewsItems.map((r, idx) => (
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
             <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--light"
                >
                  {t("home.cta.button")}
                </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}