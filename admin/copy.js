const router = require('express').Router()
const Copy = require('../models/copy')
const checkAuth = require("../middleware/auth")

router.post('/creatCopy', checkAuth, async (req, res) => {
  const { image, name, wins, losses, user, rate, profit } = req.body

  try {
    const newCopy = await Copy.create({
      user: user._id,
      image,
      name,
      wins,
      losses,
      rate,
      profit
    })
    
    return res.json({
      copy: newCopy
    })
  } catch (error) {
    throw ("error")
  }
})

module.exports = router