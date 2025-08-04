import PlayerForm from "../components/forms/PlayerForm";
import { registrarJugador } from "../services/playerService";

const RegisterPlayer = () => {
  const handleRegisterPlayer = async (jugador) => {
    try {
      const resultado = await registrarJugador(jugador);
      console.log("Jugador registrado:", resultado);
      alert("✅ Jugador registrado correctamente");
    } catch (error) {
      alert("❌ Error al registrar el jugador");
    }
  };

  return (
    <div>
      <PlayerForm onSubmit={handleRegisterPlayer} />
    </div>
  );
};

export default RegisterPlayer;
