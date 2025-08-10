
const express = require("express");
const userRouter = express.Router();
const { registerUser, authUser, allUser } = require("../controllers/usercontrollers");
const authMiddleware = require('../middleware/authmiddleware');




userRouter.use(express.json());  // This middleware parses JSON requests
userRouter.use(express.urlencoded({ extended: true })); // This parses URL-encoded form data



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       return  cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//       return  cb(null, `${Date.now()}-${file.originalname} `);
//     }
// });



// userRouter.route('/register').post(upload.single('profilePic'), registerUser);
userRouter.post('/register', registerUser)
userRouter.post('/login', authUser)
userRouter.route('/users').get(authMiddleware,allUser);

userRouter.use('/uploads', express.static('uploads'));


module.exports = userRouter;



//methods of write routes
//userRouter.route('/').post(registerUser);
//userRouter.post(''login' , authUser)



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       return  cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//       return  cb(null, `${Date.now()}-${file.originalname} `);
//     }
// });