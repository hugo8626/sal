import "./contacto.css";
import heroContact from "../../assets/images/espacios/sala.jpg"; // <-- pon tu imagen real

export default function Contact() {
  return (
    <main className="contactPage">
      {/* ================= HERO ================= */}
      <section
        className="contactHero"
        style={{ backgroundImage: `url(${heroContact})` }}
        aria-label="Contacto Taverna de la Sal"
      >
        <div className="contactHero__overlay" />

        <div className="contactHero__content">
          <h1 className="contactHero__title">
            Contacta con Taverna de
            <br />
            la Sal
          </h1>

          <p className="contactHero__subtitle">
            Estamos aquí para ayudarte a planificar una estancia tranquila, cuidada y sin
            preocupaciones en L&apos;Escala.
          </p>
        </div>
      </section>

      {/* ================= CARDS ================= */}
      <section className="contactCards" aria-label="Datos de contacto">
        <div className="contactWrap">
          <div className="contactCards__grid">
            {/* Dirección */}
            <article className="contactCard">
              <div className="contactCard__icon" aria-hidden="true">
                {/* pin */}
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

              <h3 className="contactCard__title">Dirección</h3>
              <h3 className="contactCard__title">Dirección</h3>


              <p className="contactCard__text">
                Carrer Santa Màxima, 7
                <br />
                17130 L&apos;Escala, Girona, Spain
              </p>

              <a
                className="contactCard__btn"
                href="https://www.google.com/maps/search/?api=1&query=Carrer%20Santa%20M%C3%A0xima%207%2017130%20L%27Escala"
                target="_blank"
                rel="noreferrer"
              >
                VER EN GOOGLE MAPS
              </a>
            </article>

            {/* Email */}
            <article className="contactCard">
              <div className="contactCard__icon" aria-hidden="true">
                {/* mail */}
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6h16v12H4V6Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="m4 7 8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>

              <h3 className="contactCard__title">Email</h3>

              <a className="contactCard__link" href="mailto:info@tavernadelasal.com">
                info@tavernadelasal.com
              </a>

              <p className="contactCard__hint">Respondemos en menos de 24h.</p>
            </article>

            {/* Teléfono */}
            <article className="contactCard">
              <div className="contactCard__icon" aria-hidden="true">
                {/* phone */}
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 4h3l1 5-2 1c1 3 3 5 6 6l1-2 5 1v3c0 1-1 2-2 2-9 0-16-7-16-16 0-1 1-2 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>

              <h3 className="contactCard__title">Teléfono</h3>

              <a className="contactCard__link" href="tel:+34972776278">
                +34 972 776 278
              </a>

              <p className="contactCard__hint">Atención personalizada.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ================= FORM ================= */}
      <section className="contactForm" aria-label="Formulario de contacto">
        <div className="contactWrap contactWrap--narrow">
          <h2 className="contactSection__title">Envíanos un mensaje</h2>
          <p className="contactSection__subtitle">
            Para reservas, peticiones especiales o cualquier consulta, estaremos encantados de ayudarte.
          </p>

          <form className="formCard">
            <div className="formGrid">
              <div className="field">
                <label className="label" htmlFor="name">
                  SU NOMBRE *
                </label>
                <input id="name" className="input" placeholder="Nombre completo" required />
              </div>

              <div className="field">
                <label className="label" htmlFor="email">
                  TU CORREO ELECTRÓNICO *
                </label>
                <input
                  id="email"
                  className="input"
                  type="email"
                  placeholder="email@ejemplo.com"
                  required
                />
              </div>

              <div className="field field--full">
                <label className="label" htmlFor="subject">
                  ASUNTO *
                </label>
                <input id="subject" className="input" placeholder="Motivo de contacto" required />
              </div>

              <div className="field field--full">
                <label className="label" htmlFor="message">
                  SU MENSAJE <span className="label__muted">(opcional)</span>
                </label>
                <textarea
                  id="message"
                  className="textarea"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  rows={6}
                />
              </div>
            </div>

            <button className="submitBtn" type="submit">
              <span className="submitBtn__icon" aria-hidden="true">
                {/* paper plane */}
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 11.5 21 3l-8.5 18-2.5-7-7-2.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 3 10 14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              ENVIAR MENSAJE
            </button>
          </form>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="contactMap" aria-label="Ubicación">
        <div className="contactWrap">
          <h2 className="contactSection__title">Dónde estamos</h2>
          <p className="contactSection__subtitle">
            En pleno casco antiguo de L&apos;Escala, a pocos pasos del mar.
          </p>

          <div className="mapFrame">
            <iframe
              title="Mapa Taverna de la Sal"
              src="https://www.google.com/maps?q=Carrer%20Santa%20M%C3%A0xima%207%2017130%20L%27Escala&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}