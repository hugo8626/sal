// import "./Reservas.css";
// import { useMemo, useState } from "react";
// import { useTranslation } from "react-i18next";
// import SEO from "../../components/seo/SEO";

// import heroImg from "../../assets/images/espacios/sala.jpg";

// /**
//  * ==========================
//  * HELPERS (calendario simple)
//  * ==========================
//  * ISO YYYY-MM-DD para:
//  * - i18n (fechas bloqueadas)
//  * - backend futuro
//  */
// function pad(n: number) {
//   return String(n).padStart(2, "0");
// }
// function toISO(d: Date) {
//   return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
// }
// function sameDay(a: Date, b: Date) {
//   return (
//     a.getFullYear() === b.getFullYear() &&
//     a.getMonth() === b.getMonth() &&
//     a.getDate() === b.getDate()
//   );
// }
// function startOfMonth(d: Date) {
//   return new Date(d.getFullYear(), d.getMonth(), 1);
// }
// function endOfMonth(d: Date) {
//   return new Date(d.getFullYear(), d.getMonth() + 1, 0);
// }
// function addMonths(d: Date, delta: number) {
//   return new Date(d.getFullYear(), d.getMonth() + delta, 1);
// }

// export default function Reservas() {
//   const { t } = useTranslation();

//   /**
//    * ==========================
//    * DISPONIBILIDAD (bloqueados)
//    * ==========================
//    * booking.availability.blocked = ["2026-06-12","2026-06-13"...]
//    * Si no existe -> no bloquea nada (no rompe).
//    */
//   const blocked = useMemo(() => {
//     const data = t("booking.availability.blocked", { returnObjects: true }) as unknown;
//     return Array.isArray(data) ? (data as string[]) : [];
//   }, [t]);

//   const blockedSet = useMemo(() => new Set(blocked), [blocked]);

//   /**
//    * ==========================
//    * ESTADO CALENDARIO
//    * ========================== */
//   const [month, setMonth] = useState(() => startOfMonth(new Date()));

//   /**
//    * ==========================
//    * FECHAS SELECCIONADAS
//    * ========================== */
//   const [checkin, setCheckin] = useState<Date | null>(null);
//   const [checkout, setCheckout] = useState<Date | null>(null);

