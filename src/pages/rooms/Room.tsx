import "./Room.css";
import { useTranslation } from "react-i18next";

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

type Feature = {
  title: string;
  items: string[];
};

type Faq = {
  q: string;
  a: string;
};

export default function Room() {
  const { t } = useTranslation();

  const features = t("rooms.features", { returnObjects: true }) as Feature[];
  const faq = t("rooms.faq.items", { returnObjects: true }) as Faq[];

  return (
    <main className="roomsPage">
      {/* ================= HERO ================= */}
      <section
        className="roomsHero"
        style={{ backgroundImage: `url(${heroRooms})` }}
        aria-label={t("rooms.hero.title")}
      >
        <div className="roomsHero__overlay" />

        <div className="roomsHero__content">
          <h1 className="roomsHero__title">
            {t("rooms.hero.title")}
          </h1>

          <p className="roomsHero__subtitle">
            {t("rooms.hero.subtitle")}
          </p>
        </div>

        <div className="roomsHero__ctaWrap">
          <a className="roomsHero__cta" href="/reservar">
            {t("rooms.hero.cta")}
          </a>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="roomsIntro">
        <div className="roomsIntro__container">
          <div className="roomsIntro__content">
            <h2 className="roomsIntro__title">
              {t("rooms.intro.title")}
            </h2>

            <p className="roomsIntro__lead">
              {t("rooms.intro.lead")}
            </p>

            <ul className="roomsIntro__list">
              {(
                t("rooms.intro.list", { returnObjects: true }) as string[]
              ).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <blockquote className="roomsIntro__quote">
              {t("rooms.intro.quote")}
            </blockquote>
          </div>

          <div className="roomsIntro__media">
            <img
              src={introRooms}
              alt={t("rooms.intro.imageAlt")}
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
            <article className="featureItem" key={index}>
              <h3 className="featureItem__title">
                {feature.title}
              </h3>
              <ul className="featureItem__list">
                {feature.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="roomsGallery">
        <div className="roomsGallery__container">
          <header className="roomsGallery__header">
            <h2 className="roomsGallery__title">
              {t("rooms.gallery.title")}
            </h2>
            <p className="roomsGallery__subtitle">
              {t("rooms.gallery.subtitle")}
            </p>
          </header>

          <div className="roomsGallery__grid">
            {[img1, img2, img3, img4, img5, img6, img7, img8].map(
              (img, i) => (
                <figure className="gItem" key={i}>
                  <img
                    src={img}
                    alt={t("rooms.gallery.imageAlt")}
                    loading="lazy"
                  />
                </figure>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================= RESERVE STRIP ================= */}
      <section className="roomsFinal">
        <div className="roomsFinal__container">
          <h2 className="roomsFinal__title">
            {t("rooms.final.title")}
          </h2>

          <a href="/reservar" className="roomsFinal__btn">
            {t("rooms.final.button")}
          </a>
        </div>
      </section>

      {/* ================= SERVICES LINK ================= */}
      <section className="roomsServices">
        <div className="roomsServices__container">
          <p className="roomsServices__text">
            {t("rooms.services.text")}
          </p>

          <a href="/restaurante" className="roomsServices__link">
            {t("rooms.services.link")}{" "}
            <span className="roomsServices__arrow">→</span>
          </a>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="roomsFaq">
        <div className="roomsFaq__container">
          <h2 className="roomsFaq__title">
            {t("rooms.faq.title")}
          </h2>

          <div className="roomsFaq__list">
            {faq.map((item, i) => (
              <FaqItem
                key={i}
                q={item.q}
                a={item.a}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL BIG CTA ================= */}
      <section className="roomsBigCta">
        <div className="roomsBigCta__container">
          <h2 className="roomsBigCta__title">
            {t("rooms.bigCta.title")}
          </h2>

          <a className="roomsBigCta__btn" href="/reservar">
            {t("rooms.bigCta.button")}
          </a>
        </div>
      </section>
    </main>
  );
}