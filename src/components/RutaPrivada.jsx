import { Navigate } from "react-router-dom";
import { getUsuarioDesdeToken } from "../utils/auth";

const RutaPrivada = ({ children, rolesPermitidos }) => {
  const token = localStorage.getItem("token");
  const usuario = getUsuarioDesdeToken();

  if (!token) return <Navigate to="/login" />;

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/no-autorizado" />;
  }

  return children;
};

export default RutaPrivada;
