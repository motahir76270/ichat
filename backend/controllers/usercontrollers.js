
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const genrateToken = require("../config/generateToken");
const bcrypt = require('bcryptjs');


//import matchPassword from "../models/userModel";

const registerUser =  async (req,res) => {
    const { name, email, password, profilePic } = req.body;

    console.log(req.file);
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
  
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" })
    }


    const newUser = await User.create({
        name,
        email,
        password,
        profilePic,
    });


    if(newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            profilePic: newUser.profilePic,
            token:genrateToken(newUser._id)
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }

    }



const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if ( (email === user.email) && (password === user.password) ) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            profilePic: user.profilePic,
            token: genrateToken(user._id)
        });
        }else {
            res.status(400).send('email or Password incorrect')
        }
});

const allUser = asyncHandler(async (req, res) => {
    const keyword  = req.query.search
    ?{
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    }:{};

    //const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    const users = await User.find(keyword);
    res.send(users);
})

module.exports = { registerUser, authUser, allUser }













// if(user && (await user.matchPassword(password))) {
//     res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         password: user.password,
//         profilePic: user.profilePic,
//         token: genrateToken(user._id)
//     });
// }