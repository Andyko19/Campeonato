const pool = require("./config/db");

async function testConexion() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Conexión exitosa:", res.rows[0]);
  } catch (error) {
    console.error("❌ Error de conexión:", error);
  } finally {
    pool.end();
  }
}

testConexion();
