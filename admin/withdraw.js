const router = require('express').Router()
const Withdraw = require('../models/withraw')
const checkAuth = require("../middleware/auth")

router.post('/withdrawRequest', checkAuth, async (req, res) => {
  let transaction = await Withdraw.find({ status: 'PENDING' })

  return res.status(200).json({
    message: "transaction found",
    transaction,
  })
})

module.exports = router