
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const authmiddleware = require("../middleware/authmiddleware");
const Chat = require("../models/chatModels");


const accesschat = asyncHandler(async (req, res) => {

    const { userId } = req.body;
    
    if (!userId) {
        console.error("User ID not provided");
        return res.status(400).send("User ID is required");
    }
    
    var ischat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-password").populate({ path: "latestMessage", strictPopulate: false });



    ischat = await User.populate(ischat,{
        path: "latestMessage.sender",
        select: "name pic email",
        strictPopulate: false
    })


    if (ischat.length > 0) {
        res.send(ischat[0]);
    } else {
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        };
        
        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).send(fullChat);
        } catch (error) {
            console.error("Error creating chat:", error);
            res.status(500).send("Internal Server Error");
        }
    }
}) 



const fetchchats = asyncHandler(async (req, res) => {
    try {
        Chat.find({users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate({
         path: "lastMessage",
         populate:{ path: "sender", select: "name pic email" }
        })
        .sort({ updatedAt: -1 })
        .then((result) => {
            res.status(200).send(result);
        })
        
    } catch (error) {
        res.status(400);
    throw new Error(error.message);    
    } 

});



const createGroupChat = asyncHandler(async (req, res) => {
    const { users, name } = req.body;
    if (!users || !name) {
        return res.status(400).send("Please fill all the fields");
    } 

    var GUser = JSON.parse(users);
    if (GUser.length < 2) {
        return res.status(400).send("More than 2 users are required to form a group chat");
    }
    GUser.push(req.user); // Add the creator to the group and should be current user

    try {
        const groupChat = await Chat.create({
            chatName: name,
            users: GUser,
            isGroupChat: true,
            groupAdmin: req.user._id
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
        
    } catch (error) {
        console.error("Error creating group chat:", error);
        res.status(500).send("Internal Server Error");
        
    }
     
});


const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    if (!chatId || !chatName) {
        return res.status(400).send("Please fill all the fields");
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName },
        { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password");

    if (!updatedChat) {
        return res.status(404).send("Chat not found");
    }

    res.status(200).json(updatedChat);
}); 


const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    if (!chatId || !userId) {
        return res.status(400).send("Please fill all the fields");
    }

    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId }
        },
        { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password");

    if (!added) {
        return res.status(404).send("Chat not found");
    }

    res.status(200).json(added); 
});


const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    
    if (!chatId || !userId) {
        return res.status(400).send("Please fill all the fields");
    }

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId }
        },
        { new: true }
    ).populate("users", "-password").populate("groupAdmin", "-password");

    if (!removed) {
        return res.status(404).send("Chat not found");
    }

    res.status(200).json(removed);
})



module.exports = {
    accesschat, fetchchats, createGroupChat, renameGroup, addToGroup, removeFromGroup
}
