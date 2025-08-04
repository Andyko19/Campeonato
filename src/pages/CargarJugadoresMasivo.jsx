import React, { useState } from "react";
import * as XLSX from "xlsx";
import { registrarJugadoresMasivo } from "../services/playerService";

const CargarJugadoresMasivo = () => {
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleArchivo = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();

    lector.onload = async (evt) => {
      const datos = new Uint8Array(evt.target.result);
      const libro = XLSX.read(datos, { type: "array" });
      const hoja = libro.Sheets[libro.SheetNames[0]];
      const jugadores = XLSX.utils.sheet_to_json(hoja);

      try {
        const res = await registrarJugadoresMasivo(jugadores);
        setMensaje(res.mensaje);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Error al cargar jugadores");
        setMensaje("");
      }
    };

    lector.readAsArrayBuffer(archivo);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto ">
      <h2 className="text-2xl font-bold text-black-600 mb-4">
        Importar Archivo: Equipos
      </h2>

      <p className="mb-2 text-sm text-gray-600">
        📄 Sube un archivo Excel: <br />
        <strong>
          nombre_jugador, genero, subnivel, deporte, nombre_equipo
        </strong>
      </p>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleArchivo}
        className="border px-4 py-2 rounded bg-white shadow"
      />

      {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default CargarJugadoresMasivo;
