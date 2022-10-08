const router = require('express').Router()
const User = require('../models/user')

router.post('/updateEarnings', async (req, res) => {
  const { email, earnings } = req.body

  try {
    let user = await User.updateOne({ email }, {
      $set: { email, earnings }
    })
    return res.status(200).json({
      message: "User found",
      success: true,
      user
    })
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Auth failed",
      error,
    })
  }
})

module.exports = router
