

const asyncHandler = require("express-async-handler");
const smsModel = require('../models/messageModel')
const User = require('../models/userModel')
const chatModel = require('../models/chatModels')

// import asyncHandler from "express-async-handler"
// import smsModel from  '../models/messageModel'
// import User from  '../models/userModel'
// import chatModel from  '../models/chatModels'

const sendMessage = asyncHandler( async(req,res) => {
    const { content, chatId } = req.body ;
    
    if (!content || !chatId){
        console.log("invalid data paased to request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender : req.user._id,
        content: content,
        chat: chatId,
    }

    try {
        var message = await smsModel.create(newMessage);
        message = await message.populate("sender" ,"name pic");
        message = await message.populate("chat");
        message = await User.populate(message , {
            path:"chat.users",
            select:"name pic email"
        } ) 
        
        await chatModel.findByIdAndUpdate(chatId, {
            lastMessage: message,
        });

        res.json(message)
    } catch (error) { 
        res.status(400);
        throw new Error(error.message); 
    }

});

const allMessage = asyncHandler( async(req,res) => {
try {
    const message = await smsModel.find( {chat:req.params.chatId})
    .populate("sender" , "name pic email")
    .populate("chat"); 
    res.json(message);
} catch (error) {
    console.log("somthing went wroung")
    res.sendStatus(400);
    throw new Error(error.message);  
}
})

 module.exports = { sendMessage, allMessage }


