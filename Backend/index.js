import dotenv from 'dotenv';
import Fastify from 'fastify';
import mongoose from 'mongoose';
import User from './Data_base/models/user.model.js';


dotenv.config();

const fastify = Fastify();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Error MongoDB:', err));

// Ruta de prueba
fastify.get('/api/saludo', async (req, reply) => {
  reply.send({ mensaje: 'Hola EcoLimpio!' });
});

// Importar el modelo de usuario
fastify.post('/api/register', async (req, reply) => {
  try {
    const nuevoUsuario = new User(req.body);
    await nuevoUsuario.save();
    reply.send({ mensaje: 'Usuario registrado' });
  } catch (err) {
    reply.status(400).send({ error: 'No se pudo registrar', detalles: err.message || err });
  }
});





fastify.listen({ port: 3000 }, (err) => {
  if (err) throw err;
  console.log('Servidor en http://localhost:3000');
});
