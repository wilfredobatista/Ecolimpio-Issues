import mongoose from 'mongoose';

const comentarioSchema = new mongoose.Schema({
  solicitud: { type: mongoose.Schema.Types.ObjectId, ref: 'Solicitud', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  comentario: String,
  calificacion: { type: Number, min: 1, max: 5 },
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model('Comentario', comentarioSchema);
