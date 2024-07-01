const multer = require("multer")
const cloudinary = require('cloudinary').v2;
require('dotenv').config()
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// noraml multer in disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/images/');
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now()
    cb(null,uniquePrefix + '-' +  file.originalname)
  }
})

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png']
  }
});


const upload = multer({ storage: storage });

const cloudinaryUpload = multer({ storage: cloudinaryStorage })

module.exports = {upload, cloudinaryUpload}