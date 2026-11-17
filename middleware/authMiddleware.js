
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const proteger = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        mensaje: "Token no proporcionado"
      });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await Usuario.findById(decoded.id);

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Usuario no autorizado"
      });
    }

    req.usuario = usuario;
    next();

  } catch (error) {
    return res.status(401).json({
      mensaje: "Token invalido o expirado"
    });
  }
};

module.exports = proteger;
