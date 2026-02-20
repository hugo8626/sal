import "./Footer.css";
import { Link } from "react-router-dom";

/* IMPORTAMOS LOS SVG */
import instagramIcon from "../../assets/images/logos/instagram.svg";
import whatsappIcon from "../../assets/images/logos/was.svg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="footer__container">
        <div className="footer__grid">

          {/* ===============================
              COL 1 — BRAND + SOCIALS
          ================================ */}
          <div className="footer__brand">
            <h3 className="footer__title">Taverna de la Sal</h3>

            <p className="footer__desc">
              Hotel boutique solo adultos en L&apos;Escala, Costa Brava.
              Seis habitaciones íntimas en un edificio del siglo XIX.
            </p>

            <div className="socials">

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/tavernadelasal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="socials__link"
              >
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  className="socials__icon"
                />
              </a>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="socials__link"
              >
                <img
                  src={whatsappIcon}
                  alt="WhatsApp"
                  className="socials__icon"
                />
              </a>

            </div>
          </div>

          {/* ===============================
              COL 2 — CONTACTO
          ================================ */}
          <div className="footer__col">
            <p className="footer__heading">CONTACTO</p>

            <ul className="footer__list">
              <li>L&apos;Escala, Girona</li>
              <li>
                <a href="tel:+34972776278">+34 972776278</a>
              </li>
              <li>
                <a href="mailto:info@tavernadelasal.com">
                  info@tavernadelasal.com
                </a>
              </li>
            </ul>
          </div>

          {/* ===============================
              COL 3 — ENLACES
          ================================ */}
          <div className="footer__col">
            <p className="footer__heading">ENLACES</p>

            <ul className="footer__links">
              <li><Link to="/habitaciones">Habitaciones</Link></li>
              <li><Link to="/restaurante">Servicios</Link></li>
              <li><Link to="/historia">Nuestra Historia</Link></li>
              <li><Link to="/entorno">Entorno</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p>© {year} Taverna de la Sal. Todos los derechos reservados.</p>

          <nav className="footer__legal">
            <Link to="/privacidad">Privacidad</Link>
            <Link to="/aviso-legal">Aviso legal</Link>
            <Link to="/cookies">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}