import mongoose from 'mongoose';

const notificacionSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  mensaje: String,
  leido: { type: Boolean, default: false },
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model('Notificacion', notificacionSchema);
