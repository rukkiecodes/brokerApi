const router = require("express").Router()
const Deposit = require('../models/deposit')
const User = require('../models/user')
const mongoose = require("mongoose")

router.post('/add', async (req, res) => {
  const { _id, amount, currency, description } = req.body
  try {
    let user = await User.findOne({ _id })

    const newDeposit = await Deposit.create({
      _id: new mongoose.Types.ObjectId(),
      user: user._id,
      amount,
      currency,
      description
    })

    res.json({
      deposit: newDeposit
    })
  } catch (error) {
    throw ("error")
  }
})

module.exports = router