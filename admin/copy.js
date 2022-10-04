const router = require('express').Router()
const Copy = require('../models/copy')
const checkAuth = require("../middleware/auth")
const cloudinary = require("../middleware/cloud")
const upload = require("../middleware/multer")
const mongoose = require('mongoose')

router.post('/creatCopy', upload.single('image'), async (req, res) => {
  const { name, wins, losses, rate, profit } = req.body

  const _id = new mongoose.Types.ObjectId()

  try {
    const copy = await Copy.findOne({ name })

    if (copy) {
      res.json({
        error: 'Sorry this trader already exist',
        copy
      })
    } else {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: process.env.CLOUDINARY_FOLDER,
      })

      const newCopy = await Copy.create({
        _id,
        user: _id,
        image: result.secure_url,
        name,
        wins,
        losses,
        rate,
        profit
      })

      return res.json({
        copy: newCopy
      })
    }
  } catch (error) {
    res.json({
      error: error.message
    })
  }
})

router.get('/allCopies', async (req, res) => {
  const copies = await Copy.find()

  try {
    res.json({
      message: 'Copies fetched successfully',
      copies
    })
  } catch (error) {
    throw Error('Error sending request')
  }
})

router.post('/editCopy', async (req, res) => {
  const { _id, earnings, name, wins, losses, rate, profit, from, to, bankState, salesState, currency, amount } = req.body

  const copy = await Copy.findOne({ _id })

  if (!copy) {
    res.json({
      message: 'This copy does not exist',
      status: 'FAILED'
    })
  } else {
    try {
      let copy = await Copy.updateOne({ _id }, {
        $set: { earnings: copy.profit * earnings, name, wins, losses, rate, profit, from, to, bankState, salesState, currency, amount }
      })
      return res.status(200).json({
        message: "Copy updated",
        success: true,
        copy
      })
    } catch (error) {
      res.json({
        message: 'Error processing editCopy request'
      })
    }
  }
})

router.post('/deleteCopy', async (req, res) => {
  const { _id } = req.body

  const copy = await Copy.findOne({ _id })

  if (!copy) {
    res.json({
      message: 'This copy does not exist',
      status: 'FAILED'
    })
  } else {
    const copy = await Copy.deleteOne({ _id })

    res.json({
      message: 'Copy deleted',
      copy
    })
  }
})

module.exports = router
