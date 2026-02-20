// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Admin.css";

// /* ============================================================================
//   TIPOS (ajusta si tu backend devuelve nombres distintos)
// ============================================================================ */
// type ReservaStatus = "pending" | "confirmed" | "cancelled";

// type Reserva = {
//   id: number;
//   name: string;
//   email: string;
//   phone?: string;

//   checkIn: string;  // ideal: "YYYY-MM-DD"
//   checkOut: string; // ideal: "YYYY-MM-DD"
//   roomType?: string;

//   status: ReservaStatus;
//   createdAt: string;

//   // opcionales
//   notes?: string;
//   source?: string; // "web" | "in-person" | etc
// };

// type NewReservaPayload = {
//   name: string;
//   email: string;
//   phone?: string;
//   checkIn: string;
//   checkOut: string;
//   roomType?: string;
//   notes?: string;
//   status?: ReservaStatus;
//   source?: string;
// };

// type TabKey = "reservas" | "clientes" | "calendario";

// type Cliente = {
//   key: string; // email (si existe) o phone
//   name: string;
//   email: string;
//   phone?: string;
//   totalReservas: number;
//   lastReservaAt?: string;
//   statuses: Record<ReservaStatus, number>;
// };

// /* ============================================================================
//   CONFIG
// ============================================================================ */
// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";

// /** Sólo para construir rutas /:lang/... (NO para traducir el panel). */
// const SUPPORTED_LANGS = ["es", "en", "fr", "ca"] as const;
// type SupportedLang = (typeof SUPPORTED_LANGS)[number];

// function isSupportedLang(x: string): x is SupportedLang {
//   return (SUPPORTED_LANGS as readonly string[]).includes(x);
// }

// function getLang(): SupportedLang {
//   const raw = localStorage.getItem("i18nextLng") || "es";
//   const base = raw.split("-")[0];
//   return isSupportedLang(base) ? base : "es";
// }

// function getAdminLoginPath(): string {
//   return `/${getLang()}/admin/login`;
// }

// function getToken(): string {
//   return localStorage.getItem("admin_token") || "";
// }

// /* ============================================================================
//   HELPERS FECHAS
// ============================================================================ */
// function parseDateSafe(d: string): Date | null {
//   const dt = new Date(d);
//   return Number.isNaN(dt.getTime()) ? null : dt;
// }

// function fmtDate(d: string): string {
//   const dt = parseDateSafe(d);
//   if (!dt) return d;
//   return dt.toLocaleDateString();
// }

// /** Normaliza a YYYY-MM-DD si viene con hora o formato raro (mejor que nada). */
// function toYMD(d: string): string {
//   const dt = parseDateSafe(d);
//   if (!dt) return d;
//   const y = dt.getFullYear();
//   const m = String(dt.getMonth() + 1).padStart(2, "0");
//   const day = String(dt.getDate()).padStart(2, "0");
//   return `${y}-${m}-${day}`;
// }

// /** Devuelve noches (checkOut - checkIn) */
// function nights(checkIn: string, checkOut: string): number | null {
//   const a = parseDateSafe(checkIn);
//   const b = parseDateSafe(checkOut);
//   if (!a || !b) return null;
//   const ms = b.getTime() - a.getTime();
//   return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
// }

// /**
//  * Reglas de ocupación:
//  * - La habitación se considera ocupada desde checkIn (incluido) hasta checkOut (excluido).
//  * - Ej: checkIn 10, checkOut 12 => ocupada 10 y 11.
//  */
// function dayIsOccupied(dayYMD: string, r: Reserva): boolean {
//   const d = parseDateSafe(dayYMD);
//   const ci = parseDateSafe(r.checkIn);
//   const co = parseDateSafe(r.checkOut);
//   if (!d || !ci || !co) return false;

//   // normalizamos a medianoche
//   const dd = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
//   const cii = new Date(ci.getFullYear(), ci.getMonth(), ci.getDate()).getTime();
//   const coo = new Date(co.getFullYear(), co.getMonth(), co.getDate()).getTime();

//   return dd >= cii && dd < coo;
// }

// /** Dado un año/mes, crea la grilla de calendario (lunes a domingo) */
// function buildMonthGrid(year: number, monthIndex0: number): Array<{ ymd: string; inMonth: boolean }> {
//   const first = new Date(year, monthIndex0, 1);
//   const last = new Date(year, monthIndex0 + 1, 0);

//   // lunes=1 ... domingo=0 en JS; lo convertimos a lunes=0
//   const jsDay = first.getDay(); // 0 dom ... 6 sab
//   const offset = (jsDay + 6) % 7; // lunes=0 ... domingo=6

