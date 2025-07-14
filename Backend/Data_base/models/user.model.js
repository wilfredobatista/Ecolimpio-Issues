import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  direccion: String,
  rol: { type: String, default: 'cliente' }
});

export default mongoose.model('User', userSchema);
