const express = require("express");
const chatRouter = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const { accesschat, fetchchats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controllers/chatControllers");


 chatRouter.post('/',authMiddleware, accesschat);
 chatRouter.get('/', authMiddleware, fetchchats); 
 chatRouter.post('/group', authMiddleware, createGroupChat);
 chatRouter.put('/rename', authMiddleware, renameGroup);
 chatRouter.put('/groupadd', authMiddleware, addToGroup);
 chatRouter.put('/groupremove', authMiddleware, removeFromGroup);

module.exports = chatRouter;