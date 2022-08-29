const router = require('express').Router()
const Copy = require('../models/copyTrades')

router.post('/creatCopy', async (req, res) => {
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