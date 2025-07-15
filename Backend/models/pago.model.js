import mongoose from 'mongoose';

const pagoSchema = new mongoose.Schema({
  solicitud: { type: mongoose.Schema.Types.ObjectId, ref: 'Solicitud', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  monto: Number,
  fechaPago: { type: Date, default: Date.now },
  metodo: String, // Stripe, efectivo, etc.
  estado: String  // exitoso, fallido, pendiente, etc.
});

export default mongoose.model('Pago', pagoSchema);
