import { registerUsuario } from "../../controllers/auth.controller.js";

async function authRoutes(fastify, options) {
  fastify.post("/register", registerUsuario);
}

export default authRoutes;
