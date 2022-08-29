const mongoose = require('mongoose')


const copySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: { type: String },
  name: { type: String, required: true },
  wins: { type: String, required: true },
  losses: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rate: { type: String },
  profit: { type: String },
}, { timestamps: true })

module.exports = mongoose.model("Copy", copySchema)