const router = require('express').Router()
const Copy = require('../models/copy')
const User = require('../models/user')
const mongoose = require("mongoose")

router.post('/getCopies', async (req, res) => {
  const { limit } = req.body
  try {
    const copies = await Copy.find().limit(limit)

    res.json({
      copies
    })
  } catch (error) {
    throw ("error")
  }
})

router.post('/copy', async (req, res) => {
  const { _id, user, copy, image, name, wins, losses, rate, profit } = req.body

  const _user = await Copy.findOne({ user })

  const __user = await User.findOne({ user })

  if (_user) {
    res.json({
      message: 'Already copied'
    })
  } else {
    try {
      let id = new mongoose.Types.ObjectId(),
      _copy = await Copy.create({
        _id: id,
        user,
        copy,
        image,
        name,
        wins,
        losses,
        rate,
        profit
      })

      _user = await User.updateOne({ _id: user }, {
        $set: {
          copies: id
        }
      })

      res.status(201).json({
        _copy
      })
    } catch (error) {
      throw ("error")
    }
  }
})

module.exports = router