import "./Room.css";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import type { TFunction } from "i18next";

import heroRooms from "../../assets/images/habitaciones/cami.png";
import introRooms from "../../assets/images/habitaciones/camabaño.png";
import { BOOKING_URL } from "../../config/links";

import img1 from "../../assets/images/habitaciones/camaesquina.png";
import img2 from "../../assets/images/habitaciones/sofacama.png";
import img3 from "../../assets/images/habitaciones/atardecer.png";
import img4 from "../../assets/images/habitaciones/amenittis.png";
import img5 from "../../assets/images/habitaciones/espejo.png";
import img6 from "../../assets/images/habitaciones/camazul.png";
import img7 from "../../assets/images/habitaciones/copas.png";
import img8 from "../../assets/images/habitaciones/terraz.png";

import FaqItem from "../../components/FaqItem/FaqItem";
import SEO from "../../components/seo/SEO";

type Feature = {
  title: string;
  items: string[];
};

type Faq = {
  q: string;
  a: string;
};

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

function tArray(t: TFunction, key: string): string[] {
  const v: unknown = t(key, { returnObjects: true });
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string");
}

function tFeatures(t: TFunction, key: string): Feature[] {
  const v: unknown = t(key, { returnObjects: true });
  if (!Array.isArray(v)) return [];

  return v.filter((x): x is Feature => {
    if (typeof x !== "object" || x === null) return false;
    const r = x as Record<string, unknown>;
    if (typeof r.title !== "string") return false;
    if (!Array.isArray(r.items)) return false;
    return r.items.every((it) => typeof it === "string");
  });
}

function tFaq(t: TFunction, key: string): Faq[] {
  const v: unknown = t(key, { returnObjects: true });
  if (!Array.isArray(v)) return [];

  return v.filter((x): x is Faq => {
    if (typeof x !== "object" || x === null) return false;
    const r = x as Record<string, unknown>;
    return typeof r.q === "string" && typeof r.a === "string";
  });
}

const GALLERY = [img1, img2, img3, img4, img5, img6, img7, img8] as const;

export default function Room() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);

  const features = tFeatures(t, "rooms.features");
  const faq = tFaq(t, "rooms.faq.items");
  const introList = tArray(t, "rooms.intro.list");

  return (
    <>
      <SEO
        title={t("rooms.seo.title", { defaultValue: "Habitaciones | Taverna de la Sal" })}
        description={t("rooms.seo.description", {
          defaultValue:
            "Habitaciones boutique en L'Escala: descanso real, luz natural, balcón y detalles cuidados para una estancia tranquila.",
        })}
        image={heroRooms}
      />

      <main className="roomsPage">
        {/* HERO */}
        <section
          className="roomsHero"
          style={{ backgroundImage: `url(${heroRooms})` }}
          aria-label={t("rooms.hero.aria", { defaultValue: "Habitaciones" })}
        >
          <div className="roomsHero__overlay" />

          <div className="roomsHero__content">
            <h1 className="hero__title roomsHero__title">{t("rooms.hero.title")}</h1>
            <p className="hero__subtitle roomsHero__subtitle">{t("rooms.hero.subtitle")}</p>
          </div>

          <a
            className="btn btn--primary roomsHero__cta"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("rooms.hero.cta")}
          </a>
        </section>

        {/* INTRO */}
        <section className="roomsIntro">
          <div className="roomsIntro__container">
            <div className="roomsIntro__content">
              <h2 className="title roomsIntro__title">{t("rooms.intro.title")}</h2>
              <p className="text roomsIntro__lead">{t("rooms.intro.lead")}</p>

              <ul className="roomsIntro__list">
                {introList.map((item, i) => (
                  <li className="text" key={`${item}-${i}`}>
                    {item}
                  </li>
                ))}
              </ul>

              <blockquote className="roomsIntro__quote">
                {t("rooms.intro.quote")}
              </blockquote>
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

        {/* FEATURES */}
        <section className="roomsFeatures">
          <div className="roomsFeatures__container">
            {features.map((feature, index) => (
              <article className="featureItem" key={`${feature.title}-${index}`}>
                <h3 className="title featureItem__title">{feature.title}</h3>

                <ul className="featureItem__list">
                  {feature.items.map((item, i) => (
                    <li key={`${item}-${i}`}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section className="roomsGallery">
          <div className="roomsGallery__container">
            <header className="roomsGallery__header">
              <h2 className="title roomsGallery__title">{t("rooms.gallery.title")}</h2>
              <p className="text roomsGallery__subtitle">{t("rooms.gallery.subtitle")}</p>
            </header>

            <div className="roomsGallery__grid">
              {GALLERY.map((img, i) => (
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

        {/* CTA FINAL */}
        <section className="roomsFinal">
          <div className="roomsFinal__container">
            <h2 className="title roomsFinal__title">{t("rooms.final.title")}</h2>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              {t("rooms.final.button")}
            </a>
          </div>
        </section>

        {/* SERVICIOS */}
        <section className="roomsServices">
          <div className="roomsServices__container">
            <p className="text roomsServices__text">
              {t("rooms.services.text")}
            </p>

            <Link
              to={route(lang, "servicios")}
              className="link roomsServices__link"
            >
              {t("rooms.services.link")}{" "}
              <span className="roomsServices__arrow">→</span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="roomsFaq">
          <div className="roomsFaq__container">
            <h2 className="title roomsFaq__title">{t("rooms.faq.title")}</h2>

            <div className="roomsFaq__list">
              {faq.map((item, i) => (
                <FaqItem
                  key={`${item.q}-${i}`}
                  q={item.q}
                  a={item.a}
                  defaultOpen={i === 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* BIG CTA */}
        <section className="roomsBigCta">
          <div className="roomsBigCta__container">
            <h2 className="title roomsBigCta__title">
              {t("rooms.bigCta.title")}
            </h2>

            <a
              className="btn btn--primary roomsBigCta__btn"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("rooms.bigCta.button")}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}