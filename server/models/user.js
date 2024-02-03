const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    aud: {
        type: String
    },
    azp: {
        type: String
    },
    email: {
        type: String
    },
    email_verified: {
        type: Boolean
    },
    exp: {
        type: Number
    },
    family_name: {
        type: String
    },
    given_name: {
        type: String
    },
    iat: {
        type: Number
    },
    iss: {
        type: String
    },
    jti: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    nbf: {
        type: Number
    },
    picture: {
        type: String,
        required: true
    },
    sub: {
        type: String,
        required: true
    }
})

const User = mongoose.model("user", userSchema)

module.exports = User