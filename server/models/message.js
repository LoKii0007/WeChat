const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    conversationId:{
        type:String,
        require : true
    },
    senderId:{
        type: String,
        require : true
    },
    recieverId:{
        type: String,
        require : true
    },
    text:{
        type: String,
        require : true
    },
    type:{
        type: String,
        require : true
    },
    url:{
        type: String
    }
},{
    timestamps:true
})

const Message = mongoose.model("message", messageSchema)

module.exports = Message