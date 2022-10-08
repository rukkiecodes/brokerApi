const router = require("express").Router()
const User = require('../../models/user')
const checkAuth = require("../../middleware/auth")

router.get('/allUsers', checkAuth, async (req, res) => {
  const users = await User.find()

  try {
    res.json({
      message: 'Users fetched successfully',
      users
    })
  } catch (error) {
    throw Error('Error sending request')
  }
})

router.get('/updateEarnings', checkAuth, async (req, res) => {
  const { email } = req.body

  try {
    let user = await User.updateOne({ email }, {
      $set: { earnings }
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