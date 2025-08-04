import React, { useEffect, useState } from "react";
import { obtenerTablaPosiciones } from "../services/matchService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getUsuarioDesdeToken } from "../utils/auth";

const TablaPosiciones = () => {
  const [tabla, setTabla] = useState([]);
  const [filtros, setFiltros] = useState({
    deporte: "",
    genero: "",
    subnivel: "",
  });

  const cargarDatos = async () => {
    if (filtros.deporte && filtros.genero && filtros.subnivel) {
      const datos = await obtenerTablaPosiciones(filtros);
      setTabla(datos);
    } else {
      setTabla([]);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [filtros]);

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Tabla de Posiciones", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Equipo", "PJ", "PG", "PE", "PP", "GF", "GC", "PTS"]],
      body: tabla.map((fila) => [
        fila.nombreEquipo,
        fila.jugados,
        fila.ganados,
        fila.empatados,
        fila.perdidos,
        fila.gf,
        fila.gc,
        fila.puntos,
      ]),
    });

    doc.save("tabla-posiciones.pdf");
  };

  const exportarExcel = () => {
    const worksheetData = tabla.map((fila) => ({
      Equipo: fila.nombreEquipo,
      PJ: fila.jugados,
      PG: fila.ganados,
      PE: fila.empatados,
      PP: fila.perdidos,
      GF: fila.gf,
      GC: fila.gc,
      PTS: fila.puntos,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tabla");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "tabla-posiciones.xlsx");
  };

  const mayorGF = Math.max(...tabla.map((e) => e.gf || 0));
  const usuario = getUsuarioDesdeToken();

  return (
    <div className="h-full bg-gradient-to-b from-white to-blue-50 flex items-center justify-center px-6 text-center">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          📊 Tabla de Posiciones
        </h2>

        {usuario && (
          <p className="text-center text-sm italic text-gray-500 mb-4">
            Hola: {usuario.email} ({usuario.rol})
          </p>
        )}

        <div className="flex flex-wrap gap-3 mb-4 justify-center">
          <select
            name="deporte"
            value={filtros.deporte}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="">Deporte</option>
            <option value="futbol">Fútbol</option>
            <option value="baloncesto">Baloncesto</option>
          </select>

          <select
            name="genero"
            value={filtros.genero}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="">Género</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>

          <select
            name="subnivel"
            value={filtros.subnivel}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="">Subnivel</option>
            <option value="inicial">Inicial</option>
            <option value="preparatoria">Preparatoria</option>
            <option value="elemental">Elemental</option>
            <option value="media">Media</option>
            <option value="superior">Superior</option>
            <option value="bachillerato">Bachillerato</option>
          </select>

          <button
            onClick={exportarPDF}
            disabled={tabla.length === 0}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            📄 PDF
          </button>
          <button
            onClick={exportarExcel}
            disabled={tabla.length === 0}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            📊 Excel
          </button>
        </div>

        {tabla.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border rounded-lg overflow-hidden shadow-sm bg-white">
              <thead className="bg-blue-600 text-white text-sm">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2 text-left">Equipo</th>
                  <th>PJ</th>
                  <th>PG</th>
                  <th>PE</th>
                  <th>PP</th>
                  <th>GF</th>
                  <th>GC</th>
                  <th>PTS</th>
                </tr>
              </thead>
              <tbody>
                {tabla.map((fila, index) => {
                  const isTop3 = index < 3;
                  const colorFila = isTop3
                    ? "bg-yellow-100"
                    : index % 2 === 0
                    ? "bg-gray-50"
                    : "bg-white";

                  const esMayorGF = fila.gf === mayorGF;
                  const medalla = ["🥇", "🥈", "🥉"][index] || "";

                  return (
                    <tr
                      key={fila.nombreEquipo}
                      className={`${colorFila} text-center`}
                    >
                      <td className="px-4 py-2 font-bold">
                        {index + 1} {medalla}
                      </td>
                      <td
                        className={`px-4 py-2 text-left font-semibold ${
                          esMayorGF ? "text-green-600" : ""
                        }`}
                      >
                        {fila.nombreEquipo}
                      </td>
                      <td>{fila.jugados}</td>
                      <td>{fila.ganados}</td>
                      <td>{fila.empatados}</td>
                      <td>{fila.perdidos}</td>
                      <td>{fila.gf}</td>
                      <td>{fila.gc}</td>
                      <td className="font-bold">{fila.puntos}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center mt-6 text-gray-600">
            🔍 Selecciona filtros válidos para mostrar la tabla.
          </p>
        )}
      </div>
    </div>
  );
};

export default TablaPosiciones;
