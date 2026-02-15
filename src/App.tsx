import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/home/Home";
import Restaurante from "./pages/restaurante/Restaurante";
import Room from "./pages/rooms/Room";
import History from "./pages/historia/History";
import Area from "./pages/area/Area";
import Reservas from "./components/reservas/Reserva";

/* === LEGAL PAGES === */
import Privacy from "./pages/legal/Privacy";
import LegalNotice from "./pages/legal/LegalNotice";
import Cookies from "./pages/legal/Cookies";

/* === COOKIE BANNER === */
import CookieBanner from "./components/CookieBanner/CookieBanner";

import "./styles/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* === MAIN ROUTES === */}
        <Route path="/" element={<Home />} />
        <Route path="/restaurante" element={<Restaurante />} />
        <Route path="/habitaciones" element={<Room />} />
        <Route path="/historia" element={<History />} />
        <Route path="/entorno" element={<Area />} />
        <Route path="/reservar" element={<Reservas />} />

        {/* === LEGAL ROUTES === */}
        <Route path="/privacidad" element={<Privacy />} />
        <Route path="/aviso-legal" element={<LegalNotice />} />
        <Route path="/cookies" element={<Cookies />} />

        {/* === Redirects (legacy URLs) === */}
        <Route path="/rooms" element={<Navigate to="/habitaciones" replace />} />
        <Route path="/area" element={<Navigate to="/entorno" replace />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />

      {/* Banner global de cookies */}
      <CookieBanner />
    </BrowserRouter>
  );
}