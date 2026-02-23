import "./Restaurante.css";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import SEO from "../../components/seo/SEO";

import heroImg from "../../assets/images/restaurante/oxido.png";
import propuestaImg from "../../assets/images/restaurante/brasa.jpeg";
import entornoImg from "../../assets/images/espacios/terraza.png";
import experienciaBg from "../../assets/images/restaurante/baner.png";


const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

function getLangFromPath(pathname: string): SupportedLang {
  const first = pathname.split("/")[1]?.toLowerCase() ?? "";
  return (SUPPORTED as readonly string[]).includes(first) ? (first as SupportedLang) : "es";
}

const WA_NUMBER = "34600000000";

function waLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function Restaurante() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);

  const waText = t("restaurante.whatsapp.text", {
    defaultValue: "Hola, quiero reservar una mesa en el restaurante.",
  });

  return (
    <>
      <SEO
        title={t("restaurante.seo.title", { defaultValue: "Restaurante | Taverna de la Sal" })}
        description={t("restaurante.seo.description", {
          defaultValue:
            "Restaurante a la brasa en L'Escala: producto de temporada, ambiente íntimo y cocina de calidad cerca del mar.",
        })}
        image={heroImg}
      />

      <main className="restPage restPage--restaurant">
        {/* HERO
            - En vez de poner background-image inline (que rompe el cambio por CSS),
              lo paso como CSS variable para que el CSS pueda cambiarla en móvil.
        */}
        <section
          className="restHero"
          style={
            {
              "--rest-hero-bg": `url(${heroImg})`,
            } as React.CSSProperties
          }
          aria-label={t("restaurante.hero.aria", { defaultValue: "Restaurante" })}
        >
          <div className="restHero__overlay" />

          <div className="restHero__content">
            <h1 className="hero__title">{t("restaurante.hero.title")}</h1>
            <p className="hero__subtitle">{t("restaurante.hero.subtitle")}</p>

            <a
              className="restHero__btn"
              href={waLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("restaurante.hero.cta")}
            </a>

            <p className="restHero__note">
              <span>✓</span> {t("restaurante.hero.note")}
            </p>
          </div>
        </section>

        {/* PROPUESTA */}
        <section className="section section--white restSplit">
          <div className="restSplit__container">
            <div className="restSplit__content">
              <p className="eyebrow">{t("restaurante.propuesta.eyebrow")}</p>
              <h2 className="title">{t("restaurante.propuesta.title")}</h2>

              <p className="text restSplit__lead">{t("restaurante.propuesta.lead")}</p>
              <p className="text">{t("restaurante.propuesta.p2")}</p>
            </div>

            <div className="restSplit__media">
              <img
                src={propuestaImg}
                alt={t("restaurante.propuesta.imageAlt", { defaultValue: "Propuesta gastronómica" })}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ENTORNO */}
        <section className="section section--beige restSplit restSplit--reverse">
          <div className="restSplit__container">
            <div className="restSplit__media">
              <img
                src={entornoImg}
                alt={t("restaurante.entorno.imageAlt", { defaultValue: "Entorno del restaurante" })}
                loading="lazy"
              />
            </div>

            <div className="restSplit__content">
              <p className="eyebrow">{t("restaurante.entorno.eyebrow")}</p>
              <h2 className="title">{t("restaurante.entorno.title")}</h2>

              <p className="text">{t("restaurante.entorno.p1")}</p>
              <p className="bye">{t("restaurante.entorno.p2")}</p>
              <p className="bye">{t("restaurante.entorno.p3")}</p>
              <p className="bye">{t("restaurante.entorno.p4")}</p>
            </div>
          </div>
        </section>

        {/* EXPERIENCIA
            - Misma idea: background como CSS variable para poder cambiar por CSS si quieres.
        */}
        <section
          className="restDark"
          style={
            {
              "--rest-dark-bg": `url(${experienciaBg})`,
            } as React.CSSProperties
          }
          aria-label={t("restaurante.experiencia.aria", { defaultValue: "Experiencia" })}
        >
          <div className="restDark__overlay" />

          <div className="restDark__content">
            <p className="eyebrow eyebrow--light">{t("restaurante.experiencia.eyebrow")}</p>
            <h2 className="title">{t("restaurante.experiencia.title")}</h2>

            <p className="text restDark__lead">{t("restaurante.experiencia.lead")}</p>
            <p className="text">{t("restaurante.experiencia.p2")}</p>
          </div>
        </section>

        {/* VENTAJAS */}
        <section className="section section--beige restCenter">
          <div className="restCenter__container">
            <p className="eyebrow">{t("restaurante.ventajas.eyebrow")}</p>
            <h2 className="title">{t("restaurante.ventajas.title")}</h2>

            <p className="text restCenter__lead">{t("restaurante.ventajas.lead")}</p>

            <ul className="restChecks">
              <li>
                <span className="check">✓</span>
                {t("restaurante.ventajas.items.0")}
              </li>
              <li>
                <span className="check">✓</span>
                {t("restaurante.ventajas.items.1")}
              </li>
              <li>
                <span className="check">✓</span>
                {t("restaurante.ventajas.items.2")}
              </li>
            </ul>

            <a className="restCenter__btn" href={`/${lang}/reservar`}>
              {t("restaurante.ventajas.cta")}
            </a>
          </div>
        </section>

        {/* CARTA */}
        <section className="section section--white restCenter">
          <div className="restCenter__container">
            <p className="eyebrow">{t("restaurante.carta.eyebrow")}</p>
            <h2 className="title">{t("restaurante.carta.title")}</h2>

            <p className="text restCenter__lead">{t("restaurante.carta.lead")}</p>

            <a
              className="link"
              href="https://docs.google.com/document/d/1UHRPUm4q1uIj6z6lqksVUhgYQm7ar-3cg9pETBSRPZQ/export?format=pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("restaurante.carta.ctaAria", { defaultValue: "Abrir carta en PDF" })}
            >
              {t("restaurante.carta.linkText")} →
            </a>
          </div>
        </section>

        {/* HORARIOS */}
        <section className="section section--beige restCenter">
          <div className="restCenter__container">
            <p className="eyebrow">{t("restaurante.horarios.eyebrow")}</p>
            <h2 className="title">{t("restaurante.horarios.title")}</h2>

            <div className="restHours">
              <div className="restHours__col">
                <h3 className="title-hora">{t("restaurante.horarios.week.title")}</h3>
                <p className="text">{t("restaurante.horarios.week.time")}</p>
              </div>

              <div className="restHours__col">
                <h3 className="title-hora">{t("restaurante.horarios.weekend.title")}</h3>
                <p className="text">{t("restaurante.horarios.weekend.lunch")}</p>
                <p className="text">{t("restaurante.horarios.weekend.dinner")}</p>
              </div>
            </div>

            <p className="text restCenter__lead">{t("restaurante.horarios.note")}</p>

            <a
              className="restCenter__btn"
              href={waLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("restaurante.horarios.cta")}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}