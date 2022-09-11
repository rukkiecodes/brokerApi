const router = require('express').Router()
const Withdraw = require('../models/withraw')
const checkAuth = require("../middleware/auth")

router.post('/withdrawRequest', async (req, res) => {
  let transaction = await Withdraw.find({ status: 'PENDING' })

  return res.status(200).json({
    message: "transaction found",
    transaction,
  })
})

router.post('/confirmWithdrawRequest', async (req, res) => {
  const { _id } = req.body
  try {
    const withraw = await Withdraw.updateOne({ _id }, { $set: { status: 'CONFIRMED' } })

    res.json({
      withraw
    })
  } catch (error) {
    return res.status(401).json({
      message: "update failed",
      error,
    })
  }
})

module.exports = router