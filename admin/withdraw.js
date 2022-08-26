const router = require('express').Router()
const Withdraw = require('../models/withraw')

router.post('/withdrawRequest', async (req, res) => {
  let transaction = await Withdraw.find({ status: 'PENDING' })

  return res.status(200).json({
    message: "transaction found",
    transaction,
  })
})

module.exports = router