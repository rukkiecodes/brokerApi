const router = require('express').Router()
const Deposit = require('../models/deposit')
const Transaction = require('../models/transaction')
const upload = require('../middleware/multer')
const cloudinary = require('../middleware/cloud')
const checkAuth = require("../middleware/auth")

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

module.exports = router