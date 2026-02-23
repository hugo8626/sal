import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useParams,
} from "react-router-dom";

import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/home/Home";
import Servicios from "./pages/servicios/Servicios";
import Restaurante from "./pages/restaurante/Restaurante";
import Room from "./pages/rooms/Room";
import History from "./pages/historia/History";
import Area from "./pages/area/Area";

/* === CONTACTO === */
import Contacto from "./pages/contacto/Contacto";

/* === LEGAL PAGES === */
import Privacy from "./pages/legal/Privacy";
import LegalNotice from "./pages/legal/LegalNotice";
import Cookies from "./pages/legal/Cookies";

/* === 401 / 403 / 500 === */
import Unauthorized from "./pages/errors/Unauthorized";
import Forbidden from "./pages/errors/Forbidden";
import ServerError from "./pages/errors/ServerError";

/* === 404 === */
import NotFound from "./pages/notfound/NotFound";

/* === SCROLL + LANGUAGE === */
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import LanguageSync from "./components/language/LanguageSync";

/* === COOKIE BANNER === */
import CookieBanner from "./components/CookieBanner/CookieBanner";

/* URL reservas */
const BOOKING_URL =
  "https://direct-book.com/properties/tavernadelasaldirect?locale=es&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=EUR&trackPage=yes";

/* =========================
   Idiomas soportados
========================= */

const SUPPORTED = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED)[number];

/**
 * LangGuard
 * - Valida que :lang sea uno permitido
 * - Si no lo es, redirige a /es
 */
function LangGuard() {
  const { lang } = useParams<{ lang: SupportedLang }>();

  if (!lang || !SUPPORTED.includes(lang)) {
    return <Navigate to="/es" replace />;
  }

  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageSync />

      <Navbar />

      <Routes>
        {/* ================== RUTAS CON IDIOMA ================== */}
        <Route path="/:lang" element={<LangGuard />}>
          <Route index element={<Home />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="restaurante" element={<Restaurante />} />
          <Route path="habitaciones" element={<Room />} />
          <Route path="historia" element={<History />} />
          <Route path="entorno" element={<Area />} />

          {/* RESERVAS → MOTOR EXTERNO */}
          <Route
            path="reservar"
            element={<Navigate to={BOOKING_URL} replace />}
          />

          <Route path="contacto" element={<Contacto />} />

          {/* LEGAL */}
          <Route path="privacidad" element={<Privacy />} />
          <Route path="aviso-legal" element={<LegalNotice />} />
          <Route path="cookies" element={<Cookies />} />

          {/* 404 dentro de idioma */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ================== ERRORES ================== */}
        <Route path="/401" element={<Unauthorized />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/500" element={<ServerError />} />

        {/* ================== LEGACY SIN IDIOMA ================== */}
        <Route path="/" element={<Navigate to="/es" replace />} />
        <Route
          path="/servicios"
          element={<Navigate to="/es/servicios" replace />}
        />
        <Route
          path="/restaurante"
          element={<Navigate to="/es/restaurante" replace />}
        />
        <Route
          path="/habitaciones"
          element={<Navigate to="/es/habitaciones" replace />}
        />
        <Route
          path="/historia"
          element={<Navigate to="/es/historia" replace />}
        />
        <Route
          path="/entorno"
          element={<Navigate to="/es/entorno" replace />}
        />

        <Route path="/reservar" element={<Navigate to={BOOKING_URL} replace />} />

        <Route
          path="/contacto"
          element={<Navigate to="/es/contacto" replace />}
        />
        <Route
          path="/privacidad"
          element={<Navigate to="/es/privacidad" replace />}
        />
        <Route
          path="/aviso-legal"
          element={<Navigate to="/es/aviso-legal" replace />}
        />
        <Route
          path="/cookies"
          element={<Navigate to="/es/cookies" replace />}
        />

        {/* REDIRECTS ANTIGUOS */}
        <Route
          path="/rooms"
          element={<Navigate to="/es/habitaciones" replace />}
        />
        <Route
          path="/area"
          element={<Navigate to="/es/entorno" replace />}
        />

        {/* 404 GLOBAL */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <CookieBanner />
      <Footer />
    </BrowserRouter>
  );
}
