import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, getUsuarioDesdeToken } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const usuario = getUsuarioDesdeToken();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderEnlacesPorRol = () => {
    if (!usuario?.rol) return null;

    switch (usuario.rol) {
      case "admin":
        return (
          <>
            <Link to="/equipos" className="hover:text-yellow-300">
              Equipos
            </Link>
            <Link to="/jugadores" className="hover:text-yellow-300">
              Jugadores
            </Link>
            <Link to="/partidos" className="hover:text-yellow-300">
              Partidos
            </Link>
            <Link to="/tabla-posiciones" className="hover:text-yellow-300">
              Tabla
            </Link>
            <Link to="/jugadores-por-equipo" className="hover:text-yellow-300">
              Consulta
            </Link>
            <Link to="/cargar-jugadores" className="hover:text-yellow-300">
              Importar
            </Link>
          </>
        );
      case "usuario":
        return (
          <>
            <Link to="/jugadores" className="hover:text-yellow-300">
              Jugadores
            </Link>
            <Link to="/partidos" className="hover:text-yellow-300">
              Partidos
            </Link>
            <Link to="/tabla-posiciones" className="hover:text-yellow-300">
              Tabla
            </Link>
            <Link to="/jugadores-por-equipo" className="hover:text-yellow-300">
              Consulta
            </Link>
          </>
        );
      case "viewer":
        return (
          <Link to="/tabla-posiciones" className="hover:text-yellow-300">
            Tabla
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="bg-cyan-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-extrabold tracking-wide flex items-center gap-2"
        >
          🏆 Campeonato
        </Link>

        {/* Menú en escritorio */}
        <div className="hidden md:flex items-center justify-center gap-6">
          {isAuthenticated() && renderEnlacesPorRol()}
        </div>

        {/* Login / logout */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated() ? (
            <>
              <span className="text-sm italic text-white/80">
                Bienvenido: {usuario?.email} ({usuario?.rol})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-green-800 font-semibold px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="bg-yellow-400 text-green-900 font-semibold px-3 py-1 rounded hover:bg-yellow-300 transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Botón hamburguesa en móvil */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          ☰
        </button>
      </div>

      {/* Menú desplegable en móvil */}
      {menuAbierto && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {isAuthenticated() ? (
            <>
              <div className="flex flex-col gap-2">{renderEnlacesPorRol()}</div>
              <p className="text-sm text-white/80">
                Bienvenido: {usuario?.email} ({usuario?.rol})
              </p>
              <button
                onClick={() => {
                  setMenuAbierto(false);
                  handleLogout();
                }}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-1 text-white hover:text-yellow-300"
                onClick={() => setMenuAbierto(false)}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="block py-1 text-white hover:text-yellow-300"
                onClick={() => setMenuAbierto(false)}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
