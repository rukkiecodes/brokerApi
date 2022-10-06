const router = require('express').Router()
const Copy = require('../models/copy')
const Copied = require('../models/copied')
const User = require('../models/user')
const mongoose = require("mongoose")

router.post('/getAllCopies', async (req, res) => {
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

router.get('/getCopies/:user', async (req, res) => {
  const { user } = req.params
  try {
    const copies = await Copied.find({ _user: user })

    res.json({
      copies
    })
  } catch (error) {
    throw ("error")
  }
})

router.post('/copy', async (req, res) => {
  const { user, copy, image, name, wins, losses, rate, profit, from, to, bankState, salesState, currency, amount } = req.body

  const _user = await Copied.findOne({ copy })

  if (_user) {
    res.json({
      message: 'Already copied'
    })
  } else {
    try {
      const _copy = await Copied.create({
        _id: new mongoose.Types.ObjectId(),
        copy,
        user,
        _user: user,
        image,
        name,
        wins,
        losses,
        rate,
        profit,
        from,
        to,
        bankState,
        salesState,
        currency,
        amount
      })

      const _user = await User.updateOne({ _id: user }, {
        $addToSet: {
          copies: copy
        }
      })

      res.json({
        copy: _copy,
        user: _user
      })
    } catch (error) {
      throw ("error")
    }
  }
})

module.exports = router