//   const daysInMonth = last.getDate();
//   const totalCells = 42; // 6 semanas

//   const cells: Array<{ ymd: string; inMonth: boolean }> = [];
//   for (let i = 0; i < totalCells; i++) {
//     const dayNum = i - offset + 1;
//     const date = new Date(year, monthIndex0, dayNum);
//     const inMonth = dayNum >= 1 && dayNum <= daysInMonth;
//     cells.push({ ymd: toYMD(date.toISOString()), inMonth });
//   }
//   return cells;
// }

// /* ============================================================================
//   COMPONENTE PRINCIPAL
// ============================================================================ */
// export default function Admin() {
//   const navigate = useNavigate();
//   const goLogin = () => navigate(getAdminLoginPath(), { replace: true });

//   /* -------------------------
//      STATE: data
//   -------------------------- */
//   const [reservas, setReservas] = useState<Reserva[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   /* -------------------------
//      STATE: UI general
//   -------------------------- */
//   const [tab, setTab] = useState<TabKey>("reservas");
//   const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
//   const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

//   /* -------------------------
//      STATE: filtros Reservas
//   -------------------------- */
//   const [q, setQ] = useState("");
//   const [statusFilter, setStatusFilter] = useState<ReservaStatus | "all">("all");
//   const [from, setFrom] = useState(""); // YYYY-MM-DD
//   const [to, setTo] = useState("");   // YYYY-MM-DD
//   const [page, setPage] = useState(1);
//   const pageSize = 12;

//   /* -------------------------
//      STATE: crear reserva manual (modal)
//   -------------------------- */
//   const [openCreate, setOpenCreate] = useState(false);
//   const [createErr, setCreateErr] = useState<string | null>(null);
//   const [createSaving, setCreateSaving] = useState(false);
//   const [form, setForm] = useState<NewReservaPayload>({
//     name: "",
//     email: "",
//     phone: "",
//     checkIn: "",
//     checkOut: "",
//     roomType: "",
//     notes: "",
//     status: "pending",
//     source: "in-person",
//   });

//   /* -------------------------
//      STATE: calendario
//   -------------------------- */
//   const now = new Date();
//   const [calYear, setCalYear] = useState(now.getFullYear());
//   const [calMonth0, setCalMonth0] = useState(now.getMonth()); // 0-11
//   const [calSelectedDay, setCalSelectedDay] = useState(toYMD(now.toISOString()));

//   /* ============================================================================
//      FETCH: reservas (GET /admin/reservas)
//   ============================================================================ */
//   const fetchReservas = async () => {
//     setLoading(true);
//     setError(null);

