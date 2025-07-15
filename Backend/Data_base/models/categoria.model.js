import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  icono: String
});

export default mongoose.model('Categoria', categoriaSchema);
