import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { getUsuarioDesdeToken } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);

      // 🧠 Decodificamos el token para extraer el rol del usuario
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      const rol = payload?.rol;

      // 🚀 Redireccionamos según el rol
      const usuario = getUsuarioDesdeToken();

      switch (usuario.rol) {
        case "admin":
          navigate("/equipos");
          break;
        case "usuario":
          navigate("/jugadores");
          break;
        case "viewer":
          navigate("/tabla-posiciones");
          break;
        default:
          navigate("/"); // por si acaso
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          🔐 Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-black py-2 rounded hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-600 text-sm text-center">⚠️ {error}</p>
        )}

        <div className="mt-6 text-center text-sm">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
