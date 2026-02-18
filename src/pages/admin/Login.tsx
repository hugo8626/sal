import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Si ya hay token, manda al admin
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) navigate(`/${getLang()}/admin`, { replace: true });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Completa email y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Credenciales incorrectas.");
      }

      const data = await res.json();
      const token: string | undefined = data.token || data.admin_token;

      if (!token) throw new Error("El backend no devolvió token.");

      localStorage.setItem("admin_token", token);
      navigate(`/${getLang()}/admin`, { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="adminLoginPage">
      <div className="adminLoginCard">
        <p className="adminLoginEyebrow">ADMIN</p>
        <h1 className="adminLoginTitle">Iniciar sesión</h1>
        <p className="adminLoginSub">
          Accede al panel para gestionar reservas.
        </p>

        {error && (
          <div className="adminLoginError">
            <strong>Error:</strong> {error}
          </div>
        )}

        <form className="adminLoginForm" onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hotel.com"
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button className="adminLoginBtn" disabled={loading} type="submit">
            {loading ? "Entrando…" : "Entrar"}
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