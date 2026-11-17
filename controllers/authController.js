
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

// Generar token JWT
const generarToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
};

// Registrar usuario
const registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (
      typeof nombre !== "string" ||
      !nombre.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      password.length < 8
    ) {
      return res.status(400).json({
        mensaje: "Ingresa nombre, email y contraseña de al menos 8 caracteres"
      });
    }

    const correo = email.trim().toLowerCase();

    const existe = await Usuario.findOne({ email: correo });

    if (existe) {
      return res.status(409).json({
        mensaje: "El correo ya esta registrado"
      });
    }

    const usuario = await Usuario.create({
      nombre: nombre.trim(),
      email: correo,
      password
    });

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      },
      token: generarToken(usuario._id.toString())
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "El correo ya esta registrado"
      });
    }

    console.error("Error al registrar usuario:", error.message);
    res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
};

// Iniciar sesion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        mensaje: "Email y contraseña son obligatorios"
      });
    }

    const usuario = await Usuario.findOne({
      email: email.trim().toLowerCase()
    }).select("+password");

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    const valida = await usuario.compararPassword(password);

    if (!valida) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    res.status(200).json({
      mensaje: "Inicio de sesion exitoso",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      },
      token: generarToken(usuario._id.toString())
    });

  } catch (error) {
    console.error("Error en login:", error.message);
    res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
};

module.exports = {
  registrar,
  login
};
