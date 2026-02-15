import "./Room.css";

import heroRooms from "../../assets/images/habitaciones/cami.png";
import introRooms from "../../assets/images/habitaciones/camabaño.png";

import img1 from "../../assets/images/habitaciones/camaesquina.png";
import img2 from "../../assets/images/habitaciones/sila.png";
import img3 from "../../assets/images/habitaciones/espejo.png";
import img4 from "../../assets/images/habitaciones/camatele.png";
import img5 from "../../assets/images/habitaciones/amenittis.png";
import img6 from "../../assets/images/habitaciones/cama.png";
import img7 from "../../assets/images/habitaciones/terraza.png";
import img8 from "../../assets/images/habitaciones/terraz.png";

import FaqItem from "../../components/FaqItem/FaqItem";

export default function Room() {
  return (
    <main className="roomsPage">
      {/* ================= HERO ================= */}
      <section
        className="roomsHero"
        style={{ backgroundImage: `url(${heroRooms})` }}
        aria-label="Habitaciones boutique en L'Escala"
      >
        {/* Capa oscura para mejorar legibilidad del texto */}
        <div className="roomsHero__overlay" />

        <div className="roomsHero__content">
          <h1 className="roomsHero__title">Habitaciones boutique en L&apos;Escala</h1>

          <p className="roomsHero__subtitle">
            Espacios luminosos y acogedores diseñados para el descanso real, en un hotel solo
            adultos junto al mar.
          </p>
        </div>

        {/* CTA principal */}
        <div className="roomsHero__ctaWrap">
          <a className="roomsHero__cta" href="/reservar">
            Reservar
          </a>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="roomsIntro">
        <div className="roomsIntro__container">
          <div className="roomsIntro__content">
            <p className="roomsIntro__lead">
              Seis habitaciones únicas con una superficie de entre 25 y 30 m² que representan nuestra
              forma de entender el descanso.
            </p>

            <ul className="roomsIntro__list">
              <li>Todas dobles matrimoniales</li>
              <li>Dos adaptables a triple gracias a un sofá cama</li>
              <li>Con balcón y vistas laterales al mar</li>
            </ul>

            <blockquote className="roomsIntro__quote">
              “Un refugio mediterráneo pensado para disfrutar intimidad, calma y confort en la Costa
              Brava.”
            </blockquote>
          </div>

          <div className="roomsIntro__media">
            <img
              src={introRooms}
              alt="Arquitectura y diseño del hotel"
              className="roomsIntro__img"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="roomsFeatures">
        <div className="roomsFeatures__container">
          <article className="featureItem">
            <div className="featureItem__icon">🛏</div>
            <h3 className="featureItem__title">Confort</h3>
            <ul className="featureItem__list">
              <li>Superficie entre 25 y 30 m²</li>
              <li>Cama king-size (2,00 × 1,80 m)</li>
              <li>Aire acondicionado y calefacción</li>
            </ul>
          </article>

          <article className="featureItem">
            <div className="featureItem__icon">🚿</div>
            <h3 className="featureItem__title">Baño y cuidado</h3>
            <ul className="featureItem__list">
              <li>Ducha tipo walk-in</li>
              <li>Amenities seleccionadas</li>
              <li>Secador de pelo</li>
            </ul>
          </article>

          <article className="featureItem">
            <div className="featureItem__icon">☕</div>
            <h3 className="featureItem__title">Detalles que marcan la diferencia</h3>
            <ul className="featureItem__list">
              <li>Hervidor con selección de café y té</li>
              <li>Mini nevera</li>
              <li>Caja fuerte</li>
            </ul>
          </article>

          <article className="featureItem">
            <div className="featureItem__icon">📺</div>
            <h3 className="featureItem__title">Tecnología y conexión</h3>
            <ul className="featureItem__list">
              <li>TV pantalla plana</li>
              <li>Canales nacionales e internacionales</li>
              <li>Wi-Fi de alta velocidad gratuito</li>
            </ul>
          </article>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="roomsGallery">
        <div className="roomsGallery__container">
          <header className="roomsGallery__header">
            <h2 className="roomsGallery__title">Cada detalle, elegido con intención.</h2>
            <p className="roomsGallery__subtitle">
              Un recorrido visual por espacios donde diseño, confort y calma se encuentran.
            </p>
          </header>

          {/* Grid fijo: 8 imágenes = 8 celdas, SIN Array.from */}
          <div className="roomsGallery__grid">
            <figure className="gItem">
              <img src={img1} alt="Detalle de la habitación 1" loading="lazy" />
            </figure>

            <figure className="gItem">
              <img src={img2} alt="Detalle de la habitación 2" loading="lazy" />
            </figure>

            <figure className="gItem">
              <img src={img3} alt="Detalle de la habitación 3" loading="lazy" />
            </figure>

            <figure className="gItem">
              <img src={img4} alt="Detalle de la habitación 4" loading="lazy" />
            </figure>

            <figure className="gItem">
              <img src={img5} alt="Detalle de la habitación 5" loading="lazy" />
            </figure>

            <figure className="gItem">
              <img src={img6} alt="Detalle de la habitación 6" loading="lazy" />
            </figure>

            <figure className="gItem">
              <img src={img7} alt="Detalle de la habitación 7" loading="lazy" />
            </figure>

            <figure className="gItem">
              <img src={img8} alt="Detalle de la habitación 8" loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      {/* ================= RESERVE STRIP ================= */}
      <section className="roomsFinal">
        <div className="roomsFinal__container">
          <h2 className="roomsFinal__title">
            Solo seis habitaciones garantizan un ambiente tranquilo y exclusivo durante todo el año.
          </h2>

          <a href="/reservar" className="roomsFinal__btn">
            QUIERO RESERVAR
          </a>
        </div>
      </section>

      {/* ================= SERVICES LINK ================= */}
      <section className="roomsServices">
        <div className="roomsServices__container">
          <p className="roomsServices__text">
            Además de tu habitación, podrás disfrutar de nuestra terraza y restaurante junto al mar.
          </p>

          <a href="/restaurante" className="roomsServices__link">
            Descubre nuestros servicios <span className="roomsServices__arrow">→</span>
          </a>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="roomsFaq">
        <div className="roomsFaq__container">
          <h2 className="roomsFaq__title">Preguntas frecuentes</h2>

          <div className="roomsFaq__list">
            <FaqItem
              q="¿Todas las habitaciones tienen el mismo precio?"
              a="No, el precio varía en función del diseño, la orientación y la temporada. Cada habitación tiene una personalidad propia. Al realizar la reserva, podrás consultar la tarifa actualizada para las fechas que te interesen."
              defaultOpen
            />
            <FaqItem
              q="¿Todas tienen balcón y vistas al mar?"
              a="Todas las habitaciones disponen de balcón privado con vistas laterales al mar. Aunque no son vistas frontales directas, desde cada balcón se percibe la presencia del Mediterráneo y la brisa marina."
            />
            <FaqItem
              q="¿Son dobles? ¿Se puede añadir cama?"
              a="Todas las habitaciones son dobles matrimoniales con cama king-size. Dos de ellas disponen de un sofá cama que permite alojar a una tercera persona adulta, previa solicitud al hacer la reserva."
            />
            <FaqItem
              q="¿Se puede solicitar una habitación concreta?"
              a="Sí, puedes indicarnos tu preferencia al hacer la reserva. Haremos lo posible por asignarte la habitación deseada, aunque no podemos garantizarlo en todos los casos ya que depende de la disponibilidad."
            />
            <FaqItem
              q="¿Qué tamaño tienen las habitaciones?"
              a="Las habitaciones tienen una superficie de entre 25 y 30 m², lo que proporciona un espacio amplio y cómodo para disfrutar de tu estancia con total confort."
            />
            <FaqItem
              q="¿Cuál es la política de cancelación?"
              a="Ofrecemos cancelación gratuita hasta 48 horas antes de la fecha de llegada. Para cancelaciones posteriores o no presentación, se aplicará el cargo de la primera noche. Consulta las condiciones completas durante el proceso de reserva."
            />
          </div>
        </div>
      </section>

      {/* ================= FINAL BIG CTA ================= */}
      <section className="roomsBigCta">
        <div className="roomsBigCta__container">
          <h2 className="roomsBigCta__title">Tu descanso empieza aquí.</h2>

          <a className="roomsBigCta__btn" href="/reservar">
            QUIERO COMPROBAR DISPONIBILIDAD
          </a>
        </div>
      </section>
    </main>
  );
}