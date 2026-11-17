
const express = require("express");
const router = express.Router();

const {
  registrar,
  login
} = require("../controllers/authController");

const proteger = require("../middleware/authMiddleware");

router.post("/registro", registrar);
router.post("/login", login);

router.get("/perfil", proteger, (req, res) => {
  res.status(200).json({
    mensaje: "Perfil del usuario",
    usuario: {
      id: req.usuario._id,
      nombre: req.usuario.nombre,
      email: req.usuario.email,
      rol: req.usuario.rol
    }
  });
});

module.exports = router;
