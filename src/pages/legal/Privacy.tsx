
import "./legal.css";



export default function Privacy() {
  return (
    <main className="legalPage">
      <div className="container">
        <h1>Política de Privacidad</h1>

        <p>
          En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo
          (RGPD) y de la Ley Orgánica 3/2018 (LOPDGDD), informamos a los usuarios de esta
          página web sobre el tratamiento de sus datos personales.
        </p>

        <h2>1. Responsable del tratamiento</h2>
        <p>
          Titular: [NOMBRE DEL HOTEL O EMPRESA] <br />
          CIF/NIF: [CIF] <br />
          Domicilio: [DIRECCIÓN COMPLETA] <br />
          Email de contacto: [EMAIL DE CONTACTO] <br />
          Teléfono: [TELÉFONO]
        </p>

        <h2>2. Finalidad del tratamiento</h2>
        <p>Los datos personales que recopilamos se utilizan para:</p>
        <ul>
          <li>Gestionar reservas y estancias.</li>
          <li>Responder consultas enviadas a través del formulario de contacto.</li>
          <li>Enviar comunicaciones relacionadas con la reserva.</li>
          <li>Cumplir obligaciones legales.</li>
        </ul>

        <h2>3. Base legal</h2>
        <p>
          La base jurídica para el tratamiento de sus datos es:
        </p>
        <ul>
          <li>La ejecución de un contrato (reserva hotelera).</li>
          <li>El consentimiento del usuario.</li>
          <li>El cumplimiento de obligaciones legales.</li>
        </ul>

        <h2>4. Conservación de los datos</h2>
        <p>
          Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad
          para la que fueron recabados y para atender posibles responsabilidades legales.
        </p>

        <h2>5. Destinatarios</h2>
        <p>
          No se cederán datos a terceros salvo obligación legal o cuando sea necesario para
          la prestación del servicio (por ejemplo, plataformas de pago).
        </p>

        <h2>6. Derechos del usuario</h2>
        <p>
          El usuario tiene derecho a:
        </p>
        <ul>
          <li>Acceder a sus datos personales.</li>
          <li>Rectificar datos inexactos.</li>
          <li>Solicitar su supresión.</li>
          <li>Limitar u oponerse al tratamiento.</li>
          <li>Solicitar la portabilidad de sus datos.</li>
        </ul>

        <p>
          Puede ejercer sus derechos enviando una solicitud al correo electrónico
          [EMAIL DE CONTACTO].
        </p>

        <h2>7. Seguridad</h2>
        <p>
          El hotel adopta las medidas técnicas y organizativas necesarias para garantizar
          la seguridad y confidencialidad de los datos personales.
        </p>

        <h2>8. Cambios en la política</h2>
        <p>
          Nos reservamos el derecho de modificar la presente política para adaptarla a
          novedades legislativas o jurisprudenciales.
        </p>

        <p>
          Última actualización: [FECHA]
        </p>
      </div>
    </main>
  );
}