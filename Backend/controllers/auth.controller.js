// controllers/auth.controller.js
import bcrypt from "bcrypt";
import Usuario from "../models/usuario.model.js";

export async function registerUsuario(req, reply) {
  try {
    const { nombre, correo, contrasena } = req.body;

    // Validaciones simples
    if (!nombre || !correo || !contrasena) {
      return reply
        .status(400)
        .send({ mensaje: "Todos los campos son obligatorios." });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return reply
        .status(400)
        .send({ mensaje: "El correo ya está registrado." });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasena, salt);

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      contrasena: hash,
    });

    await nuevoUsuario.save();

    return reply.status(201).send({ mensaje: "Usuario registrado con éxito." });
  } catch (error) {
    console.error("Error en registro:", error);
    return reply.status(500).send({ mensaje: "Error del servidor." });
  }
}
