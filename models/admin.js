const mongoose = require('mongoose')


const adminSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  avatar: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  admin: Boolean,
  verified: Boolean
}, { timestamps: true })

module.exports = mongoose.model("Admin", adminSchema)