
require("dotenv").config();

const dns = require("dns");
const app = require("./app");
const conectarDB = require("./config/db");

// Configurar DNS para resolver MongoDB Atlas
if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await conectarDB();

    app.listen(PORT, () => {
      console.log("--------------------------------");
      console.log("MongoDB conectado correctamente");
      console.log("Servidor iniciado correctamente");
      console.log(`URL: http://localhost:${PORT}`);
      console.log("--------------------------------");
    });

  } catch (error) {
    console.error("No fue posible iniciar el servidor");
    console.error(error.message);
    process.exit(1);
  }
};

iniciarServidor();
