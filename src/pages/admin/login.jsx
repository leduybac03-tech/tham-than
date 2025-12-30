import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../lib/http";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("login")) {
      navigate("/admin");
    }
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await http.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("login", "true");
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundImage: "url('../bg.jpg')" }}
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
    >
      {/* Overlay đỏ */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-red-800/80 to-yellow-900/70" />

      {/* Card login */}
      <div
        className="
          relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl
          bg-gradient-to-br from-red-600 to-red-900
          animate-[fadeInUp_0.8s_ease-out]
        "
      >
        <h1
          className="
            text-3xl font-extrabold text-center mb-6
            text-yellow-300 tracking-wide
            drop-shadow
          "
        >
          ĐĂNG NHẬP HỆ THỐNG
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full px-4 py-2 rounded-lg
              bg-white/90 border border-yellow-300
              focus:outline-none focus:ring-2 focus:ring-yellow-400
              transition
            "
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-4 py-2 rounded-lg
              bg-white/90 border border-yellow-300
              focus:outline-none focus:ring-2 focus:ring-yellow-400
              transition
            "
          />

          {error && (
            <p className="text-yellow-200 text-sm text-center animate-pulse">
              {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full py-2 rounded-lg font-bold text-red-900
              bg-gradient-to-r from-yellow-300 to-yellow-400
              hover:from-yellow-400 hover:to-yellow-500
              transition-all duration-300
              hover:scale-[1.02]
              disabled:opacity-60 disabled:cursor-not-allowed
              shadow-md
            "
          >
            {loading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"}
          </button>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
