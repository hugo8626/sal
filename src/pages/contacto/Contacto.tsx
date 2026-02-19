import "./contacto.css";
import { useTranslation } from "react-i18next";
import { BOOKING_URL } from "../../config/links";

import heroContact from "../../assets/images/espacios/sala.jpg";
import ctaImg from "../../assets/images/espacios/sala.jpg";

import SEO from "../../components/seo/SEO";

export default function Contacto() {
  const { t } = useTranslation();

  return (
    <>
      {/* ✅ SEO Contacto */}
      <SEO
        title={t("contact.seo.title", { defaultValue: "Contacto | Taverna de la Sal" })}
        description={t("contact.seo.description", {
          defaultValue:
            "Contacta con Taverna de la Sal en L'Escala. Dirección, teléfono, email y mapa para llegar fácilmente.",
        })}
        image={heroContact}
      />

      <main className="contactPage">
        {/* ================= HERO ================= */}
        <section
          className="contactHero"
          style={{ backgroundImage: `url(${heroContact})` }}
          aria-label={t("contact.hero.aria", { defaultValue: "Contacto" })}
        >
          <div className="contactHero__overlay" />

          <div className="contactHero__content">
            <h1 className="contactHero__title">
              {t("contact.hero.title.line1")}
              <br />
              {t("contact.hero.title.line2")}
            </h1>

            <p className="contactHero__subtitle">{t("contact.hero.subtitle")}</p>
          </div>
        </section>

        {/* ================= CARDS ================= */}
        <section className="contactCards" aria-label={t("contact.cards.aria", { defaultValue: "Contacto" })}>
          <div className="contactWrap">
            <div className="contactCards__grid">
              {/* Dirección */}
              <article className="contactCard">
                <div className="contactCard__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21s7-4.35 7-11A7 7 0 1 0 5 10c0 6.65 7 11 7 11Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>

                <h3 className="contactCard__title">{t("contact.cards.address.title")}</h3>

                <p className="contactCard__text">
                  {t("contact.cards.address.line1")}
                  <br />
                  {t("contact.cards.address.line2")}
                </p>

                <a
                  className="contactCard__btn"
                  href={t("contact.cards.address.mapsUrl")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("contact.cards.address.mapsAria", {
                    defaultValue: "Abrir mapa en una nueva pestaña",
                  })}
                >
                  {t("contact.cards.address.mapsCta")}
                </a>
              </article>

              {/* Email */}
              <article className="contactCard">
                <div className="contactCard__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" />
                    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </div>

                <h3 className="contactCard__title">{t("contact.cards.email.title")}</h3>

                <a className="contactCard__link" href={t("contact.cards.email.mailto")}>
                  {t("contact.cards.email.value")}
                </a>

                <p className="contactCard__hint">{t("contact.cards.email.hint")}</p>
              </article>

              {/* Teléfono */}
              <article className="contactCard">
                <div className="contactCard__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 4h3l1 5-2 1c1 3 3 5 6 6l1-2 5 1v3c0 1-1 2-2 2-9 0-16-7-16-16 0-1 1-2 2-2Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>

                <h3 className="contactCard__title">{t("contact.cards.phone.title")}</h3>

                <a className="contactCard__link" href={t("contact.cards.phone.tel")}>
                  {t("contact.cards.phone.value")}
                </a>

                <p className="contactCard__hint">{t("contact.cards.phone.hint")}</p>
              </article>
            </div>
          </div>
        </section>

        {/* ================= FORM ================= */}
        <section className="contactForm" aria-label={t("contact.form.aria", { defaultValue: "Formulario de contacto" })}>
          <div className="contactWrap contactWrap--narrow">
            <h2 className="contactSection__title">{t("contact.form.title")}</h2>
            <p className="contactSection__subtitle">{t("contact.form.subtitle")}</p>

            <form
              className="formCard"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="formGrid">
                <div className="field">
                  <label className="label" htmlFor="name">
                    {t("contact.form.fields.name.label")}
                  </label>
                  <input
                    id="name"
                    className="input"
                    placeholder={t("contact.form.fields.name.placeholder")}
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="field">
                  <label className="label" htmlFor="email">
                    {t("contact.form.fields.email.label")}
                  </label>
                  <input
                    id="email"
                    className="input"
                    type="email"
                    placeholder={t("contact.form.fields.email.placeholder")}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="field field--full">
                  <label className="label" htmlFor="subject">
                    {t("contact.form.fields.subject.label")}
                  </label>
                  <input
                    id="subject"
                    className="input"
                    placeholder={t("contact.form.fields.subject.placeholder")}
                    required
                  />
                </div>

                <div className="field field--full">
                  <label className="label" htmlFor="message">
                    {t("contact.form.fields.message.label")}{" "}
                    <span className="label__muted">{t("contact.form.fields.message.optional")}</span>
                  </label>
                  <textarea
                    id="message"
                    className="textarea"
                    placeholder={t("contact.form.fields.message.placeholder")}
                    rows={6}
                  />
                </div>
              </div>

              <button className="submitBtn" type="submit">
                <span className="submitBtn__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 11.5 21 3l-8.5 18-2.5-7-7-2.5Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path d="M21 3 10 14" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </span>
                {t("contact.form.submit")}
              </button>
            </form>
          </div>
        </section>

        {/* ================= MAP ================= */}
        <section className="contactMap" aria-label={t("contact.map.aria", { defaultValue: "Mapa" })}>
          <div className="contactWrap">
            <h2 className="contactSection__title">{t("contact.map.title")}</h2>
            <p className="contactSection__subtitle">{t("contact.map.subtitle")}</p>

            <div className="mapFrame">
              <iframe
                title={t("contact.map.iframeTitle", { defaultValue: "Mapa de ubicación" })}
                src={t("contact.map.iframeSrc")}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* ================= CTA FINAL ================= */}
        <section
          className="contactCta"
          style={{ backgroundImage: `url(${ctaImg})` }}
          aria-label={t("contact.cta.aria", { defaultValue: "Reservar" })}
        >
          <div className="contactCta__overlay" />
          <div className="contactCta__content">
            <h2 className="contactCta__title">
              {t("contact.cta.title.line1")}
              <br />
              {t("contact.cta.title.line2")}
              <br />
              {t("contact.cta.title.line3")}
            </h2>

            <a
              className="contactCta__btn"
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("contact.cta.aria", { defaultValue: "Reservar" })}
            >
              {t("contact.cta.button")}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}