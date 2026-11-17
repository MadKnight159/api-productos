
const mongoose = require("mongoose");
const Producto = require("../models/Producto");

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find()
      .sort({ createdAt: -1 });

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar productos"
    });
  }
};

// Obtener producto por ID
const obtenerProducto = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        mensaje: "ID de producto invalido"
      });
    }

    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al consultar producto"
    });
  }
};

// Crear producto
const crearProducto = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      stock,
      categoria
    } = req.body;

    const producto = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      creadoPor: req.usuario._id
    });

    res.status(201).json({
      mensaje: "Producto creado correctamente",
      producto
    });
  } catch (error) {
    if (error.name === "ValidationError" ||
        error.name === "CastError") {
      return res.status(400).json({
        mensaje: "Datos del producto invalidos"
      });
    }

    res.status(500).json({
      mensaje: "Error al crear producto"
    });
  }
};

// Actualizar producto
const actualizarProducto = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        mensaje: "ID de producto invalido"
      });
    }

    const camposPermitidos = [
      "nombre",
      "descripcion",
      "precio",
      "stock",
      "categoria"
    ];

    const cambios = {};

    for (const campo of camposPermitidos) {
      if (Object.prototype.hasOwnProperty.call(req.body, campo)) {
        cambios[campo] = req.body[campo];
      }
    }

    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      cambios,
      {
        new: true,
        runValidators: true
      }
    );

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Producto actualizado correctamente",
      producto
    });
  } catch (error) {
    if (error.name === "ValidationError" ||
        error.name === "CastError") {
      return res.status(400).json({
        mensaje: "Datos del producto invalidos"
      });
    }

    res.status(500).json({
      mensaje: "Error al actualizar producto"
    });
  }
};

// Eliminar producto
const eliminarProducto = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        mensaje: "ID de producto invalido"
      });
    }

    const producto = await Producto.findByIdAndDelete(
      req.params.id
    );

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.status(200).json({
      mensaje: "Producto eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar producto"
    });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
