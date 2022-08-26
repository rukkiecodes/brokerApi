const router = require("express").Router()
const Withdraw = require('../models/withraw')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const mongoose = require("mongoose")

const uuid = require('uuid-random')

router.post('/withdraw', async (req, res) => {
  const { _id, amount, currency, description } = req.body
  try {
    let user = await User.findOne({ _id })

    let id = new mongoose.Types.ObjectId()
    let ref_x = `BLUE_ZONE://${_id}${uuid()}`

    const newWithdraw = await Withdraw.create({
      _id: id,
      user: user._id,
      amount,
      currency,
      ref_x,
      status: 'PENDING',
      description
    })

    await Transaction.create({
      _id: id,
      user: user._id,
      amount,
      currency,
      ref_x,
      description,
      type: 'withdraw'
    })

    return res.json({
      withdraw: newWithdraw,
      user
    })

  } catch (error) {
    throw ("error")
  }
})

module.exports = router