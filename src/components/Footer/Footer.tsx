import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Col 1 */}
          <div className="footer__brand">
            <h3 className="footer__title">Taverna de la Sal</h3>
            <p className="footer__desc">
              Hotel boutique solo adultos en L&apos;Escala, Costa Brava. Seis habitaciones íntimas
              en un edificio del siglo XIX.
            </p>
          </div>

          {/* Col 2 */}
          <div className="footer__col">
            <p className="footer__heading">CONTACTO</p>

            <ul className="footer__list">
              <li className="footer__item">
                <span className="footer__icon" aria-hidden="true">
                  📍
                </span>
                <span>L&apos;Escala, Girona</span>
              </li>

              <li className="footer__item">
                <span className="footer__icon" aria-hidden="true">
                  📞
                </span>
                <a className="footer__contactLink" href="tel:+34972000000">
                  +34 972 000 000
                </a>
              </li>

              <li className="footer__item">
                <span className="footer__icon" aria-hidden="true">
                  ✉
                </span>
                <a className="footer__contactLink" href="mailto:info@tavernadelasal.com">
                  info@tavernadelasal.com
                </a>
              </li>
            </ul>
          </div>

      
          <div className="footer__col">
            <p className="footer__heading">ENLACES</p>

            <ul className="footer__links">
              <li>
                <Link to="/habitaciones">Habitaciones</Link>
              </li>
              <li>
                <Link to="/restaurante">Servicios</Link>
              </li>
              <li>
                <Link to="/historia">Nuestra Historia</Link>
              </li>
              <li>
                <Link to="/entorno">Entorno</Link>
              </li>

              <li>
                <Link to="/contacto">Contacto</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} Taverna de la Sal. Todos los derechos reservados.
          </p>

          <nav className="footer__legal" aria-label="Enlaces legales">
            <Link to="/privacidad">Política de privacidad</Link>
            <Link to="/aviso-legal">Aviso legal</Link>
            <Link to="/cookies">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}