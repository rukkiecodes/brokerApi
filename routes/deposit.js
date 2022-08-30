const router = require("express").Router()
const Deposit = require('../models/deposit')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const mongoose = require("mongoose")
const checkAuth = require("../middleware/auth")

const uuid = require('uuid-random')

router.post('/add', checkAuth, async (req, res) => {
  const { _id, amount, currency, description } = req.body
  try {
    let user = await User.findOne({ _id })

    let id = new mongoose.Types.ObjectId()
    let ref_x = `BLUE_ZONE://${_id}${uuid()}`

    const newDeposit = await Deposit.create({
      _id: id,
      user: user._id,
      amount,
      currency,
      description,
      status: 'PENDING',
      ref_x
    })

    await Transaction.create({
      _id: id,
      user: user._id,
      amount,
      currency,
      description,
      status: 'PENDING',
      ref_x,
      type: 'deposit'
    })

    return res.json({
      deposit: newDeposit
    })

  } catch (error) {
    throw ("error")
  }
})

module.exports = router