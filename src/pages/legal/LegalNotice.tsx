import "./legal.css";


export default function LegalNotice() {
  return (
    <main className="legalPage">
      <div className="container">
        <h1>Aviso Legal</h1>

        <h2>1. Datos identificativos</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002 (LSSI-CE), se informa:
        </p>

        <p>
          Titular: [NOMBRE DEL HOTEL O EMPRESA] <br />
          CIF/NIF: [CIF] <br />
          Domicilio: [DIRECCIÓN COMPLETA] <br />
          Email: [EMAIL DE CONTACTO] <br />
          Teléfono: [TELÉFONO]
        </p>

        <h2>2. Objeto</h2>
        <p>
          El presente sitio web tiene como finalidad ofrecer información sobre los servicios
          del hotel, así como permitir la realización de reservas y contacto con el establecimiento.
        </p>

        <h2>3. Condiciones de uso</h2>
        <p>
          El acceso y uso de esta web atribuye la condición de usuario e implica la aceptación
          plena de las presentes condiciones.
        </p>

        <h2>4. Propiedad intelectual</h2>
        <p>
          Todos los contenidos del sitio web (textos, imágenes, diseño, código fuente,
          logotipos, etc.) son propiedad del titular o cuentan con licencia de uso.
          Queda prohibida su reproducción sin autorización expresa.
        </p>

        <h2>5. Responsabilidad</h2>
        <p>
          El titular no se responsabiliza del mal uso de los contenidos de la web ni de
          posibles errores técnicos o interrupciones del servicio.
        </p>

        <h2>6. Legislación aplicable</h2>
        <p>
          La relación entre el usuario y el titular se regirá por la normativa vigente
          en España. Para la resolución de conflictos, las partes se someten a los juzgados
          y tribunales del domicilio del titular.
        </p>

        <p>Última actualización: [FECHA]</p>
      </div>
    </main>
  );
}