const mongoose = require('mongoose')


const copySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: { type: String },
  name: { type: String },
  wins: { type: Number },
  losses: { type: Number },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  copy: { type: String },
  rate: { type: Number },
  profit: { type: Number },
  earnings: { type: Number },
  from: { type: Number },
  to: { type: Number },
  bankState: { type: String },
  salesState: { type: String },
  currency: { type: String },
  amount: { type: Number },
}, { timestamps: true })

module.exports = mongoose.model("Copy", copySchema)
