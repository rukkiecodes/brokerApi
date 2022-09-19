const mongoose = require('mongoose')

const withdrawSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: { type: String },
  amount: { type: String, required: true },
  name: { type: String },
  currency: { type: String, required: true },
  description: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: { type: String },
  wallet: { type: String },
  ref_x: { type: String },
  time: { type: String },
  verified: Boolean
}, { timestamps: true })

module.exports = mongoose.model("Withdraw", withdrawSchema)
