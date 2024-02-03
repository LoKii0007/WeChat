const Conversation = require("../models/conversation.js")

const newConversation = async (request, response) =>{
    try {
        const senderId = request.body.senderId
        const recieverId = request.body.recieverId
        
        const exist = await Conversation.findOne({members:{$all:[senderId, recieverId]}})
        if(exist){
            return response.status(200).json("conversation already exists")
        }
        const newconversation = new Conversation({
           members:[senderId, recieverId]
        })
        await newconversation.save()
        return response.status(200).json("conversation saved successfully")

    } catch (error) {
        return response.status(500).json(error)
    }
} 

const getConversation = async(request, response) => {
    try {
        const senderId = request.body.senderId
        const recieverId = request.body.recieverId
        let conversation = await Conversation.findOne({members:{$all:[senderId, recieverId]}})
        return response.status(200).json(conversation)
    } catch (error) {
        return response.status(500).json(error)
    }
}

module.exports = {newConversation, getConversation}