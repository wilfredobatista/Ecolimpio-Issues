import Fastify from "fastify";
import { connectorDB } from "./config/db.js";
import { PORT } from "./config/config.js";
import usuarioRoutes from "./routes/usuario.routes.js";

const fastify = Fastify({ logger: true });

await connectorDB();

fastify.register(usuarioRoutes, { prefix: "/api/usuarios" });

fastify.listen({ port: PORT }, (err, address) => {
  if (err) throw err;
  console.log(`Servidor en ejecución: ${address}`);
});
