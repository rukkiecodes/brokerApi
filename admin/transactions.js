const router = require('express').Router()
const Deposit = require('../models/deposit')

router.post('/get', async (req, res) => {
  const { user } = req.body

  let transactions = await Deposit.find()

  if (transactions.length >= 1)
    return res.status(200).json({
      message: "transactions found",
      transactions,
    })
  else
    return res.status(200).json({
      message: "transactions not found",
      transactions: [],
    })
})

router.post('/getTransactions', async (req, res) => {
  const { user } = req.body

  let transactions = await Deposit.find({ user })

  if (transactions.length >= 1)
    return res.status(200).json({
      message: "transactions found",
      transactions,
    })
  else
    return res.status(200).json({
      message: "transactions not found",
      transactions: [],
    })
})

router.post('/getSingleTransaction', async (req, res) => {
  const { _id } = req.body

  let transaction = await Deposit.findOne({ _id })

  return res.status(200).json({
    message: "transaction found",
    transaction,
  })
})

router.post('/getPendingTransactions', async (req, res) => {
  let transaction = await Deposit.find({ status: 'PENDING' })

  return res.status(200).json({
    message: "transaction found",
    transaction,
  })
})

router.post('/getPendingTransactions', async (req, res) => {
  let transaction = await Deposit.find({ status: 'CONFIRMED' })

  return res.status(200).json({
    message: "transaction found",
    transaction,
  })
})

module.exports = router