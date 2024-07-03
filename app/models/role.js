// models/Role.js
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name_rol: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true },
});

// Ocultar __v en las respuestas JSON
roleSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const Role = mongoose.model("Role", roleSchema);

export default Role;
