import "./History.css";

import heroImg from "../../assets/images/espacios/sala.jpg"; // <-- pon tu imagen
import pareja from "../../assets/images/espacios/pareja.jpg"; // <-- edificio/fachada
import taverna from "../../assets/images/pueblo/taverna.jpg"; // <-- edificio/fachada

export default function History() {
  return (
    <main className="page">
      {/* HERO */}
      <section className="historyHero">
        <div className="historyHero__bg" style={{ backgroundImage: `url(${heroImg})` }}>
          <div className="historyHero__overlay" />
          <div className="container historyHero__content">
            <h1 className="historyHero__title">Dos mares, una misma forma de cuidar</h1>
            <p className="historyHero__subtitle">
              Una historia que une Nueva Zelanda y el Mediterráneo a través de la
              hospitalidad genuina.
            </p>

            <a className="btn btn--outline historyHero__btn" href="/reservar">
              Quiero vivir la experiencia
            </a>
          </div>
        </div>
      </section>

      {/* BLOQUE 1 (foto izq + texto der) */}
      <section className="section section--white">
        <div className="container historyBlock historyBlock--top">
          <figure className="historyBlock__media">
            <img className="historyBlock__img" src={pareja} alt="Los anfitriones" loading="lazy" />
          </figure>

          <div className="historyBlock__body">
            <p className="historyKicker">Taverna de la Sal no nació como un proyecto empresarial.</p>
            <p>
              Nació como una manera de vivir. Matthew llegó desde Nueva Zelanda con una idea muy
              clara: la hospitalidad no es un servicio, es una forma de estar presente.
              Durante años ha trabajado en el mundo de la hostelería y aprendió que los detalles
              silenciosos son los que realmente se recuerdan.
            </p>
            <p>
              Marina creció en L’Escala. Conoce el ritmo del mar, el carácter del pueblo y esa
              forma mediterránea de cuidar que mezcla cercanía y calma.
            </p>

            <blockquote className="historyQuote">
              <p>
                Dos mares distintos.<br />
                Dos culturas.<br />
                Una misma manera de entender el cuidado genuino.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* BLOQUE 2 (imagen arriba + texto centrado debajo) */}
      <section className="section section--beige">
        <div className="container historyCenter">
          <figure className="historyCenter__media">
            <img className="historyCenter__img" src={taverna} alt="Fachada del edificio" loading="lazy" />
          </figure>

          <div className="historyCenter__text">
            <h2 className="historyCenter__title">Un edificio que ya tenía historia</h2>
            <p>
              El edificio que hoy es Taverna de la Sal nació en el siglo XIX. Durante décadas
              estuvo ligado al mar y a la sal. Primero fue refugio para pescadores, después
              lugar de bienvenida a los primeros viajeros que descubrieron la Costa Brava.
            </p>
            <p>
              Con el tiempo, el proyecto creció. Decidimos restaurar el edificio respetando su
              esencia y transformarlo en un hotel boutique solo adultos.
            </p>
            <p>
              No queríamos crear un hotel más, sino un espacio íntimo donde cada estancia se
              sintiera personal.
            </p>
            <p>
              Hoy, Taverna de la Sal es el resultado de una unión: tradición y mirada
              contemporánea, raíces y mundo, mar y hospitalidad.
            </p>
          </div>
        </div>
      </section>

      {/* FILOSOFÍA */}
      <section className="section section--white">
        <div className="container philosophy">
          <h2 className="philosophy__title">Nuestra filosofía</h2>

          <div className="philosophy__lines">
            <p>Para nosotros, la hospitalidad no es un servicio.</p>
            <p>Es una forma de cuidar.</p>
            <p>Creemos en los hoteles pequeños.</p>
            <p>En las conversaciones sinceras.</p>
            <p>En el detalle que no se anuncia, pero se siente.</p>
            <p>Creemos que viajar no es acumular lugares,</p>
            <p>sino recordar cómo te hicieron sentir.</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section section--beige">
        <div className="container historyCTA">
          <p className="historyCTA__text">
            Si decides alojarte con nosotros, no solo reservas una habitación.
            <br />
            Formas parte de una historia que empezó mucho antes de tu llegada.
          </p>

          <a className="btn btn--primary" href="/reservar">
            Quiero vivir la experiencia
          </a>
        </div>
      </section>
    </main>
  );
}