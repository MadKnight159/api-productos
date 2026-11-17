
const express = require("express");
const cors = require("cors");
const path = require("path");

const conectarDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productoRoutes = require("./routes/productoRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta de prueba
app.get("/api", (req, res) => {
    res.status(200).json({
        mensaje: "API de productos funcionando correctamente",
        estado: "OK",
        version: "1.0.0"
    });
});

// Asegurar conexión antes de consultar MongoDB
app.use("/api", async (req, res, next) => {
    try {
        await conectarDB();
        next();
    } catch (error) {
        console.error("Error de conexión MongoDB:", error.message);

        res.status(503).json({
            mensaje: "Base de datos no disponible"
        });
    }
});

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/productos", productoRoutes);

// Rutas inexistentes
app.use((req, res) => {
    res.status(404).json({
        mensaje: "Ruta no encontrada"
    });
});

module.exports = app;
