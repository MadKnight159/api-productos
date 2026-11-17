
const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI no esta configurada");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log("MongoDB conectado correctamente");
    console.log("Base de datos:", mongoose.connection.name);

  } catch (error) {
    console.error("Error al conectar MongoDB:", error.message);
    throw error;
  }
};

module.exports = conectarDB;
