import TeamForm from "../components/forms/TeamForm";
import { registrarEquipo } from "../services/teamService";

const RegisterTeam = () => {
  const handleRegisterTeam = async (equipo) => {
    try {
      const resultado = await registrarEquipo(equipo);
      console.log("Equipo guardado:", resultado);
      alert("✅ Equipo registrado correctamente");
    } catch (error) {
      alert("❌ Error al registrar el equipo");
    }
  };

  return (
    <div>
      <TeamForm onSubmit={handleRegisterTeam} />
    </div>
  );
};

export default RegisterTeam;
