const Message  = require("../models/message.js")
const Conversation = require("../models/conversation.js")

const newMessage =  async(request, response)=>{
    const newMessage = new Message(request.body)
    try {
        await newMessage.save()
        await Conversation.findByIdAndUpdate(request.body.conversationId, {message :request.body.text})
        response.status(200).json("message sent successfully")
    } catch (error) {
        response.status(500).json(error)
    }
}

const getMessage =  async(request, response)=>{
    try {
        const messages = await Message.find({conversationId:request.params.id})
        response.status(200).json(messages)
    } catch (error) {
        response.status(500).json(error)
    }
}

module.exports = {getMessage, newMessage}