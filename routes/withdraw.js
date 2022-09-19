const router = require("express").Router()
const Withdraw = require('../models/withraw')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const mongoose = require("mongoose")
const checkAuth = require("../middleware/auth")
const moment = require('moment')

const uuid = require('uuid-random')

router.post('/withdraw', checkAuth, async (req, res) => {
  const { _id, amount, currency, wallet, name } = req.body
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
      wallet,
      name,
      time: moment().format("MMM Do YY")
    })

    await Transaction.create({
      _id: id,
      user: user._id,
      amount,
      currency,
      ref_x,
      wallet,
      name,
      status: 'PENDING',
      type: 'withdraw',
      time: moment().format("MMM Do YY")
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
