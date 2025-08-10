// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const express = require('express');
// const multer = require('multer');
// const dotenv = require('dotenv')
// const app = express();

// dotenv.config();

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_KEY_SECRET
// })

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'explore_dev',
//         allowedformats: ["png", "jpg", " jpeg", "webp"], // supports promises as well
//     },
// });

// const upload = multer({ storage });

// module.exports = {
//     upload,
//     cloudinary
// }