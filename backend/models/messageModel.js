const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const messageModel = Schema( {
    sender:{ type:Schema.Types.ObjectId, ref:'userModel'
    },
    content:{type:String , trim:true},
    chat:{type:Schema.Types.ObjectId,   ref:'chatModel'}
} , 
{timestamps :true}
)

const smsModel = mongoose.model('smsModel' , messageModel)

module.exports = smsModel;