const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db"); // conexión a la base de datos

require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    const usuario = result.rows[0];

    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error al hacer login:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

const register = async (req, res) => {
  const { email, password, rol } = req.body;

  try {
    // Verificar si ya existe el usuario
    const existe = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    await pool.query(
      "INSERT INTO usuarios (email, password, rol) VALUES ($1, $2, $3)",
      [email, hashedPassword, rol]
    );

    res.json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar:", error);
    res.status(500).json({ mensaje: "Error al registrar usuario" });
  }
};

module.exports = {
  login,
  register,
};
