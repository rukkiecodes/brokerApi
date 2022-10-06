const router = require('express').Router()
const Support = require('../models/support')
const mongoose = require("mongoose")

router.post('/support', async (req, res) => {
  const { user, email, subject, message } = req.body
  try {
    const support = await new Support.create({
      _id: new mongoose.Types.ObjectId(),
      email,
      subject,
      message,
      user
    })
    res.json({
      support
    })
  } catch (error) {
    throw ("error")
  }
})

module.exports = router
