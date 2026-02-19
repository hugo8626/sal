import "./Room.css";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import heroRooms from "../../assets/images/habitaciones/cami.png";
import introRooms from "../../assets/images/habitaciones/camabaño.png";

import img1 from "../../assets/images/habitaciones/camaesquina.png";
import img2 from "../../assets/images/habitaciones/sila.png";
import img3 from "../../assets/images/habitaciones/espejo.png";
import img4 from "../../assets/images/habitaciones/camatele.png";
import img5 from "../../assets/images/habitaciones/amenittis.png";
import img6 from "../../assets/images/habitaciones/cama.png";
import img7 from "../../assets/images/habitaciones/terraza.png";
import img8 from "../../assets/images/habitaciones/terraz.png";

import FaqItem from "../../components/FaqItem/FaqItem";
import SEO from "../../components/seo/SEO";

/**
 * ✅ Tipos para i18n (evita errores silenciosos)
 */
type Feature = {
  title: string;
  items: string[];
};

type Faq = {
  q: string;
  a: string;
};

/**
 * ✅ Idiomas soportados en rutas
 */
const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

/**
 * ✅ Lee el idioma desde la URL (/es/..., /en/...)
 * Si no hay, cae a "es".
 */
function getLangFromPath(pathname: string): SupportedLang {
  const first = pathname.split("/")[1]?.toLowerCase() ?? "";
  return (SUPPORTED as readonly string[]).includes(first) ? (first as SupportedLang) : "es";
}

/**
 * ✅ Helper para construir rutas internas con idioma
 */
function route(lang: SupportedLang, path: string) {
  const clean = path.replace(/^\/+/, "");
  return `/${lang}/${clean}`;
}

export default function Room() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);

  /**
   * ✅ useMemo:
   * - Evita recalcular objetos/arrays en cada render.
   * - Además ponemos "guardas" (fallbacks) para que no explote si falta una key.
   */
  const features = useMemo(() => {
    const data = t("rooms.features", { returnObjects: true }) as Feature[] | unknown;
    return Array.isArray(data) ? (data as Feature[]) : [];
  }, [t]);

  const faq = useMemo(() => {
    const data = t("rooms.faq.items", { returnObjects: true }) as Faq[] | unknown;
    return Array.isArray(data) ? (data as Faq[]) : [];
  }, [t]);

  const introList = useMemo(() => {
    const data = t("rooms.intro.list", { returnObjects: true }) as string[] | unknown;
    return Array.isArray(data) ? (data as string[]) : [];
  }, [t]);

  const gallery = useMemo(() => [img1, img2, img3, img4, img5, img6, img7, img8], []);

  return (
    <>
      {/* ✅ SEO específico de la página */}
      <SEO
        title={t("rooms.seo.title", { defaultValue: "Habitaciones | Taverna de la Sal" })}
        description={t("rooms.seo.description", {
          defaultValue:
            "Habitaciones boutique en L'Escala: descanso real, luz natural, balcón y detalles cuidados para una estancia tranquila.",
        })}
        image={heroRooms}
      />

      <main className="roomsPage">
        {/* ================= HERO ================= */}
        <section
          className="roomsHero"
          style={{ backgroundImage: `url(${heroRooms})` }}
          aria-label={t("rooms.hero.aria", { defaultValue: "Habitaciones" })}
        >
          <div className="roomsHero__overlay" />

          <div className="roomsHero__content">
            <h1 className="roomsHero__title">{t("rooms.hero.title")}</h1>
            <p className="roomsHero__subtitle">{t("rooms.hero.subtitle")}</p>
          </div>

          {/* ✅ CTA directo a reservar */}
          <div className="roomsHero__ctaWrap">
            <Link className="roomsHero__cta" to={route(lang, "reservar")}>
              {t("rooms.hero.cta")}
            </Link>
          </div>
        </section>

        {/* ================= INTRO ================= */}
        <section className="roomsIntro">
          <div className="roomsIntro__container">
            <div className="roomsIntro__content">
              <h2 className="roomsIntro__title">{t("rooms.intro.title")}</h2>
              <p className="roomsIntro__lead">{t("rooms.intro.lead")}</p>

              <ul className="roomsIntro__list">
                {introList.map((item, i) => (
                  <li key={`${item}-${i}`}>{item}</li>
                ))}
              </ul>

              <blockquote className="roomsIntro__quote">{t("rooms.intro.quote")}</blockquote>
            </div>

            <div className="roomsIntro__media">
              <img
                src={introRooms}
                alt={t("rooms.intro.imageAlt", { defaultValue: "Habitación con baño" })}
                className="roomsIntro__img"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="roomsFeatures">
          <div className="roomsFeatures__container">
            {features.map((feature, index) => (
              <article className="featureItem" key={`${feature.title}-${index}`}>
                <h3 className="featureItem__title">{feature.title}</h3>

                <ul className="featureItem__list">
                  {Array.isArray(feature.items) &&
                    feature.items.map((item, i) => <li key={`${item}-${i}`}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ================= GALLERY ================= */}
        <section className="roomsGallery">
          <div className="roomsGallery__container">
            <header className="roomsGallery__header">
              <h2 className="roomsGallery__title">{t("rooms.gallery.title")}</h2>
              <p className="roomsGallery__subtitle">{t("rooms.gallery.subtitle")}</p>
            </header>

            <div className="roomsGallery__grid">
              {gallery.map((img, i) => (
                <figure className="gItem" key={i}>
                  <img
                    src={img}
                    alt={`${t("rooms.gallery.imageAlt", {
                      defaultValue: "Habitación boutique",
                    })} ${i + 1}`}
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA FINAL ================= */}
        <section className="roomsFinal">
          <div className="roomsFinal__container">
            <h2 className="roomsFinal__title">{t("rooms.final.title")}</h2>

            <Link to={route(lang, "reservar")} className="roomsFinal__btn">
              {t("rooms.final.button")}
            </Link>
          </div>
        </section>

        {/* ================= SERVICIOS / RESTAURANTE ================= */}
        <section className="roomsServices">
          <div className="roomsServices__container">
            <p className="roomsServices__text">{t("rooms.services.text")}</p>

            <Link to={route(lang, "servicios")} className="roomsServices__link">
              {t("rooms.services.link")} <span className="roomsServices__arrow">→</span>
            </Link>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="roomsFaq">
          <div className="roomsFaq__container">
            <h2 className="roomsFaq__title">{t("rooms.faq.title")}</h2>

            <div className="roomsFaq__list">
              {faq.map((item, i) => (
                <FaqItem key={`${item.q}-${i}`} q={item.q} a={item.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* ================= BIG CTA ================= */}
        <section className="roomsBigCta">
          <div className="roomsBigCta__container">
            <h2 className="roomsBigCta__title">{t("rooms.bigCta.title")}</h2>

            <Link className="roomsBigCta__btn" to={route(lang, "reservar")}>
              {t("rooms.bigCta.button")}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}