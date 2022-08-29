const router = require('express').Router()
const Copy = require('../models/copy')

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

module.exports = router