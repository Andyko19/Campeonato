import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import RutaPrivada from "./components/RutaPrivada";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Equipos from "./pages/Equipos";
import Jugadores from "./pages/Jugadores";
import Partidos from "./pages/Partidos";
import PlayersByTeam from "./pages/PlayersByTeam";
import TablaPosiciones from "./pages/TablaPosiciones";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import CargarJugadoresMasivo from "./pages/CargarJugadoresMasivo";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Rutas protegidas dentro del dashboard */}
      <Route
        element={
          <RutaPrivada>
            <DashboardLayout />
          </RutaPrivada>
        }
      >
        {/* Accesibles por rol */}
        <Route path="/equipos" element={<Equipos />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="/jugadores-por-equipo" element={<PlayersByTeam />} />
        <Route path="/tabla-posiciones" element={<TablaPosiciones />} />
        <Route path="/cargar-jugadores" element={<CargarJugadoresMasivo />} />
      </Route>

      {/* Página 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
