import "./legal.css";
export default function Cookies() {
  return (
    <main className="legalPage">
      <div className="container">
        <h1>Política de Cookies</h1>

        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos que se almacenan en el navegador del usuario
          para facilitar la navegación y mejorar la experiencia.
        </p>

        <h2>2. Tipos de cookies utilizadas</h2>
        <ul>
          <li>
            <strong>Cookies técnicas:</strong> necesarias para el funcionamiento de la web.
          </li>
          <li>
            <strong>Cookies de análisis:</strong> permiten medir el tráfico y el uso del sitio
            (por ejemplo, Google Analytics).
          </li>
          <li>
            <strong>Cookies de terceros:</strong> utilizadas por servicios externos como
            pasarelas de pago o mapas.
          </li>
        </ul>

        <h2>3. Gestión de cookies</h2>
        <p>
          El usuario puede configurar su navegador para aceptar, bloquear o eliminar las
          cookies instaladas. La desactivación de cookies puede afectar al correcto
          funcionamiento del sitio.
        </p>

        <h2>4. Consentimiento</h2>
        <p>
          Al acceder a este sitio web, el usuario acepta el uso de cookies conforme a la
          presente política. Puede retirar su consentimiento en cualquier momento.
        </p>

        <h2>5. Más información</h2>
        <p>
          Para más información sobre el tratamiento de datos personales, consulte nuestra
          Política de Privacidad.
        </p>

        <p>Última actualización: [FECHA]</p>
      </div>
    </main>
  );
}