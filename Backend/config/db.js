import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

export const connectorDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    process.exit(1);
  }
};
