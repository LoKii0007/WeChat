const Conversation = require("../models/conversation.js")

const newConversation = async (request, response) =>{
    try {
        const senderId = request.body.senderId
        const recieverId = request.body.recieverId
        
        const exist = await Conversation.findOne({members:{$all:[senderId, recieverId]}})
        if(exist){
            return response.status(200).json({message:"conversation already exist", status:false})
        }
        const newconversation = new Conversation({
           members:[senderId, recieverId]
        })
        await newconversation.save()
        return response.status(200).json({message:newconversation, status:true})

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

const updateConversation = async(req, res)=>{
    const {senderId, recieverId, message} = req.body
    // console.log(senderId, recieverId, message)
    try{
        const existingConversation = await Conversation.findOne({ members: { $all: [senderId, recieverId] } });
        if (!existingConversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        const updatedConversation = await Conversation.findOneAndUpdate(
            {members:{$all:[senderId, recieverId]}}, 
            {$set: { message: message }},
            {new : true}
        )
        return res.status(200).json(updatedConversation)
    }catch(error){
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = {newConversation, getConversation, updateConversation}