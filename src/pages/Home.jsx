import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="bg-sky-600 text-black  shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2 ">
            🏆 Campeonato Escolar
          </h1>
          <div className="flex gap-4 justify-end">
            <Link
              to="/login"
              className="bg-white text-sky-700 font-semibold px-4 py-2 rounded hover:bg-sky-100 transition"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/registro"
              className="bg-yellow-400 text-sky-900 font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-grow bg-gradient-to-b from-white to-blue-50 flex items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-extrabold text-sky-800 mb-6 mt-10">
            Bienvenido al Torneo SAN JUAN EVANGELISTA 2025
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Registra los equipos, jugadores y resultados de los diferentes
            deportes. Visualiza tablas de posiciones actualizadas.
          </p>
          <Link
            to="/registro"
            className="inline-block bg-sky-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-sky-700 transition"
          >
            ¡Empieza ahora!
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
