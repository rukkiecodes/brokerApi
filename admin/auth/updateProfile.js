const router = require("express").Router()
const Admin = require("../../models/admin")
const checkAuth = require("../../middleware/auth")

router.post("/updateProfile", checkAuth, async (req, res) => {
  const {
    email,
    name,
    phone,
    gender,
    state,
    lga,
    specialty,
    description
  } = req.body

  try {
    let user = await Admin.updateOne({ email }, {
      $set: {
        name,
        phone,
        gender,
        state,
        lga,
        specialty,
        description
      }
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