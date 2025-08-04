import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col bg-gray-100">
      {/* Barra de navegación arriba */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
