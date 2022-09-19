const router = require('express').Router()
const Deposit = require('../models/deposit')
const Transaction = require('../models/transaction')
const Investment = require('../models/investment')
const upload = require('../middleware/multer')
const cloudinary = require('../middleware/cloud')
const checkAuth = require("../middleware/auth")
const mongoose = require("mongoose")

router.post('/get', async (req, res) => {
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

router.post('/getTransactions', checkAuth, async (req, res) => {
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

router.post('/getSingleTransaction', checkAuth, async (req, res) => {
  const { _id } = req.body

  let transaction = await Deposit.findOne({ _id })

  return res.status(200).json({
    message: "transaction found",
    transaction,
  })
})

router.post('/proofOfPayment', upload.single('pop'), checkAuth, async (req, res) => {
  const { user, _id } = req.body
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: process.env.CLOUDINARY_FOLDER,
    })

    const transaction = await Transaction.updateOne({
      $and: [{ user }, { _id }],
    }, {
      $set: {
        pop: result.secure_url,
      },
    }).exec()
    res.status(200).json({
      transaction,
      success: true,
      message: "Proof of payment successfully updated",
    })
  } catch (error) {
    res.status(401).json({
      error,
      success: false,
      message: "Error updating proof of payment",
    })
  }
})

router.post('/investment', async (req, res) => {
  const { user, amount } = req.body

  let _investment = await Investment.findOne({ user })

  if (_investment) {
    let newAmount = _investment.amount + amount
    await Investment.updateOne({ user }, { $set: { amount: newAmount } })
    return res.status(200).json({
      message: "User found",
      success: true,
      investment: _investment
    })
  } else {
    let investment = await Investment.create({
      _id: new mongoose.Types.ObjectId(),
      amount,
      user
    })

    res.json({
      investment: invest
    })
  }
})

router.post('/getInvestment', async (req, res) => {
  const { user } = req.body

  let investment = await Investment.findOne({ user })

  if (investment) {
    res.status(200).json({
      message: "User found",
      success: true,
      investment
    })
  } else {
  }
})

module.exports = router
