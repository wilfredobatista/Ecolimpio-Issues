import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  direccion: String,
  rol: { type: String, default: "cliente" },
  fechaRegistro: { type: Date, default: Date.now },
});

export default mongoose.model("Usuario", usuarioSchema);
