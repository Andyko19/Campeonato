import MatchForm from "../components/forms/MatchForm";
import { registrarPartido } from "../services/matchService";

const RegisterMatch = () => {
  const handleRegisterMatch = async (partido) => {
    try {
      const resultado = await registrarPartido(partido);
      console.log("Partido registrado:", resultado);
      alert("✅ Partido registrado correctamente");
    } catch (error) {
      alert("❌ Error al registrar el partido");
    }
  };

  return (
    <div>
      <MatchForm onSubmit={handleRegisterMatch} />
    </div>
  );
};

export default RegisterMatch;
