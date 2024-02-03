const User = require("../models/user.js")

const addUser = async (request, response)=>{
    console.log(request.body.sub)
    try {
        let exist = await User.findOne({sub: request.body.sub})

        if(exist){
            response.status(200).json("user already exists")
            return
        }

        const newUser = new User(request.body)
        await newUser.save()

        console.log("added new user")
        return response.status(200).json(newUser)

    } catch (error) {
        response.status(500).json(error)
    }
}

const getUser = async (request, response)=>{
    try {
        const user = await User.find({})
        return response.status(200).json(user)
    } catch (error) {
        return response.status(500).json(error)
    }
}

module.exports = {addUser, getUser}