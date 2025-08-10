
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatModels = Schema ({
    chatName: {
        type: String,
        trim: true,
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: [{
            type:Schema.Types.ObjectId,
            ref:'userModel'
    }],
    lastMessage: {
        type:Schema.Types.ObjectId,
            ref:'smsModel'
    },
    groupAdmin: { 
        type: Schema.Types.ObjectId,
        ref:'userModel'
    }

},  { timestamps:true}        )  

const chatModel = mongoose.model('chatModel' , chatModels)

module.exports = chatModel;