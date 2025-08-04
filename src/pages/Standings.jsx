import React, { useEffect, useState } from "react";
import { obtenerTablaPosiciones } from "../services/matchService";

const Standings = () => {
  const [tabla, setTabla] = useState([]);

  useEffect(() => {
    const fetchTabla = async () => {
      try {
        const data = await obtenerTablaPosiciones();
        setTabla(data);
      } catch (error) {
        console.error("Error al cargar la tabla:", error);
      }
    };

    fetchTabla();
  }, []);

  return (
    <div>
      <h2>📊 Tabla de posiciones</h2>
      {tabla.length === 0 ? (
        <p>No hay datos aún.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>#</th>
              <th>Equipo</th>
              <th>Pts</th>
              <th>PJ</th>
              <th>PG</th>
              <th>PE</th>
              <th>PP</th>
              <th>GF</th>
              <th>GC</th>
              <th>Dif</th>
            </tr>
          </thead>
          <tbody>
            {tabla.map((equipo, index) => (
              <tr key={equipo.nombreEquipo}>
                <td>{index + 1}</td>
                <td>{equipo.nombreEquipo}</td>
                <td>{equipo.puntos}</td>
                <td>{equipo.jugados}</td>
                <td>{equipo.ganados}</td>
                <td>{equipo.empatados}</td>
                <td>{equipo.perdidos}</td>
                <td>{equipo.gf}</td>
                <td>{equipo.gc}</td>
                <td>{equipo.diferencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Standings;
