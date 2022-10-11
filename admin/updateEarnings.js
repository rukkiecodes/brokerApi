const router = require('express').Router()
const User = require('../models/user')

router.post('/updateEarnings', async (req, res) => {
  const { email, earnings } = req.body

  try {
    let user = await User.updateOne({ email }, { $set: { earnings } })
    res.json({
      user
    })
  } catch (error) {
    res.json({
      success: false,
      error,
    })
  }
})

module.exports = router
