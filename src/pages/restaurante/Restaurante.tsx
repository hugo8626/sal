import "./Restaurante.css";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import SEO from "../../components/seo/SEO";

/* ✅ IMÁGENES */
import heroImg from "../../assets/images/restaurante/oxido.png";
import propuestaImg from "../../assets/images/restaurante/playa.png";
import entornoImg from "../../assets/images/restaurante/photo_2026-02-14_18-51-06.jpg";
import experienciaBg from "../../assets/images/restaurante/oxido.png";

const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

function getLangFromPath(pathname: string): SupportedLang {
  const first = pathname.split("/")[1]?.toLowerCase() ?? "";
  return (SUPPORTED as readonly string[]).includes(first) ? (first as SupportedLang) : "es";
}

/* ✅ WhatsApp */
const WA_NUMBER = "34600000000"; // <-- CAMBIA ESTO
function waLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function Restaurante() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);

  const waText = t("restaurante.whatsapp.text");

  return (
    <>
      <SEO
        title={t("restaurante.seo.title")}
        description={t("restaurante.seo.description")}
        image={heroImg}
      />

      <main className="restPage">
        {/* ================= HERO ================= */}
        <section
          className="restHero"
          style={{ backgroundImage: `url(${heroImg})` }}
          aria-label={t("restaurante.hero.aria")}
        >
          <div className="restHero__overlay" />
          <div className="restHero__content">
            <h1>{t("restaurante.hero.title")}</h1>

            <p>{t("restaurante.hero.subtitle")}</p>

            {/* ✅ WhatsApp */}
            <a className="restHero__btn" href={waLink(waText)} target="_blank" rel="noopener noreferrer">
              {t("restaurante.hero.cta")}
            </a>

            <p className="restHero__note">
              <span>✓</span> {t("restaurante.hero.note")}
            </p>
          </div>
        </section>

        {/* ================= PROPUESTA ================= */}
        <section className="section section--white restSplit">
          <div className="restSplit__container">
            <div className="restSplit__content">
              <p className="eyebrow">{t("restaurante.propuesta.eyebrow")}</p>
              <h2>{t("restaurante.propuesta.title")}</h2>

              <p className="restSplit__lead">{t("restaurante.propuesta.lead")}</p>

              <p>{t("restaurante.propuesta.p2")}</p>
            </div>

            <div className="restSplit__media">
              <img src={propuestaImg} alt={t("restaurante.propuesta.imageAlt")} loading="lazy" />
            </div>
          </div>
        </section>

        {/* ================= ENTORNO ================= */}
        <section className="section section--beige restSplit restSplit--reverse">
          <div className="restSplit__container">
            <div className="restSplit__media">
              <img src={entornoImg} alt={t("restaurante.entorno.imageAlt")} loading="lazy" />
            </div>

            <div className="restSplit__content">
              <p className="eyebrow">{t("restaurante.entorno.eyebrow")}</p>
              <h2>{t("restaurante.entorno.title")}</h2>

              <p>{t("restaurante.entorno.p1")}</p>
              <p>{t("restaurante.entorno.p2")}</p>
              <p>{t("restaurante.entorno.p3")}</p>
              <p>{t("restaurante.entorno.p4")}</p>
            </div>
          </div>
        </section>

        {/* ================= EXPERIENCIA (OSCURA) ================= */}
        <section
          className="restDark"
          style={{ backgroundImage: `url(${experienciaBg})` }}
          aria-label={t("restaurante.experiencia.aria")}
        >
          <div className="restDark__overlay" />
          <div className="restDark__content">
            <p className="eyebrow eyebrow--light">{t("restaurante.experiencia.eyebrow")}</p>

            <h2>{t("restaurante.experiencia.title")}</h2>

            <p className="restDark__lead">{t("restaurante.experiencia.lead")}</p>

            <p>{t("restaurante.experiencia.p2")}</p>
          </div>
        </section>

        {/* ================= VENTAJAS HUÉSPEDES ================= */}
        <section className="section section--beige restCenter">
          <div className="restCenter__container">
            <p className="eyebrow">{t("restaurante.ventajas.eyebrow")}</p>
            <h2>{t("restaurante.ventajas.title")}</h2>

            <p className="restCenter__lead">{t("restaurante.ventajas.lead")}</p>

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

        {/* ================= CARTA ================= */}
        <section className="section section--white restCenter">
          <div className="restCenter__container">
            <p className="eyebrow">{t("restaurante.carta.eyebrow")}</p>
            <h2>{t("restaurante.carta.title")}</h2>

            <p className="restCenter__lead">{t("restaurante.carta.lead")}</p>

            <a
              className="restLink"
              href="https://docs.google.com/spreadsheets/d/1lL9lPbsDWwKE3LHYwamj8LwcEVSEZxYX/edit?usp=sharing&ouid=115921718176696134396&rtpof=true&sd=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("restaurante.carta.ctaAria")}
            >
              {t("restaurante.carta.linkText")} →
            </a>
          </div>
        </section>

        {/* ================= HORARIOS ================= */}
        <section className="section section--beige restCenter">
          <div className="restCenter__container">
            <p className="eyebrow">{t("restaurante.horarios.eyebrow")}</p>
            <h2>{t("restaurante.horarios.title")}</h2>

            <div className="restHours">
              <div className="restHours__col">
                <h3>{t("restaurante.horarios.week.title")}</h3>
                <p>{t("restaurante.horarios.week.time")}</p>
              </div>

              <div className="restHours__col">
                <h3>{t("restaurante.horarios.weekend.title")}</h3>
                <p>{t("restaurante.horarios.weekend.lunch")}</p>
                <p>{t("restaurante.horarios.weekend.dinner")}</p>
              </div>
            </div>

            <p className="restCenter__lead">{t("restaurante.horarios.note")}</p>

            {/* ✅ WhatsApp */}
            <a className="restCenter__btn" href={waLink(waText)} target="_blank" rel="noopener noreferrer">
              {t("restaurante.horarios.cta")}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}