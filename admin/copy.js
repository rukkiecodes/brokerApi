const router = require('express').Router()
const Copy = require('../models/copy')
const checkAuth = require("../middleware/auth")

router.post('/creatCopy', async (req, res) => {
  const { image, name, wins, losses, user, rate, profit } = req.body

  res.json({
    image, name, wins, losses, user, rate, profit
  })

  try {
    const newCopy = await Copy.create({
      _id: new mongoose.Types.ObjectId(),
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
    res.json({
      error: error.message
    })
    // throw Error("error")
  }
})

module.exports = router