const mongoose = require('mongoose')


const investmentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  amount: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true })

module.exports = mongoose.model("Investment", investmentSchema)