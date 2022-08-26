const cloudinary = require("cloudinary").v2
const { CLOUDINARY_COMPANY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRETE } = process.env
cloudinary.config({
  cloud_name: CLOUDINARY_COMPANY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRETE,
})
module.exports = cloudinary