import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const SUPPORTED_LANGS = ["es", "en", "fr", "ca"] as const;
type SupportedLang = (typeof SUPPORTED_LANGS)[number];

function isSupportedLang(x: string): x is SupportedLang {
  return (SUPPORTED_LANGS as readonly string[]).includes(x);
}

function getLang(): SupportedLang {
  const raw = localStorage.getItem("i18nextLng") || "es";
  const base = raw.split("-")[0];
  return isSupportedLang(base) ? base : "es";
}

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Si ya hay token → entra directo
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      navigate(`/${getLang()}/admin`, { replace: true });
    }
  }, [navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔓 LOGIN FALSO PARA DESARROLLO
    localStorage.setItem("admin_token", "dev-token");

    navigate(`/${getLang()}/admin`, { replace: true });
  };

  return (
    <main className="adminLoginPage">
      <div className="adminLoginCard">
        <p className="adminLoginEyebrow">ADMIN</p>
        <h1 className="adminLoginTitle">Modo Desarrollo</h1>
        <p className="adminLoginSub">
          Acceso temporal sin validación backend.
        </p>

        <form className="adminLoginForm" onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hotel.com"
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button className="adminLoginBtn" type="submit">
            Entrar al panel
          </button>

          <button
            type="button"
            className="adminLoginGhost"
            onClick={() => navigate(`/${getLang()}`, { replace: true })}
          >
            Volver a la web
          </button>
        </form>
      </div>
    </main>
  );
}