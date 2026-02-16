import "./Restaurante.css";
import { useTranslation } from "react-i18next";

import heroImg from "../../assets/images/restaurante/axidosincopa.png";
import brasaImg from "../../assets/images/restaurante/photo_2026-02-14_18-51-06.jpg";
import marImg from "../../assets/images/restaurante/oxido.png";

type IconName = "fork" | "sun" | "waves" | "book" | "sparkle" | "parking" | "wifi";

function Icon({ name }: { name: IconName }) {
  // SVG monocromo (currentColor). No emojis.
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

  return (
    <main className="restPage">
      {/* HERO */}
      <section
        className="restHero"
        style={{ backgroundImage: `url(${heroImg})` }}
        aria-label={t("restaurant.hero.aria", { defaultValue: t("restaurant.hero.title") })}
      >
        <div className="restHero__overlay" />
        <div className="container restHero__content">
          <h1 className="restHero__title">{t("restaurant.hero.title")}</h1>
          <p className="restHero__subtitle">{t("restaurant.hero.subtitle")}</p>
        </div>
      </section>

      {/* BLOQUE 1: BRASA (texto izq + foto der) */}
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

            <a className="restBtnOutline" href="/restaurante">
              {t("restaurant.brasa.cta")}
            </a>
          </div>

          <figure className="restSplit__media">
            <img className="restImg" src={brasaImg} alt={t("restaurant.brasa.title")} loading="lazy" />
          </figure>
        </div>
      </section>

      {/* BLOQUE 2: DESAYUNO (foto izq + texto der) */}
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
            <img className="restImg" src={marImg} alt={t("restaurant.breakfast.title")} loading="lazy" />
          </figure>
        </div>
      </section>

      {/* BLOQUE 3: TERRAZA (texto izq + foto der) */}
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
            <img className="restImg" src={marImg} alt={t("restaurant.terrace.title")} loading="lazy" />
          </figure>
        </div>
      </section>

      {/* BLOQUE 4: LECTURA (foto izq + texto der) */}
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
            <img className="restImg" src={brasaImg} alt={t("restaurant.reading.title")} loading="lazy" />
          </figure>
        </div>
      </section>

      {/* CARDS 3 */}
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

      {/* CTA FINAL BEIGE */}
      <section className="section section--beige restFinal">
        <div className="container restFinal__inner">
          <h2 className="restFinal__title">{t("restaurant.final.title")}</h2>

          <a className="restFinal__btn" href="/reservar">
            {t("restaurant.final.cta")}
          </a>
        </div>
      </section>
    </main>
  );
}