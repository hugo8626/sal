import "./Restaurante.css";

import heroImg from "../../assets/images/restaurante/axidosincopa.png"; // ✅ la tuya (cámbiala si quieres)
import brasaImg from "../../assets/images/restaurante/photo_2026-02-14_18-51-06.jpg"; // <- pon tu imagen
import marImg from "../../assets/images/restaurante/oxido.png";     // <- pon tu imagen

export default function Restaurante() {
  return (
    <main className="rest-page">
      {/* HERO */}
      <section className="rest-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="rest-hero__overlay" />
        <div className="container rest-hero__content">
          <p className="eyebrow eyebrow--light">RESTAURANTE</p>

          <h1 className="rest-hero__title">
            Carnes y pescados a la <br /> brasa frente al mar
          </h1>

          <p className="rest-hero__subtitle">
            Especialistas en carnes y pescados a la brasa, donde el producto de temporada y
            el entorno íntimo del casco antiguo de L’Escala crean una experiencia auténtica.
          </p>

          <div className="rest-hero__actions">
            <a className="btn btn--primary" href="/reservar">
              Quiero reservar mesa
            </a>
          </div>

          <p className="rest-hero__note">
            ✓ 10% de descuento para huéspedes del hotel que reservan directamente en nuestra web
          </p>
        </div>
      </section>

      {/* BLOQUE PEQUEÑO (texto + foto) */}
      <section className="section section--white">
        <div className="container rest-split rest-split--reverse">
          <div className="rest-split__body">
            <p className="eyebrow">LA PROPUESTA</p>
            <h2 className="title">La brasa como protagonista</h2>

            <p className="text">
              Trabajamos carnes seleccionadas y pescado fresco con recetas simples y producto
              de proximidad. Cocina honesta, sabores definidos y una carta pensada para disfrutar
              sin prisa.
            </p>

            <p className="text">
              Producto de temporada, vino DO Empordà y un entorno íntimo para disfrutar de la brasa.
            </p>
          </div>

          <figure className="rest-split__media">
            <img className="rest-split__img" src={brasaImg} alt="Brasa y producto" loading="lazy" />
          </figure>
        </div>
      </section>

      {/* FOTO ANCHA (mar) */}
      <section className="rest-wide">
        <img className="rest-wide__img" src={marImg} alt="Terraza con vistas al mar" loading="lazy" />
      </section>

      {/* BLOQUE TEXTO CENTRADO (como tu captura) */}
      <section className="section section--white">
        <div className="container rest-center">
          <p className="eyebrow">EL ENTORNO</p>
          <h2 className="title">Un restaurante junto al Mediterráneo</h2>

          <p className="text rest-center__text">
            Comedor interior acogedor y dos terrazas a pocos metros del mar.
            En verano, noches sin prisa y cócteles al atardecer.
          </p>

          <p className="text rest-center__text">
            Un espacio pensado para comer con calma, tanto si eres huésped como visitante.
          </p>

          <a className="rest-link" href="/carta">
            Quiero ver la carta →
          </a>
        </div>
      </section>

      {/* BLOQUE OSCURO */}
      <section className="rest-dark">
        <div className="container rest-dark__inner">
          <p className="eyebrow eyebrow--light">LA EXPERIENCIA</p>
          <h2 className="rest-dark__title">Más que un restaurante, una experiencia cercana</h2>

          <p className="rest-dark__text">
            El restaurante está dirigido y atendido por su propietario, creando un ambiente
            auténtico donde muchos de nuestros comensales regresan no solo por la cocina,
            sino por el trato.
          </p>

          <a className="btn btn--outline rest-dark__btn" href="/historia">
            Quiero vivir la experiencia
          </a>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="section section--beige">
        <div className="container rest-benefits">
          <p className="eyebrow">PARA HUÉSPEDES</p>
          <h2 className="title">Ventajas para nuestros huéspedes</h2>

          <p className="text rest-benefits__text">
            Si te alojas en Taverna de la Sal y reservas directamente:
          </p>

          <ul className="rest-benefits__list">
            <li>✓ 10% de descuento en el restaurante</li>
            <li>✓ Atención prioritaria en tu reserva</li>
            <li>✓ Recomendaciones personalizadas según temporada</li>
          </ul>

          <div className="rest-benefits__actions">
            <a className="btn btn--primary" href="/reservar">
              Quiero reservar atención con ventaja
            </a>
          </div>
        </div>
      </section>

      {/* CARTA */}
      <section className="section section--white">
        <div className="container rest-center">
          <p className="eyebrow">LA CARTA</p>
          <h2 className="title">Explora nuestra carta</h2>

          <p className="text rest-center__text">
            Descubre carnes y pescados a la brasa, propuestas de temporada y una cuidada selección de vinos locales.
          </p>

          <a className="rest-link" href="/carta">
            Descargar menú →
          </a>
        </div>
      </section>

      {/* PLANIFICA */}
      <section className="section section--beige">
        <div className="container rest-center">
          <p className="eyebrow">RESERVAS</p>
          <h2 className="title">Planifica tu visita</h2>

          <p className="text rest-center__text">
            Consulta nuestros horarios y planifica tu visita. El aforo es limitado, especialmente en temporada alta.
          </p>

          <a className="btn btn--primary" href="/reservar">
            Quiero reservar mesa ahora
          </a>
        </div>
      </section>
    </main>
  );
}