import "./Area.css";

import heroImg from "../../assets/images/pueblo/bonitcala.jpg";
import antigua from "../../assets/images/pueblo/anchoabn.jpg";
import casco from "../../assets/images/pueblo/iglesia.jpg";
import alfoli from "../../assets/images/pueblo/alfolisal.jpg";
import ruinas from "../../assets/images/pueblo/ruinas.jpg";
import museo from "../../assets/images/pueblo/museo.jpg";
import banerplaya from "../../assets/images/pueblo/rocaplaya.jpg";
import emporda from "../../assets/images/pueblo/emporda.jpg";
// import montgo from "../../assets/images/pueblo/montgo.jpg";
import kayak from "../../assets/images/pueblo/kayak.jpg";
import barcos from "../../assets/images/pueblo/barcos.avif";
import pescado from "../../assets/images/pueblo/pescado.jpg";

export default function Area() {
  return (
    <main className="areaPage">
      {/* HERO (mantengo tu estructura) */}
      <section
        className="areaHero"
        style={{ backgroundImage: `url(${heroImg})` }}
        aria-label="Entorno y actividades en L'Escala"
      >
        <div className="areaHero__overlay" />
        <div className="areaHero__content">
          <h1>
            Explora L&apos;Escala y la Costa <br /> Brava
          </h1>
          <p>Naturaleza, historia y mar a pocos pasos del hotel.</p>
        </div>
      </section>

      {/* INTRO (✅ coherencia: sección blanca + padding global) */}
      <section className="section section--white areaIntro">
        <div className="areaIntro__container">
          <div className="areaIntro__media">
            <img src={antigua} alt="Detalle de la tradición marinera en L'Escala" loading="lazy" />
          </div>

          <div className="areaIntro__content">
            <h2>Historia, cultura y gastronomía frente al Mediterráneo</h2>

            <p className="areaIntro__lead">
              Un destino donde el mar no solo se contempla, también se recuerda.
            </p>

            <div className="areaIntro__text">
              <p>
                L&apos;Escala es mucho más que un pueblo costero. Su historia está profundamente
                ligada al Mediterráneo, al comercio de la sal y a las antiguas civilizaciones que
                habitaron esta costa.
              </p>

              <p>
                A pocos minutos del hotel encontrarás uno de los tesoros arqueológicos más
                importantes de España: las Ruinas de Empúries, el único enclave donde convivieron
                ciudades griega y romana junto al mar.
              </p>

              <p>
                El casco antiguo conserva la esencia marinera, con calles estrechas, fachadas de
                piedra y pequeñas plazas donde el tiempo parece detenerse.
              </p>

              <p>
                Museos, tradiciones pesqueras y una cultura gastronómica basada en el producto local
                convierten cada paseo en una experiencia auténtica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ARQUEOLOGÍA (✅ alterno a beige como tu Home) */}
      <section className="section section--beige areaPlaces">
        <div className="areaPlaces__container">
          <div className="areaPlaces__header">
            <h2>Arqueología y patrimonio</h2>
            <p>Vestigios de civilizaciones milenarias al alcance de la mano.</p>
          </div>

          <div className="areaPlaces__grid">
            <article className="placeCard">
              <img src={ruinas} alt="Ruinas de Empúries" loading="lazy" />
              <div className="placeCard__body">
                <h3>
                  Ruinas de Empúries <span>2 km</span>
                </h3>
                <p>Templos, mosaicos y restos arqueológicos con vistas al Mediterráneo.</p>
              </div>
            </article>

            <article className="placeCard">
              <img src={casco} alt="Casco antiguo de L'Escala" loading="lazy" />
              <div className="placeCard__body">
                <h3>Casco Antiguo de L&apos;Escala</h3>
                <p>Calles empedradas, tiendas locales y esencia marinera auténtica.</p>
              </div>
            </article>

            <article className="placeCard">
              <img src={alfoli} alt="Alfolí de la Sal" loading="lazy" />
              <div className="placeCard__body">
                <h3>Alfolí de la Sal</h3>
                <p>Antiguo almacén del siglo XVIII que narra la historia comercial del pueblo.</p>
              </div>
            </article>

            <article className="placeCard">
              <img src={museo} alt="Museo de la Anchoa y la Sal" loading="lazy" />
              <div className="placeCard__body">
                <h3>Museo de la Anchoa y la Sal</h3>
                <p>Descubre el legado pesquero que dio fama internacional a L&apos;Escala.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* BANNER (lo dejo tal cual) */}
      <section
        className="areaBanner"
        style={{ backgroundImage: `url(${banerplaya})` }}
        aria-label="El Mediterráneo cerca del hotel"
      >
        <div className="areaBanner__overlay" />
        <div className="areaBanner__content">
          <h2>El Mediterráneo, a solo unos pasos</h2>
        </div>
      </section>

      {/* PLAYAS (✅ blanco) */}
      <section className="section section--white areaBeaches">
        <div className="areaBeaches__container">
          <p className="areaBeaches__intro">
            Desde el hotel puedes salir caminando y estar frente al mar en segundos.
          </p>

          <div className="areaBeaches__grid">
            <article className="beachItem">
              <h3>
                Platja de les Barques <span>20 m</span>
              </h3>
              <p>Pequeña playa frente al hotel. Ideal para un baño temprano.</p>
            </article>

            <article className="beachItem">
              <h3>Port d&apos;en Perris</h3>
              <p>Cala rocosa en el casco antiguo, aguas claras y entorno íntimo.</p>
            </article>

            <article className="beachItem">
              <h3>Playas de Empúries</h3>
              <p>Arena fina junto a las ruinas grecorromanas.</p>
            </article>

            <article className="beachItem">
              <h3>Cala Montgó</h3>
              <p>Bahía protegida de aguas turquesa rodeada de naturaleza.</p>
            </article>
          </div>
        </div>
      </section>

      {/* NATURALEZA (✅ beige) */}
      <section className="section section--beige areaNature">
        <div className="areaNature__container">
          <div className="areaNature__media">
            <img src={emporda} alt="Paisajes del Empordà" loading="lazy" />
          </div>

          <div className="areaNature__content">
            <h2>Paisajes abiertos, aire puro y silencio</h2>
            <p>El Empordà es un territorio de contrastes: mar, acantilados y humedales.</p>
          </div>
        </div>
      </section>

      {/* EXPERIENCIAS (✅ blanco) */}
      <section className="section section--white areaExperiences">
        <div className="areaExperiences__container">
          <header className="areaExperiences__header">
            <h2>Vivir el destino, no solo visitarlo</h2>
          </header>

          <div className="areaExperiences__layout">
            <div className="areaExperiences__media">
              <img src={kayak} alt="Kayak en la costa" loading="lazy" />
              <img src={barcos} alt="Barcos en el puerto" loading="lazy" />
            </div>

            <div className="areaExperiences__list">
              <div className="expItem">
                <span>01</span>
                <div>
                  <h3>Actividades acuáticas</h3>
                  <p>Buceo, snorkel y kayak.</p>
                </div>
              </div>

              <div className="expItem">
                <span>02</span>
                <div>
                  <h3>Paseos en barco</h3>
                  <p>Descubre la costa desde el mar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SABORES (✅ beige) */}
      <section className="section section--beige areaFood">
        <div className="areaFood__container">
          <div className="areaFood__content">
            <h2>Sabores del Empordà</h2>
            <p>Tradición marinera, producto local y recetas mediterráneas.</p>
          </div>

          <div className="areaFood__media">
            <img src={pescado} alt="Producto local del Empordà" loading="lazy" />
          </div>
        </div>
      </section>
    </main>
  );
}