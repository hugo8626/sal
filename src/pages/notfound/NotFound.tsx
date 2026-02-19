import { Link } from "react-router-dom";
import "./NotFound.css";
import { BOOKING_URL } from "../../config/links";
export default function NotFound() {
  return (
    <main className="notFound page">
      <section className="notFound__wrap">
        <p className="notFound__kicker">404</p>
        <h1 className="notFound__title">Página no encontrada</h1>
        <p className="notFound__text">
          La dirección a la que has entrado no existe o se ha movido.
        </p>

        <div className="notFound__actions">
          <Link className="btn btn--primary" to="/">
            Volver al inicio
          </Link>
         <a
            className="btn btn--outline"
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Reservar
          </a>
        </div>
      </section>
    </main>
  );
}