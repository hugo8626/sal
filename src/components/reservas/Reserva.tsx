import "./Reservas.css";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo/SEO";

const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

function getLangFromPath(pathname: string): SupportedLang {
  const first = pathname.split("/")[1];
  return (SUPPORTED as readonly string[]).includes(first) ? (first as SupportedLang) : "es";
}

export default function Reservas() {
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);

  return (
    <>
      <SEO
        title={
          lang === "en"
            ? "Booking | Taverna de la Sal"
            : lang === "fr"
              ? "Réservation | Taverna de la Sal"
              : lang === "ca"
                ? "Reserves | Taverna de la Sal"
                : "Reservas | Taverna de la Sal"
        }
        description={
          lang === "en"
            ? "Book your stay at Taverna de la Sal. Choose dates and preferences and we’ll confirm availability."
            : lang === "fr"
              ? "Réservez votre séjour à Taverna de la Sal. Choisissez vos dates et préférences, disponibilité confirmée."
              : lang === "ca"
                ? "Reserva la teva estada a Taverna de la Sal. Tria dates i preferències i confirmem disponibilitat."
                : "Reserva tu estancia en Taverna de la Sal. Selecciona fechas y preferencias y confirmamos disponibilidad."
        }
      />

      <main className="bookingPage">
        {/* HERO */}
        <section className="bookingHero">
          <div className="container bookingHero__content">
            <p className="eyebrow">RESERVAS</p>
            <h1 className="bookingHero__title">Reserva tu habitación</h1>
            <p className="bookingHero__lead">
              Selecciona tus fechas y preferencias. Confirmamos disponibilidad al instante.
            </p>
          </div>
        </section>

        {/* BODY */}
        <section className="section section--white">
          <div className="container bookingLayout">
            {/* FORM */}
            <form className="bookingForm" onSubmit={(e) => e.preventDefault()}>
              <h2 className="bookingForm__title">Detalles de la estancia</h2>

              <div className="bookingGrid">
                <div className="field">
                  <label htmlFor="checkin">Fecha de llegada</label>
                  <input id="checkin" type="date" />
                </div>

                <div className="field">
                  <label htmlFor="checkout">Fecha de salida</label>
                  <input id="checkout" type="date" />
                </div>

                <div className="field">
                  <label htmlFor="adults">Adultos</label>
                  <select id="adults" defaultValue="1">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="kids">Niños</label>
                  <select id="kids" defaultValue="0">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="room">Tipo de habitación</label>
                <select id="room" defaultValue="doble-med">
                  <option value="doble-med">Doble Mediterránea</option>
                  <option value="doble-sup">Doble Superior</option>
                  <option value="doble-tran">Doble Tranquila</option>
                </select>
              </div>

              {/* PARKING */}
              <div className="field field--checkbox">
                <label className="checkRow">
                  <input className="checkRow__input" type="checkbox" />
                  <span className="checkRow__box" aria-hidden="true"></span>

                  <span className="checkRow__text">
                    <span className="checkRow__title">Añadir plaza de parking</span>
                    <span className="checkRow__meta">+15€ / noche · Plaza garantizada</span>
                  </span>
                </label>
              </div>

              <div className="field">
                <label htmlFor="name">Nombre completo</label>
                <input id="name" type="text" placeholder="Tu nombre" />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="correo@email.com" />
              </div>

              <div className="field">
                <label htmlFor="message">Mensaje (opcional)</label>
                <textarea id="message" rows={4} placeholder="Alguna petición especial..." />
              </div>

              <button className="bookingBtn" type="submit">
                Comprobar disponibilidad
              </button>
            </form>

            {/* SUMMARY */}
            <aside className="bookingSummary">
              <h3 className="bookingSummary__title">Tu estancia</h3>

              <ul className="bookingSummary__list">
                <li>Cancelación flexible</li>
                <li>Mejor precio garantizado</li>
                <li>Pago seguro</li>
                <li>Atención personalizada</li>
              </ul>

              <div className="bookingSummary__box">
                <p className="bookingSummary__note">¿Prefieres reservar por teléfono?</p>
                <p className="bookingSummary__phone">+34 972 000 000</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}