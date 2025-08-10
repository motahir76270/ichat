
const express = require('express')
const messageRouter = express.Router()
const { sendMessage, allMessage } = require('../controllers/messageControlles');
const authMiddleware = require('../middleware/authmiddleware')

// import express from 'express';
// const messageRouter = express.Router()
// import { sendMessage, allMessage } from '../controllers/messageControlles'
// import authMiddleware from '../middleware/authmiddleware'

messageRouter.route('/').post(authMiddleware,sendMessage)
messageRouter.route('/:chatId').post(authMiddleware, allMessage)


messageRouter.route('/').post(authMiddleware,sendMessage)
messageRouter.route('/:chatId').post(authMiddleware, allMessage)
 
messageRouter.post('/', authMiddleware, sendMessage)
messageRouter.get('/:chatId', authMiddleware, allMessage)


module.exports =  messageRouter  ;
// export default messageRouter  ;