//     const token = getToken();
//     if (!token) {
//       goLogin();
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE}/admin/reservas`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.status === 401) {
//         localStorage.removeItem("admin_token");
//         goLogin();
//         return;
//       }

//       if (!res.ok) {
//         const txt = await res.text().catch(() => "");
//         throw new Error(txt || `Error HTTP ${res.status}`);
//       }

//       const data = await res.json();
//       const list: Reserva[] = data.reservas || data;

//       // orden: más nuevas arriba
//       list.sort(
//         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       );

//       setReservas(list);
//     } catch (e: unknown) {
//       setError(e instanceof Error ? e.message : "Error cargando reservas");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // carga inicial
//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       goLogin();
//       return;
//     }
//     fetchReservas();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   /* ============================================================================
//      STATS (KPIs)
//   ============================================================================ */
//   const stats = useMemo(() => {
//     const total = reservas.length;
//     const pending = reservas.filter((r) => r.status === "pending").length;
//     const confirmed = reservas.filter((r) => r.status === "confirmed").length;
//     const cancelled = reservas.filter((r) => r.status === "cancelled").length;
//     return { total, pending, confirmed, cancelled };
//   }, [reservas]);

//   /* ============================================================================
//      FILTROS + PAGINACIÓN (Reservas)
//   ============================================================================ */
//   const filteredReservas = useMemo(() => {
//     const qq = q.trim().toLowerCase();

//     const inRange = (r: Reserva) => {
//       if (!from && !to) return true;
//       const ci = parseDateSafe(r.checkIn);
//       if (!ci) return true;

//       if (from) {
//         const f = parseDateSafe(`${from}T00:00:00`);
//         if (f && ci < f) return false;
//       }
//       if (to) {
//         const t = parseDateSafe(`${to}T23:59:59`);
//         if (t && ci > t) return false;
//       }
//       return true;
//     };

//     return reservas.filter((r) => {
//       if (statusFilter !== "all" && r.status !== statusFilter) return false;
//       if (!inRange(r)) return false;

//       if (!qq) return true;

//       const hay = [
//         r.id,
//         r.name,
//         r.email,
//         r.phone,
//         r.roomType,
//         r.status,
//         r.checkIn,
//         r.checkOut,
//         r.notes,
//         r.source,
//       ]
//         .filter(Boolean)
//         .join(" ")
//         .toLowerCase();

//       return hay.includes(qq);
//     });
//   }, [reservas, q, statusFilter, from, to]);

//   const totalPages = Math.max(1, Math.ceil(filteredReservas.length / pageSize));

//   const pagedReservas = useMemo(() => {
//     const start = (page - 1) * pageSize;
//     return filteredReservas.slice(start, start + pageSize);
//   }, [filteredReservas, page]);

//   useEffect(() => {
//     if (page > totalPages) setPage(1);
//   }, [page, totalPages]);

//   /* ============================================================================
//      CLIENTES (derivados de reservas: PRO “sin endpoint extra”)
//      - Si luego creas /admin/clientes, lo cambiamos a fetch real.
//   ============================================================================ */
//   const clientes = useMemo<Cliente[]>(() => {
//     const map = new Map<string, Cliente>();

//     for (const r of reservas) {
//       const key = (r.email || r.phone || `cliente_${r.id}`).toLowerCase();
//       const existing = map.get(key);

//       const statusCount: Record<ReservaStatus, number> = existing
//         ? existing.statuses
//         : { pending: 0, confirmed: 0, cancelled: 0 };

//       statusCount[r.status] += 1;

//       const last = existing?.lastReservaAt
//         ? new Date(existing.lastReservaAt).getTime()
//         : 0;
//       const current = new Date(r.createdAt).getTime();
//       const lastReservaAt = current > last ? r.createdAt : existing?.lastReservaAt;

//       map.set(key, {
//         key,
//         name: existing?.name || r.name,
//         email: existing?.email || r.email,
//         phone: existing?.phone || r.phone,
//         totalReservas: (existing?.totalReservas || 0) + 1,
//         lastReservaAt,
//         statuses: statusCount,
//       });
//     }

//     return Array.from(map.values()).sort((a, b) => {
//       const ta = a.lastReservaAt ? new Date(a.lastReservaAt).getTime() : 0;
//       const tb = b.lastReservaAt ? new Date(b.lastReservaAt).getTime() : 0;
//       return tb - ta;
//     });
//   }, [reservas]);

//   /* ============================================================================
//      CALENDARIO
//   ============================================================================ */
//   const monthGrid = useMemo(() => buildMonthGrid(calYear, calMonth0), [calYear, calMonth0]);

//   const reservasDelDia = useMemo(() => {
//     return reservas
//       .filter((r) => dayIsOccupied(calSelectedDay, r))
//       .sort((a, b) => a.name.localeCompare(b.name));
//   }, [reservas, calSelectedDay]);

//   const occupiedCountByDay = useMemo(() => {
//     const map = new Map<string, number>();
//     for (const cell of monthGrid) {
//       const count = reservas.reduce((acc, r) => acc + (dayIsOccupied(cell.ymd, r) ? 1 : 0), 0);
//       map.set(cell.ymd, count);
//     }
//     return map;
//   }, [monthGrid, reservas]);

//   /* ============================================================================
//      ACCIONES: update status / delete / export / logout
//   ============================================================================ */
//   const updateStatus = async (id: number, next: ReservaStatus) => {
//     const token = getToken();
//     if (!token) return goLogin();

//     const ok = next === "confirmed"
//       ? confirm("¿Confirmar esta reserva?")
//       : confirm("¿Cancelar esta reserva?");
//     if (!ok) return;

//     const res = await fetch(`${API_BASE}/admin/reservas/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ status: next }),
//     });

//     if (res.status === 401) {
//       localStorage.removeItem("admin_token");
//       return goLogin();
//     }
//     if (!res.ok) {
//       alert("No se pudo actualizar el estado");
//       return;
//     }

//     setReservas((prev) => prev.map((r) => (r.id === id ? { ...r, status: next } : r)));
//     setSelectedReserva((s) => (s && s.id === id ? { ...s, status: next } : s));
//   };

//   const deleteReserva = async (id: number) => {
//     const ok = confirm("¿Borrar esta reserva? Esto no se puede deshacer.");
//     if (!ok) return;

//     const token = getToken();
//     if (!token) return goLogin();

//     const res = await fetch(`${API_BASE}/admin/reservas/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (res.status === 401) {
//       localStorage.removeItem("admin_token");
//       return goLogin();
//     }
//     if (!res.ok) {
//       alert("No se pudo borrar");
//       return;
//     }

