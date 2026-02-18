import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/home/Home";
import Restaurante from "./pages/restaurante/Restaurante";
import Room from "./pages/rooms/Room";
import History from "./pages/historia/History";
import Area from "./pages/area/Area";
import Reservas from "./components/reservas/Reserva";

/* === ADMIN === */
import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/Login";

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

import "./styles/App.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* ✅ Siempre al top en cada cambio de ruta */}
      <ScrollToTop />

      {/* ✅ Mantiene i18n sync con la URL /:lang/... */}
      <LanguageSync />

      {/* ✅ Navbar y Footer quedan globales (se ven también en admin).
          Si NO quieres Navbar/Footer en admin, se hace con layout aparte. */}
      <Navbar />

      <Routes>
        /* =========================================================
           1 RUTAS CON IDIOMA (IMPORTANTE EL ORDEN)
           - Admin/login y admin deben ir ANTES del catch-all /:lang/*
        ========================================================= */

        {/* ✅ ADMIN LOGIN con idioma */}
        <Route path="/:lang/admin/login" element={<AdminLogin />} />

        {/* ✅ ADMIN panel con idioma */}
        <Route path="/:lang/admin" element={<Admin />} />

        {/* Páginas principales con idioma */}
        <Route path="/:lang/restaurante" element={<Restaurante />} />
        <Route path="/:lang/habitaciones" element={<Room />} />
        <Route path="/:lang/historia" element={<History />} />
        <Route path="/:lang/entorno" element={<Area />} />
        <Route path="/:lang/reservar" element={<Reservas />} />
        <Route path="/:lang/contacto" element={<Contacto />} />

        {/* Legal con idioma */}
        <Route path="/:lang/privacidad" element={<Privacy />} />
        <Route path="/:lang/aviso-legal" element={<LegalNotice />} />
        <Route path="/:lang/cookies" element={<Cookies />} />

        {/* ✅ CATCH-ALL del idioma: siempre al final del bloque /:lang/
            Si lo pones arriba, "se come" /:lang/admin/login y te manda a Home */}
        <Route path="/:lang/*" element={<Home />} />

        /* =========================================================
           2 RUTAS DE ERROR (sin idioma)
        ========================================================= */
        <Route path="/401" element={<Unauthorized />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="/500" element={<ServerError />} />

        /* =========================================================
           3LEGACY ROUTES sin idioma -redirigen a /es/...
        ========================================================= */

        {/* Home raíz */}
        <Route path="/" element={<Navigate to="/es" replace />} />

        {/* Legacy principales */}
        <Route path="/restaurante" element={<Navigate to="/es/restaurante" replace />} />
        <Route path="/habitaciones" element={<Navigate to="/es/habitaciones" replace />} />
        <Route path="/historia" element={<Navigate to="/es/historia" replace />} />
        <Route path="/entorno" element={<Navigate to="/es/entorno" replace />} />
        <Route path="/reservar" element={<Navigate to="/es/reservar" replace />} />
        <Route path="/contacto" element={<Navigate to="/es/contacto" replace />} />

        {/* ✅ Legacy admin: manda al login en ES (el panel se protege por token) */}
        <Route path="/admin" element={<Navigate to="/es/admin/login" replace />} />
        <Route path="/admin/login" element={<Navigate to="/es/admin/login" replace />} />

        {/* Legacy legal */}
        <Route path="/privacidad" element={<Navigate to="/es/privacidad" replace />} />
        <Route path="/aviso-legal" element={<Navigate to="/es/aviso-legal" replace />} />
        <Route path="/cookies" element={<Navigate to="/es/cookies" replace />} />

        {/* =========================================================
           4) REDIRECTS “viejos”
        ========================================================= */}
        <Route path="/rooms" element={<Navigate to="/es/habitaciones" replace />} />
        <Route path="/area" element={<Navigate to="/es/entorno" replace />} />

        /* =========================================================
           5 404 GLOBAL
        ========================================================= */
        <Route path="*" element={<NotFound />} />
      </Routes>

      <CookieBanner />
      <Footer />
    </BrowserRouter>
  );
}