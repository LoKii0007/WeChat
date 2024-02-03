const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    conversationId:{
        type:String
    },
    senderId:{
        type: String
    },
    recieverId:{
        type: String
    },
    text:{
        type: String
    },
    type:{
        type: String
    }
},{
    timestamps:true
})

const Message = mongoose.model("message", messageSchema)

module.exports = Message