//     setReservas((prev) => prev.filter((r) => r.id !== id));
//     setSelectedReserva((s) => (s?.id === id ? null : s));
//   };

//   const exportCSV = () => {
//     const headers = ["id", "status", "name", "email", "phone", "checkIn", "checkOut", "roomType", "createdAt"];
//     const lines = [
//       headers.join(","),
//       ...filteredReservas.map((r) =>
//         headers
//           .map((k) => {
//             const v = (r as Record<string, unknown>)[k] ?? "";
//             const s = String(v).replaceAll('"', '""');
//             return /[",\n]/.test(s) ? `"${s}"` : s;
//           })
//           .join(",")
//       ),
//     ];

//     const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `reservas_${new Date().toISOString().slice(0, 10)}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const logout = () => {
//     localStorage.removeItem("admin_token");
//     goLogin();
//   };

//   /* ============================================================================
//      CREAR RESERVA MANUAL (POST /admin/reservas)
//   ============================================================================ */
//   const openCreateModal = () => {
//     setCreateErr(null);
//     setCreateSaving(false);
//     setForm({
//       name: "",
//       email: "",
//       phone: "",
//       checkIn: "",
//       checkOut: "",
//       roomType: "",
//       notes: "",
//       status: "pending",
//       source: "in-person",
//     });
//     setOpenCreate(true);
//   };

//   const validateNewReserva = (p: NewReservaPayload): string | null => {
//     if (!p.name.trim()) return "Falta el nombre.";
//     if (!p.email.trim()) return "Falta el email.";
//     if (!p.checkIn) return "Falta la fecha de entrada.";
//     if (!p.checkOut) return "Falta la fecha de salida.";

//     const ci = parseDateSafe(p.checkIn);
//     const co = parseDateSafe(p.checkOut);
//     if (!ci || !co) return "Fechas inválidas.";
//     if (co <= ci) return "La salida debe ser posterior a la entrada.";
//     return null;
//   };

//   const createReserva = async () => {
//     setCreateErr(null);

//     const msg = validateNewReserva(form);
//     if (msg) {
//       setCreateErr(msg);
//       return;
//     }

//     const token = getToken();
//     if (!token) return goLogin();

//     setCreateSaving(true);
//     try {
//       const res = await fetch(`${API_BASE}/admin/reservas`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(form),
//       });

//       if (res.status === 401) {
//         localStorage.removeItem("admin_token");
//         goLogin();
//         return;
//       }

//       if (!res.ok) {
//         // si tu backend no tiene el endpoint, aquí lo verás claro
//         const txt = await res.text().catch(() => "");
//         throw new Error(txt || `No se pudo crear la reserva (HTTP ${res.status})`);
//       }

//       const data = await res.json().catch(() => null);

//       // Esperado: backend devuelve la reserva creada
//       // Si no la devuelve, recargamos lista
//       if (data && (data.reserva || data.id)) {
//         const created: Reserva = (data.reserva || data) as Reserva;
//         setReservas((prev) => [created, ...prev]);
//       } else {
//         await fetchReservas();
//       }

//       setOpenCreate(false);
//     } catch (e: unknown) {
//       setCreateErr(e instanceof Error ? e.message : "Error creando la reserva");
//     } finally {
//       setCreateSaving(false);
//     }
//   };

//   /* ============================================================================
//      RENDER
//   ============================================================================ */
//   if (loading) {
//     return (
//       <main className="adminPage">
//         <div className="adminContainer">
//           <p className="adminLoading">Cargando panel…</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="adminPage">
//       <div className="adminContainer">
//         {/* =========================
//             HEADER + ACTIONS
//         ========================== */}
//         <header className="adminHeader">
//           <div>
//             <p className="adminEyebrow">ADMIN</p>
//             <h1 className="adminTitle">Panel de Reservas</h1>
//           </div>

//           <div className="adminTopActions">
//             <button className="btnPrimary" onClick={openCreateModal}>
//               + Nueva reserva
//             </button>
//             <button className="btnGhost" onClick={fetchReservas}>
//               Recargar
//             </button>
//             <button className="btnGhost" onClick={exportCSV}>
//               Exportar CSV
//             </button>
//             <button className="btnDanger" onClick={logout}>
//               Salir
//             </button>
//           </div>
//         </header>

//         {/* =========================
//             KPIs
//         ========================== */}
//         <section className="adminKpis">
//           <div className="kpi"><p>Total</p><strong>{stats.total}</strong></div>
//           <div className="kpi"><p>Pendientes</p><strong>{stats.pending}</strong></div>
//           <div className="kpi"><p>Confirmadas</p><strong>{stats.confirmed}</strong></div>
//           <div className="kpi"><p>Canceladas</p><strong>{stats.cancelled}</strong></div>
//         </section>

