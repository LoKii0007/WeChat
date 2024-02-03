const express = require("express")
const {addUser, getUser} = require("../controller/user.js")
const {newConversation, getConversation}  = require("../controller/conversation.js")
const { newMessage, getMessage } = require("../controller/message.js")
const { uploadFile, getImage } = require("../controller/image.js")
const upload = require("../utils/upload.js")

const route = express.Router()

route.post('/add', addUser)
route.get('/users', getUser)

//conversation
route.post('/conversation/c-add', newConversation)
route.post('/conversation/c-get', getConversation)

//messags
route.post('/message/m-new', newMessage)
route.get('/message/m-get/:id', getMessage)

//documents
route.post('/file/upload', upload.single("image"), uploadFile)
route.get('/file/:filename', getImage )

module.exports = route