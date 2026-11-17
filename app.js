
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const productoRoutes = require("./routes/productoRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal de prueba
app.get("/api", (req, res) => {
  res.status(200).json({
    mensaje: "API de productos funcionando correctamente",
    estado: "OK",
    version: "1.0.0"
  });
});

// Rutas de autenticacion
app.use("/api/auth", authRoutes);
app.use("/api/productos", productoRoutes);

// Rutas inexistentes
app.use((req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada"
  });
});

module.exports = app;