//         {/* =========================
//             TABS
//         ========================== */}
//         <nav className="adminTabs" aria-label="Secciones del panel">
//           <button className={`tabBtn ${tab === "reservas" ? "active" : ""}`} onClick={() => setTab("reservas")}>
//             Reservas
//           </button>
//           <button className={`tabBtn ${tab === "clientes" ? "active" : ""}`} onClick={() => setTab("clientes")}>
//             Clientes
//           </button>
//           <button className={`tabBtn ${tab === "calendario" ? "active" : ""}`} onClick={() => setTab("calendario")}>
//             Calendario
//           </button>
//         </nav>

//         {/* =========================
//             ERROR GLOBAL
//         ========================== */}
//         {error && (
//           <div className="adminError">
//             <p><strong>Error:</strong> {error}</p>
//             <button className="btnGhost" onClick={fetchReservas}>Reintentar</button>
//           </div>
//         )}

//         {/* =========================
//             TAB: RESERVAS
//         ========================== */}
//         {tab === "reservas" && (
//           <>
//             <section className="adminFilters">
//               <label>
//                 Buscar
//                 <input
//                   value={q}
//                   onChange={(e) => setQ(e.target.value)}
//                   placeholder="Nombre, email, tel, id…"
//                 />
//               </label>

//               <label>
//                 Estado
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => {
//                     const v = e.currentTarget.value;
//                     setStatusFilter(v === "all" ? "all" : (v as ReservaStatus));
//                     setPage(1);
//                   }}
//                 >
//                   <option value="all">Todos</option>
//                   <option value="pending">Pendiente</option>
//                   <option value="confirmed">Confirmada</option>
//                   <option value="cancelled">Cancelada</option>
//                 </select>
//               </label>

//               <label>
//                 Desde
//                 <input type="date" value={from} onChange={(e) => { setFrom(e.target.value); setPage(1); }} />
//               </label>

//               <label>
//                 Hasta
//                 <input type="date" value={to} onChange={(e) => { setTo(e.target.value); setPage(1); }} />
//               </label>

//               <button
//                 className="btnGhost"
//                 onClick={() => {
//                   setQ("");
//                   setStatusFilter("all");
//                   setFrom("");
//                   setTo("");
//                   setPage(1);
//                 }}
//               >
//                 Limpiar
//               </button>
//             </section>

//             <div className="adminTableWrapper">
//               <table className="adminTable">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Cliente</th>
//                     <th>Fechas</th>
//                     <th>Noches</th>
//                     <th>Habitación</th>
//                     <th>Estado</th>
//                     <th>Creada</th>
//                     <th className="thRight">Acciones</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {pagedReservas.map((r) => (
//                     <tr key={r.id}>
//                       <td className="mono">#{r.id}</td>

//                       <td>
//                         <button className="linkLike" onClick={() => setSelectedReserva(r)} title="Ver detalle">
//                           {r.name}
//                         </button>
//                         <div className="adminMuted">{r.email}</div>
//                         {r.phone && <div className="adminMuted">{r.phone}</div>}
//                       </td>

//                       <td>{fmtDate(r.checkIn)} → {fmtDate(r.checkOut)}</td>
//                       <td>{nights(r.checkIn, r.checkOut) ?? "—"}</td>
//                       <td>{r.roomType || "—"}</td>

//                       <td>
//                         <span className={`status ${r.status}`}>{r.status}</span>
//                       </td>

//                       <td className="adminMuted">{fmtDate(r.createdAt)}</td>

//                       <td className="adminActionsCell">
//                         <button className="btnGhost" onClick={() => setSelectedReserva(r)}>Ver</button>
//                         <button
//                           className="btnConfirm"
//                           disabled={r.status === "confirmed"}
//                           onClick={() => updateStatus(r.id, "confirmed")}
//                         >
//                           Confirmar
//                         </button>
//                         <button
//                           className="btnCancel"
//                           disabled={r.status === "cancelled"}
//                           onClick={() => updateStatus(r.id, "cancelled")}
//                         >
//                           Cancelar
//                         </button>
//                         <button className="btnDelete" onClick={() => deleteReserva(r.id)}>Borrar</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {filteredReservas.length === 0 && (
//                 <p className="adminEmpty">No hay reservas que coincidan con los filtros.</p>
//               )}
//             </div>

//             <div className="adminPager">
//               <span className="adminMuted">
//                 Mostrando {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredReservas.length)} de {filteredReservas.length}
//               </span>

//               <div className="pagerBtns">
//                 <button className="btnGhost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>←</button>
//                 <span className="pageNum">{page} / {totalPages}</span>
//                 <button className="btnGhost" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>→</button>
//               </div>
//             </div>
//           </>
//         )}

//         {/* =========================
//             TAB: CLIENTES (derivado)
//         ========================== */}
//         {tab === "clientes" && (
//           <div className="adminTableWrapper">
//             <table className="adminTable">
//               <thead>
//                 <tr>
//                   <th>Cliente</th>
//                   <th>Contacto</th>
//                   <th>Total reservas</th>
//                   <th>Estados</th>
//                   <th>Última reserva</th>
//                   <th className="thRight">Acciones</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {clientes.map((c) => (
//                   <tr key={c.key}>
//                     <td>
//                       <strong>{c.name}</strong>
//                       <div className="adminMuted">{c.key}</div>
//                     </td>
//                     <td>
//                       <div>{c.email}</div>
//                       {c.phone && <div className="adminMuted">{c.phone}</div>}
//                     </td>
//                     <td className="mono">{c.totalReservas}</td>
//                     <td className="adminMuted">
//                       P:{c.statuses.pending} / C:{c.statuses.confirmed} / X:{c.statuses.cancelled}
//                     </td>
//                     <td className="adminMuted">{c.lastReservaAt ? fmtDate(c.lastReservaAt) : "—"}</td>
//                     <td className="adminActionsCell">
//                       <button className="btnGhost" onClick={() => setSelectedCliente(c)}>Ver</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {clientes.length === 0 && <p className="adminEmpty">No hay clientes todavía.</p>}
//           </div>
//         )}

//         {/* =========================
//             TAB: CALENDARIO
//         ========================== */}
//         {tab === "calendario" && (
//           <section className="calendarWrap">
//             <header className="calendarHeader">
//               <div className="calendarTitle">
//                 <p className="adminEyebrow">CALENDARIO</p>
//                 <h2 className="adminH2">
//                   {new Date(calYear, calMonth0, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
//                 </h2>
//               </div>

//               <div className="calendarNav">
//                 <button
//                   className="btnGhost"
//                   onClick={() => {
//                     const d = new Date(calYear, calMonth0 - 1, 1);
//                     setCalYear(d.getFullYear());
//                     setCalMonth0(d.getMonth());
//                   }}
//                 >
//                   ← Mes
//                 </button>
//                 <button
//                   className="btnGhost"
//                   onClick={() => {
//                     const d = new Date(now.getFullYear(), now.getMonth(), 1);
//                     setCalYear(d.getFullYear());
//                     setCalMonth0(d.getMonth());
//                     setCalSelectedDay(toYMD(new Date().toISOString()));
//                   }}
//                 >
//                   Hoy
//                 </button>
//                 <button
//                   className="btnGhost"
//                   onClick={() => {
//                     const d = new Date(calYear, calMonth0 + 1, 1);
//                     setCalYear(d.getFullYear());
//                     setCalMonth0(d.getMonth());
//                   }}
//                 >
//                   Mes →
//                 </button>
//               </div>
//             </header>

//             <div className="calendarGrid">
//               <div className="calendarWeekdays">
//                 {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((w) => (
//                   <div key={w} className="weekday">{w}</div>
//                 ))}
//               </div>

//               <div className="calendarCells">
//                 {monthGrid.map((cell) => {
//                   const count = occupiedCountByDay.get(cell.ymd) || 0;
//                   const isSelected = cell.ymd === calSelectedDay;
//                   const isOcc = count > 0;
//                   const dayNum = Number(cell.ymd.slice(8, 10));

//                   return (
//                     <button
//                       key={cell.ymd}
//                       className={[
//                         "dayCell",
//                         cell.inMonth ? "inMonth" : "outMonth",
//                         isOcc ? "occupied" : "free",
//                         isSelected ? "selected" : "",
//                       ].join(" ")}
//                       onClick={() => setCalSelectedDay(cell.ymd)}
//                       title={isOcc ? `${count} reserva(s)` : "Libre"}
//                     >
//                       <div className="dayTop">
//                         <span className="dayNum">{dayNum}</span>
//                         {isOcc && <span className="badge">{count}</span>}
//                       </div>
//                       <div className="dayHint">{isOcc ? "Ocupado" : "Libre"}</div>
//                     </button>
//                   );
//                 })}
//               </div>

//               <aside className="calendarSide">
//                 <div className="sideCard">
//                   <h3>Reservas del día</h3>
//                   <p className="adminMuted">{fmtDate(calSelectedDay)}</p>

//                   {reservasDelDia.length === 0 ? (
//                     <p className="adminMuted">No hay reservas para este día.</p>
//                   ) : (
//                     <ul className="sideList">
//                       {reservasDelDia.map((r) => (
//                         <li key={r.id} className="sideItem">
//                           <div className="sideMain">
//                             <button className="linkLike" onClick={() => setSelectedReserva(r)}>
//                               {r.name}
//                             </button>
//                             <span className={`status ${r.status}`}>{r.status}</span>
//                           </div>
//                           <div className="adminMuted">
//                             {fmtDate(r.checkIn)} → {fmtDate(r.checkOut)} • {r.roomType || "—"}
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </aside>
//             </div>
//           </section>
//         )}
//       </div>

//       {/* =========================================================================
//           MODAL: NUEVA RESERVA (manual)
//       ========================================================================= */}
//       {openCreate && (
//         <div className="modalBackdrop" onClick={() => setOpenCreate(false)} role="presentation">
//           <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
//             <div className="modalHeader">
//               <div>
//                 <p className="adminEyebrow">NUEVA RESERVA</p>
//                 <h2 className="drawerTitle">Reserva manual</h2>
//               </div>
//               <button className="btnGhost" onClick={() => setOpenCreate(false)}>Cerrar</button>
//             </div>

//             <div className="modalBody">
//               {createErr && (
//                 <div className="adminError">
//                   <p><strong>Error:</strong> {createErr}</p>
//                 </div>
//               )}

//               <div className="formGrid">
//                 <label>
//                   Nombre
//                   <input
//                     value={form.name}
//                     onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
//                     placeholder="Nombre y apellidos"
//                   />
//                 </label>

//                 <label>
//                   Email
//                   <input
//                     value={form.email}
//                     onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
//                     placeholder="correo@cliente.com"
//                   />
//                 </label>

//                 <label>
//                   Teléfono
//                   <input
//                     value={form.phone || ""}
//                     onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
//                     placeholder="+34..."
//                   />
//                 </label>

//                 <label>
//                   Habitación
//                   <input
//                     value={form.roomType || ""}
//                     onChange={(e) => setForm((p) => ({ ...p, roomType: e.target.value }))}
//                     placeholder="Doble / Suite / etc"
//                   />
//                 </label>

//                 <label>
//                   Entrada
//                   <input
//                     type="date"
//                     value={form.checkIn}
//                     onChange={(e) => setForm((p) => ({ ...p, checkIn: e.target.value }))}
//                   />
//                 </label>

//                 <label>
//                   Salida
//                   <input
//                     type="date"
//                     value={form.checkOut}
//                     onChange={(e) => setForm((p) => ({ ...p, checkOut: e.target.value }))}
//                   />
//                 </label>

//                 <label>
//                   Estado inicial
//                   <select
//                     value={form.status || "pending"}
//                     onChange={(e) =>
//                       setForm((p) => ({ ...p, status: e.currentTarget.value as ReservaStatus }))
//                     }
//                   >
//                     <option value="pending">Pendiente</option>
//                     <option value="confirmed">Confirmada</option>
//                     <option value="cancelled">Cancelada</option>
//                   </select>
//                 </label>

//                 <label className="full">
//                   Notas
//                   <textarea
//                     value={form.notes || ""}
//                     onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
//                     placeholder="Observaciones, peticiones, etc"
//                     rows={4}
//                   />
//                 </label>
//               </div>

//               <div className="modalActions">
//                 <button className="btnGhost" onClick={() => setOpenCreate(false)}>
//                   Cancelar
//                 </button>
//                 <button className="btnPrimary" disabled={createSaving} onClick={createReserva}>
//                   {createSaving ? "Guardando…" : "Crear reserva"}
//                 </button>
//               </div>

//               <p className="adminMuted smallNote">
//                 Nota: esto requiere POST <span className="mono">/admin/reservas</span> en tu backend.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* =========================================================================
//           DRAWER: DETALLE RESERVA
//       ========================================================================= */}
//       {selectedReserva && (
//         <div className="drawerBackdrop" onClick={() => setSelectedReserva(null)} role="presentation">
//           <aside className="drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
//             <div className="drawerHeader">
//               <div>
//                 <p className="adminEyebrow">Reserva #{selectedReserva.id}</p>
//                 <h2 className="drawerTitle">{selectedReserva.name}</h2>
//               </div>
//               <button className="btnGhost" onClick={() => setSelectedReserva(null)}>Cerrar</button>
//             </div>

//             <div className="drawerBody">
//               <div className="drawerGrid">
//                 <div className="card">
//                   <h3>Cliente</h3>
//                   <p><strong>Email:</strong> {selectedReserva.email}</p>
//                   <p><strong>Tel:</strong> {selectedReserva.phone || "—"}</p>

//                   <div className="quickActions">
//                     <a className="btnGhost" href={`mailto:${selectedReserva.email}`}>Email</a>
//                     {selectedReserva.phone && (
//                       <>
//                         <a className="btnGhost" href={`tel:${selectedReserva.phone}`}>Llamar</a>
//                         <a
//                           className="btnGhost"
//                           href={`https://wa.me/${selectedReserva.phone.replace(/\D/g, "")}`}
//                           target="_blank"
//                           rel="noreferrer"
//                         >
//                           WhatsApp
//                         </a>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 <div className="card">
//                   <h3>Estancia</h3>
//                   <p><strong>Entrada:</strong> {fmtDate(selectedReserva.checkIn)}</p>
//                   <p><strong>Salida:</strong> {fmtDate(selectedReserva.checkOut)}</p>
//                   <p><strong>Noches:</strong> {nights(selectedReserva.checkIn, selectedReserva.checkOut) ?? "—"}</p>
//                   <p><strong>Habitación:</strong> {selectedReserva.roomType || "—"}</p>
//                 </div>

//                 <div className="card">
//                   <h3>Estado</h3>
//                   <p><span className={`status ${selectedReserva.status}`}>{selectedReserva.status}</span></p>

//                   <div className="drawerButtons">
//                     <button
//                       className="btnConfirm"
//                       disabled={selectedReserva.status === "confirmed"}
//                       onClick={() => updateStatus(selectedReserva.id, "confirmed")}
//                     >
//                       Confirmar
//                     </button>

//                     <button
//                       className="btnCancel"
//                       disabled={selectedReserva.status === "cancelled"}
//                       onClick={() => updateStatus(selectedReserva.id, "cancelled")}
//                     >
//                       Cancelar
//                     </button>

//                     <button className="btnDelete" onClick={() => deleteReserva(selectedReserva.id)}>
//                       Borrar
//                     </button>
//                   </div>
//                 </div>

//                 {(selectedReserva.notes || selectedReserva.source) && (
//                   <div className="card cardFull">
//                     <h3>Notas / Origen</h3>
//                     {selectedReserva.source && <p><strong>Origen:</strong> {selectedReserva.source}</p>}
//                     {selectedReserva.notes && <p><strong>Notas:</strong> {selectedReserva.notes}</p>}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </aside>
//         </div>
//       )}

//       {/* =========================================================================
//           MODAL: DETALLE CLIENTE (derivado)
//       ========================================================================= */}
//       {selectedCliente && (
//         <div className="modalBackdrop" onClick={() => setSelectedCliente(null)} role="presentation">
//           <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
//             <div className="modalHeader">
//               <div>
//                 <p className="adminEyebrow">CLIENTE</p>
//                 <h2 className="drawerTitle">{selectedCliente.name}</h2>
//               </div>
//               <button className="btnGhost" onClick={() => setSelectedCliente(null)}>Cerrar</button>
//             </div>

//             <div className="modalBody">
//               <div className="card">
//                 <h3>Contacto</h3>
//                 <p><strong>Email:</strong> {selectedCliente.email}</p>
//                 <p><strong>Tel:</strong> {selectedCliente.phone || "—"}</p>
//                 <p><strong>Total reservas:</strong> {selectedCliente.totalReservas}</p>
//                 <p className="adminMuted">
//                   Estados: P {selectedCliente.statuses.pending} / C {selectedCliente.statuses.confirmed} / X {selectedCliente.statuses.cancelled}
//                 </p>
//               </div>

//               <div className="card">
//                 <h3>Reservas del cliente</h3>
//                 <ul className="sideList">
//                   {reservas
//                     .filter((r) => (r.email || "").toLowerCase() === selectedCliente.email.toLowerCase())
//                     .slice(0, 30)
//                     .map((r) => (
//                       <li key={r.id} className="sideItem">
//                         <div className="sideMain">
//                           <button className="linkLike" onClick={() => setSelectedReserva(r)}>
//                             Reserva #{r.id}
//                           </button>
//                           <span className={`status ${r.status}`}>{r.status}</span>
//                         </div>
//                         <div className="adminMuted">
//                           {fmtDate(r.checkIn)} → {fmtDate(r.checkOut)} • {r.roomType || "—"}
//                         </div>
//                       </li>
//                     ))}
//                 </ul>
//               </div>

//               <div className="modalActions">
//                 <button className="btnPrimary" onClick={openCreateModal}>
//                   + Nueva reserva para este cliente
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }