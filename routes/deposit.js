const router = require("express").Router()
const Deposit = require('../models/deposit')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const mongoose = require("mongoose")
const checkAuth = require("../middleware/auth")
const upload = require('../middleware/multer')
const cloudinary = require('../middleware/cloud')

const uuid = require('uuid-random')

router.post('/add', upload.single('pop'), checkAuth, async (req, res) => {
  const { _id, amount, currency, wallet, name } = req.body

  try {
    let user = await User.findOne({ _id })
    let id = new mongoose.Types.ObjectId()
    let ref_x = `BLUE_ZONE://${_id}${uuid()}`
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: process.env.CLOUDINARY_FOLDER,
    })

    const newDeposit = await Deposit.create({
      _id: id,
      user: user._id,
      amount,
      currency,
      wallet,
      name,
      status: 'PENDING',
      ref_x,
      pop: result.secure_url
    })

    await Transaction.create({
      _id: id,
      user: user._id,
      amount,
      currency,
      wallet,
      name,
      status: 'PENDING',
      ref_x,
      type: 'deposit',
      pop: result.secure_url
    })

    return res.json({
      deposit: newDeposit
    })
  } catch (error) {
    res.status(401).json({
      error,
      success: false,
      message: "Error prosessing deposit",
    })
  }
})

module.exports = router