const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  avatar: { type: String },
  rating: { type: Number },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  referal: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String },
  state: { type: String },
  lga: { type: String },
  specialty: { type: String },
  password: { type: String, required: true },
  description: { type: String },
  verified: Boolean
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)