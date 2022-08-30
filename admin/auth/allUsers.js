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

module.exports = router