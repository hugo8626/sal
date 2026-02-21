import "./Footer.css";
import { Link } from "react-router-dom";

import instagramIcon from "../../assets/images/logos/instagram.svg";
import whatsappIcon from "../../assets/images/logos/was.svg";

/* logo creador */
import creatorLogo from "../../assets/images/logos/instagram.svg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="footer__container">
        <div className="footer__grid">

          {/* ===============================
              BRAND
          =============================== */}
          <div className="footer__brand">
            <h3 className="footer__title">Taverna de la Sal</h3>

            <p className="footer__desc">
              Hotel boutique solo adultos en L&apos;Escala, Costa Brava.
              Seis habitaciones íntimas en un edificio del siglo XIX.
            </p>

            <div className="socials">
              <a
                href="https://www.instagram.com/tavernadelasal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="socials__link"
              >
                <img src={instagramIcon} alt="Instagram" className="socials__icon" />
              </a>

              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="socials__link"
              >
                <img src={whatsappIcon} alt="WhatsApp" className="socials__icon" />
              </a>
            </div>
          </div>

          {/* ===============================
              CONTACTO
          =============================== */}
          <div className="footer__col">
            <p className="footer__heading">CONTACTO</p>

            <ul className="footer__list">
              <li>L&apos;Escala, Girona</li>
              <li>
                <a className="footer__contactLink" href="tel:+34972776278">
                  +34 972 776 278
                </a>
              </li>
              <li>
                <a className="footer__contactLink" href="mailto:info@tavernadelasal.com">
                  info@tavernadelasal.com
                </a>
              </li>
            </ul>
          </div>

          {/* ===============================
              ENLACES
          =============================== */}
          <div className="footer__col">
            <p className="footer__heading">ENLACES</p>

            <ul className="footer__links">
              <li><Link to="/habitaciones">Habitaciones</Link></li>
              <li><Link to="/servicios">Servicios</Link></li>
              <li><Link to="/historia">Nuestra Historia</Link></li>
              <li><Link to="/entorno">Entorno</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__divider" />

        {/* ===============================
            BOTTOM
        =============================== */}
        <div className="footer__bottom">
          <p>© {year} Taverna de la Sal. Todos los derechos reservados.</p>

          <nav className="footer__legal">
            <Link to="/privacidad">Privacidad</Link>
            <Link to="/aviso-legal">Aviso legal</Link>
            <Link to="/cookies">Cookies</Link>
          </nav>
        </div>

        {/* ===============================
            FIRMA CREADOR WEB
        =============================== */}
        <div className="footer__creator">
          <a
            href="https://tuwebcreador.com"
            target="_blank"
            rel="noopener noreferrer"
            className="creator__link"
            aria-label="Web creada por"
          >
            <span className="creator__text">Fityxdigital</span>
            <img
              src={creatorLogo}
              alt="Nombre del creador"
              className="creator__logo"
            />
          </a>
        </div>

      </div>
    </footer>
  );
}