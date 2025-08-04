import React from "react";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {/* Footer */}
      <footer className="bg-sky-100 text-center py-3 text-sm text-gray-600 shadow-inner">
        © {new Date().getFullYear()} AG19 · Todos los derechos reservados
      </footer>
    </div>
  );
}

export default App;
