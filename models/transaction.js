const mongoose = require('mongoose')


const transactionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: { type: String },
  amount: { type: String },
  currency: { type: String },
  description: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pop: { type: String },
  status: { type: String },
  wallet: { type: String },
  ref_x: { type: String },
  type: { type: String },
  verified: Boolean
}, { timestamps: true })

module.exports = mongoose.model("Transaction", transactionSchema)