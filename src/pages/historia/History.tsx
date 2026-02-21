import "./History.css";
import { useTranslation } from "react-i18next";

import { BOOKING_URL } from "../../config/links"; 
import heroImg from "../../assets/images/espacios/sala.jpg";
import pareja from "../../assets/images/espacios/pareja.jpg";
import taverna from "../../assets/images/pueblo/taverna.jpg";

import SEO from "../../components/seo/SEO";



export default function History() {
  const { t } = useTranslation();
  

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
            <div className="historyHero__content">
              <h1 className="hero__title historyHero__title">{t("history.hero.title")}</h1>
              <p className="hero__subtitle historyHero__subtitle">{t("history.hero.subtitle")}</p>

              <a
                className="btn btn--primary"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("history.hero.cta")}
              </a>
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
              <p className=" historyKicker">{t("history.block1.kicker")}</p>

              <p className="text">{t("history.block1.p1")}</p>
              <p className="text">{t("history.block1.p2")}</p>

              <blockquote className="historyQuote">
                <p >
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
              <h2 className="title historyCenter__title">{t("history.block2.title")}</h2>

              <p className="text">{t("history.block2.p1")}</p>
              <p className="text">{t("history.block2.p2")}</p>
              <p className="text">{t("history.block2.p3")}</p>
              <p className="text">{t("history.block2.p4")}</p>
            </div>
          </div>
        </section>

        {/* ================= FILOSOFÍA ================= */}
        <section className="section section--white">
          <div className="container philosophy">
            <h2 className="title philosophy__title">{t("history.philosophy.title")}</h2>

            <div className="philosophy__lines">
              <p className="text">{t("history.philosophy.p1")}</p>
              <p className="text">{t("history.philosophy.p2")}</p>
            </div>
          </div>
        </section>

        {/* ================= CTA FINAL ================= */}
        <section className="section section--beige">
          <div className="container historyCTA">
            <p className="text historyCTA__text">
              {t("history.final.textLine1")}
              <br />
              {t("history.final.textLine2")}
            </p>

           

            <a
               className="btn btn--primary"
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("history.final.cta")}
              </a>
          </div>
        </section>
      </main>
    </>
  );
}