const router = require('express').Router()
const User = require('../../models/user')
const jwt = require("jsonwebtoken")
const user = require('../../models/user')

const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRETE, GOOGLE_REDIRECT_URI, GOOGLE_REFRESH_TOKEN, SESSION_SECRET } = process.env

const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRETE, GOOGLE_REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN })

router.post('/forgotPassword', async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(401).json({
      message: "user not found",
    })
  }
  else {
    const payload = {
      email: user.email,
      id: user._id
    }

    const token = jwt.sign(payload, SESSION_SECRET, { expiresIn: '15m' })

    const link = `http://localhost:3000/auth/resetPassword/${user._id}/${token}`
    sendEmail(user.email, link)
    res.json({
      link
    })
  }
})

router.get('/resetPassword/:id/:token', async (req, res) => {
  const { id, token } = req.params
  const user = await User.findOne({ _id: id })

  const myObjectId = user._id.toString()

  if (id !== myObjectId)
    return res.json({ message: 'Invalid id...' })

  try {
    const payload = jwt.verify(token, SESSION_SECRET)

    res.render('resetPassword', { email: user.email })
  } catch (error) {
    return res.json({
      error: error.message
    })
  }
})

router.post('/resetPassword/:id/:token', async (req, res) => {
  const { id, token } = req.params
  const { password, password2 } = req.body

  const myObjectId = user._id.toString()

  if (id !== myObjectId)
    res.json({ message: error.message })

  try {
    const payload = jwt.verify(token, SESSION_SECRET)
    //update password
  } catch (error) {
    return res.json({
      error: error.message,
      message: 'Invalid id...'
    })
  }
})

// send email
const sendEmail = async (email, link) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.email,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRETE,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken
      }
    })

    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: 'password reset',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>

      <body
        style="background-color: white; display: flex; justify-content: center; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif">
        <div style="width: 600px; max-width: 100%; background-color: white;">
          <h1>Password reset</h1>
          <p style="font-size: 2rem">${link}</p>
          <p>This code <b>expires in 15 minutets</b></p>
        </div>
      </body>

      </html>
      `
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = router