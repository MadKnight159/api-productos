
const express = require("express");
const router = express.Router();

const proteger = require("../middleware/authMiddleware");

const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require("../controllers/productoController");

// Proteger todas las rutas de productos
router.use(proteger);

router.route("/")
  .get(obtenerProductos)
  .post(crearProducto);

router.route("/:id")
  .get(obtenerProducto)
  .put(actualizarProducto)
  .delete(eliminarProducto);

module.exports = router;
