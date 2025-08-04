const bcrypt = require("bcryptjs");

// Usuario de prueba (admin@admin.com / 123456)
const usuarios = [
  {
    id: 1,
    email: "admin@admin.com",
    password: bcrypt.hashSync("123456", 10),
    rol: "admin",
  },
];

const agregarUsuario = (nuevoUsuario) => {
  usuarios.push(nuevoUsuario);
};

module.exports = {
  usuarios,
  agregarUsuario,
};
