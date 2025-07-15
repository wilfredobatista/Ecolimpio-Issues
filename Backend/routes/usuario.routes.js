import Usuario from "../models/usuario.model.js";

export default async function (fastify, opts) {
  fastify.get("/", async (request, reply) => {
    return { mensaje: "Ruta funcional" };
  });

  fastify.get("/lista", async (request, reply) => {
    const usuarios = await Usuario.find();
    return usuarios;
  });
}
