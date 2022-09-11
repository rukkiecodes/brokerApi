const router = require('express').Router()
const Copy = require('../models/copy')
const checkAuth = require("../middleware/auth")
const cloudinary = require("../middleware/cloud")
const upload = require("../middleware/multer")

router.post('/creatCopy', upload.single('image'), async (req, res) => {
  const { name, wins, losses, rate, profit } = req.body

  res.json({
    image, name, wins, losses, rate, profit
  })

  const _id = new mongoose.Types.ObjectId()

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: process.env.CLOUDINARY_FOLDER,
    })

    const newCopy = await Copy.create({
      _id,
      user: _id,
      image: result.secure_url,
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
  }
})

module.exports = router