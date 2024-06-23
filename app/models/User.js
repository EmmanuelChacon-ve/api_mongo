// models/User.js
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  role_name: { type: String },
  status: { type: String },
});

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  numero: { type: String, required: true },
  image: { type: String },
  password: { type: String, required: true },
  status: { type: String, required: true },
  roles: [roleSchema],
});

// Ocultar __v en las respuestas JSON
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