//   /**
//    * ==========================
//    * FORM (estado mínimo)
//    * ==========================
//    * - Teléfono del usuario (nuevo)
//    */
//   const [adults, setAdults] = useState("2");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState(""); // ✅ NUEVO
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   function isBlocked(d: Date) {
//     return blockedSet.has(toISO(d));
//   }

//   function inRange(d: Date) {
//     if (!checkin || !checkout) return false;
//     const time = d.getTime();
//     return time >= checkin.getTime() && time <= checkout.getTime();
//   }

//   /**
//    * Selección:
//    * - Click 1: checkin
//    * - Click 2: checkout (si >= checkin y sin bloqueados entre medias)
//    * - Si ya había rango completo: reinicia
//    */
//   function pickDay(d: Date) {
//     if (isBlocked(d)) return;

//     if (!checkin || (checkin && checkout)) {
//       setCheckin(d);
//       setCheckout(null);
//       return;
//     }

//     if (checkin && !checkout) {
//       if (d.getTime() < checkin.getTime()) {
//         setCheckin(d);
//         return;
//       }

//       // No permitir cerrar rango si hay un día bloqueado en medio
//       const start = new Date(checkin);
//       const end = new Date(d);
//       for (let cur = new Date(start); cur.getTime() <= end.getTime(); cur.setDate(cur.getDate() + 1)) {
//         if (isBlocked(cur)) return;
//       }

//       setCheckout(d);
//     }
//   }

//   /**
//    * Genera la cuadrícula del mes visible
//    * - Semana empieza lunes
//    * - Rellena días fuera de mes para cuadrar filas
//    */
//   const days = useMemo(() => {
//     const first = startOfMonth(month);
//     const last = endOfMonth(month);
//     const startWeekday = (first.getDay() + 6) % 7; // lunes=0
//     const out: Array<{ date: Date; inMonth: boolean }> = [];

//     // relleno anterior
//     for (let i = 0; i < startWeekday; i++) {
//       const d = new Date(first);
//       d.setDate(d.getDate() - (startWeekday - i));
//       out.push({ date: d, inMonth: false });
//     }

//     // días del mes
//     for (let day = 1; day <= last.getDate(); day++) {
//       out.push({ date: new Date(month.getFullYear(), month.getMonth(), day), inMonth: true });
//     }

//     // relleno final
//     while (out.length % 7 !== 0) {
//       const d = new Date(last);
//       d.setDate(d.getDate() + (out.length % 7));
//       out.push({ date: d, inMonth: false });
//     }

//     return out;
//   }, [month]);

//   /**
//    * Submit (por ahora sin backend)
//    * - Validación mínima: requiere fechas + datos contacto.
//    */
//   function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!checkin || !checkout) return;

//     // Aquí luego conectas tu endpoint /booking o lo que uses.
//     // Por ahora: comportamiento seguro sin hacer nada.
//     // console.log({ checkin: toISO(checkin), checkout: toISO(checkout), adults, name, phone, email, message });
//   }

//   const canSubmit = !!checkin && !!checkout;

//   return (
//     <>
//       {/* ==========================
//           SEO (igual que las otras páginas)
//           ========================== */}
//       <SEO
//         title={t("booking.seo.title", { defaultValue: "Reservas | Taverna de la Sal" })}
//         description={t("booking.seo.description", {
//           defaultValue: "Reserva tu estancia en Taverna de la Sal. Elige fechas y confirmamos disponibilidad.",
//         })}
//         image={heroImg}
//       />

//       <main className="bookingPage">
//         {/* ==========================
//             HERO
//             ========================== */}
//         <section className="bookingHero" aria-label={t("booking.hero.aria", { defaultValue: "Reservas" })}>
//           <div className="container bookingHero__content">
//             <p className="eyebrow">{t("booking.hero.eyebrow", { defaultValue: "RESERVAS" })}</p>
//             <h1 className="bookingHero__title">{t("booking.hero.title", { defaultValue: "Reserva tu habitación" })}</h1>
//             <p className="bookingHero__lead">
//               {t("booking.hero.lead", {
//                 defaultValue: "Selecciona tus fechas y preferencias. Confirmamos disponibilidad al instante.",
//               })}
//             </p>
//           </div>
//         </section>

//         {/* ==========================
//             BODY
//             ========================== */}
//         <section className="section section--white">
//           <div className="container bookingLayout">
//             {/* ==========================
//                 IZQUIERDA: FORM
//                 - Quitado: Niños
//                 - Quitado: Tipo habitación
//                 - Añadido: Teléfono usuario
//                 - Fechas: solo calendario (inputs readOnly)
//                 ========================== */}
//             <form className="bookingForm" onSubmit={onSubmit}>
//               <h2 className="bookingForm__title">{t("booking.form.title", { defaultValue: "Detalles de la estancia" })}</h2>

//               <div className="bookingGrid">
//                 <div className="field">
//                   <label htmlFor="checkin">{t("booking.form.checkin.label", { defaultValue: "Fecha de llegada" })}</label>
//                   <input
//                     id="checkin"
//                     type="text"
//                     readOnly
//                     value={checkin ? toISO(checkin) : ""}
//                     placeholder={t("booking.form.checkin.placeholder", { defaultValue: "Selecciona en el calendario" })}
//                   />
//                 </div>

//                 <div className="field">
//                   <label htmlFor="checkout">{t("booking.form.checkout.label", { defaultValue: "Fecha de salida" })}</label>
//                   <input
//                     id="checkout"
//                     type="text"
//                     readOnly
//                     value={checkout ? toISO(checkout) : ""}
//                     placeholder={t("booking.form.checkout.placeholder", { defaultValue: "Selecciona en el calendario" })}
//                   />
//                 </div>

//                 <div className="field">
//                   <label htmlFor="adults">{t("booking.form.adults.label", { defaultValue: "Adultos" })}</label>
//                   <select id="adults" value={adults} onChange={(e) => setAdults(e.target.value)} required>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                   </select>
//                 </div>
//               </div>

//               {/* PARKING */}
//               <div className="field field--checkbox">
//                 <label className="checkRow">
//                   <input className="checkRow__input" type="checkbox" />
//                   <span className="checkRow__box" aria-hidden="true"></span>

//                   <span className="checkRow__text">
//                     <span className="checkRow__title">
//                       {t("booking.form.parking.title", { defaultValue: "Añadir plaza de parking" })}
//                     </span>
//                     <span className="checkRow__meta">
//                       {t("booking.form.parking.meta", { defaultValue: "+15€ / noche · Plaza garantizada" })}
//                     </span>
//                   </span>
//                 </label>
//               </div>

//               {/* DATOS CONTACTO */}
//               <div className="field">
//                 <label htmlFor="name">{t("booking.form.name.label", { defaultValue: "Nombre completo" })}</label>
//                 <input
//                   id="name"
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder={t("booking.form.name.placeholder", { defaultValue: "Tu nombre" })}
//                   autoComplete="name"
//                   required
//                 />
//               </div>

//               {/* ✅ NUEVO: TELÉFONO USUARIO */}
//               <div className="field">
//                 <label htmlFor="phone">{t("booking.form.phone.label", { defaultValue: "Teléfono" })}</label>
//                 <input
//                   id="phone"
//                   type="tel"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder={t("booking.form.phone.placeholder", { defaultValue: "Tu número de teléfono" })}
//                   autoComplete="tel"
//                   required
//                 />
//               </div>

//               <div className="field">
//                 <label htmlFor="email">{t("booking.form.email.label", { defaultValue: "Email" })}</label>
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder={t("booking.form.email.placeholder", { defaultValue: "correo@email.com" })}
//                   autoComplete="email"
//                   required
//                 />
//               </div>

//               <div className="field">
//                 <label htmlFor="message">{t("booking.form.message.label", { defaultValue: "Mensaje (opcional)" })}</label>
//                 <textarea
//                   id="message"
//                   rows={4}
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder={t("booking.form.message.placeholder", { defaultValue: "Alguna petición especial..." })}
//                 />
//               </div>

//               <button className="bookingBtn" type="submit" disabled={!canSubmit}>
//                 {t("booking.form.submit", { defaultValue: "Comprobar disponibilidad" })}
//               </button>

//               {!canSubmit ? (
//                 <p className="bookingForm__hint">
//                   {t("booking.form.hint", { defaultValue: "Selecciona llegada y salida en el calendario." })}
//                 </p>
//               ) : null}
//             </form>

//             {/* ==========================
//                 DERECHA: CALENDARIO + TU ESTANCIA
//                 ========================== */}
//             <aside className="bookingRight">
//               {/* CALENDARIO */}
//               <section className="bookingCalendar" aria-label={t("booking.availability.aria", { defaultValue: "Disponibilidad" })}>
//                 <header className="bookingCalendar__head">
//                   <h3 className="bookingCalendar__title">{t("booking.availability.title", { defaultValue: "Disponibilidad" })}</h3>

//                   <div className="bookingCalendar__nav">
//                     <button
//                       type="button"
//                       className="calBtn"
//                       onClick={() => setMonth((m) => addMonths(m, -1))}
//                       aria-label={t("booking.availability.prev", { defaultValue: "Mes anterior" })}
//                     >
//                       ←
//                     </button>

//                     <div className="calMonth">
//                       {month.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
//                     </div>

//                     <button
//                       type="button"
//                       className="calBtn"
//                       onClick={() => setMonth((m) => addMonths(m, 1))}
//                       aria-label={t("booking.availability.next", { defaultValue: "Mes siguiente" })}
//                     >
//                       →
//                     </button>
//                   </div>
//                 </header>

//                 <div className="calWeek">
//                   {["L", "M", "X", "J", "V", "S", "D"].map((w) => (
//                     <div className="calWeek__day" key={w}>
//                       {w}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="calGrid">
//                   {days.map(({ date, inMonth }, idx) => {
//                     const iso = toISO(date);
//                     const blockedDay = isBlocked(date);
//                     const selectedStart = !!checkin && sameDay(checkin, date);
//                     const selectedEnd = !!checkout && sameDay(checkout, date);
//                     const selectedMid = inRange(date);

//                     return (
//                       <button
//                         key={`${iso}-${idx}`}
//                         type="button"
//                         className={[
//                           "calDay",
//                           inMonth ? "is-month" : "is-out",
//                           blockedDay ? "is-blocked" : "",
//                           selectedMid ? "is-selected" : "",
//                           selectedStart ? "is-start" : "",
//                           selectedEnd ? "is-end" : "",
//                         ].join(" ")}
//                         onClick={() => pickDay(date)}
//                         disabled={blockedDay}
//                         aria-label={`${iso}${blockedDay ? " (no disponible)" : ""}`}
//                       >
//                         {date.getDate()}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <div className="calLegend">
//                   <span className="dot dot--free" /> {t("booking.availability.legend.free", { defaultValue: "Disponible" })}
//                   <span className="dot dot--blocked" />{" "}
//                   {t("booking.availability.legend.blocked", { defaultValue: "No disponible" })}
//                   <span className="dot dot--sel" />{" "}
//                   {t("booking.availability.legend.selected", { defaultValue: "Seleccionado" })}
//                 </div>
//               </section>

//               {/* TU ESTANCIA (debajo del calendario) */}
//               <section className="bookingSummary bookingSummary--stack">
//                 <h3 className="bookingSummary__title">{t("booking.summary.title", { defaultValue: "Tu estancia" })}</h3>

//                 <ul className="bookingSummary__list">
//                   <li>{t("booking.summary.items.0", { defaultValue: "Cancelación flexible" })}</li>
//                   <li>{t("booking.summary.items.1", { defaultValue: "Mejor precio garantizado" })}</li>
//                   <li>{t("booking.summary.items.2", { defaultValue: "Pago seguro" })}</li>
//                   <li>{t("booking.summary.items.3", { defaultValue: "Atención personalizada" })}</li>
//                 </ul>

//                 <div className="bookingSummary__box">
//                   <p className="bookingSummary__note">
//                     {t("booking.summary.phoneNote", { defaultValue: "¿Prefieres reservar por teléfono?" })}
//                   </p>
//                   <p className="bookingSummary__phone">
//                     {t("booking.summary.phone", { defaultValue: "+34 972 776 278" })}
//                   </p>
//                 </div>
//               </section>
//             </aside>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }