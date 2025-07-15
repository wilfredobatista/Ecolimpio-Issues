import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tipoDesecho: { type: String, required: true },
  descripcion: String,
  fotos: [String],
  estado: { type: String, default: 'pendiente' },
  costo: Number,
  fechaSolicitud: { type: Date, default: Date.now },
  ubicacion: String
});

export default mongoose.model('Solicitud', solicitudSchema);
