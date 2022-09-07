const router = require('express').Router()
const Copy = require('../models/copy')
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

  if (_user) {
    res.json({
      message: 'Already copied'
    })
  } else {
    try {
      _copy = await Copy.create({
        _id: new mongoose.Types.ObjectId(),
        user,
        copy,
        image,
        name,
        wins,
        losses,
        rate,
        profit
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