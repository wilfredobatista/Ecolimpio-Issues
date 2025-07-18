import Fastify from "fastify";
import { connectorDB } from "./config/db.js";
import { PORT } from "./config/config.js";
import usuarioRoutes from "./routes/v1/usuario.routes.js";
import authRoutes from "./routes/v1/aut.routes.js";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });

//Servir archivos estáticos (CSS, JS, imágenes, etc.)
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "../Frontend"),
  prefix: "/", // Ruta para acceder a los archivos estáticos
});

//Ruta raíz que devuelve el HTML principal
fastify.get("/", async (req, reply) => {
  return reply.sendFile("views/index.html");
});

await connectorDB();

//Registrar rutas de usuario
fastify.register(usuarioRoutes, { prefix: "/api/usuarios" });
fastify.register(authRoutes, { prefix: "/api/v1/auth" });

fastify.listen({ port: PORT }, (err, address) => {
  if (err) throw err;
  console.log(`Servidor en ejecución: ${address}`);
});
