const express = require("express")
const {addUser, getUser} = require("../controller/user.js")
const {newConversation, getConversation, updateConversation}  = require("../controller/conversation.js")
const { newMessage, getMessage } = require("../controller/message.js")
const { uploadFile, getImage, cloudinaryUpload } = require("../controller/image.js")
const upload = require("../utils/upload.js")

const route = express.Router()

route.post('/add', addUser)
route.get('/users', getUser)

//conversation
route.post('/conversation/c-add', newConversation)
route.post('/conversation/c-get', getConversation)
route.patch('/conversation/update', updateConversation)

//messags
route.post('/message/m-new', newMessage)
route.get('/message/m-get/:id', getMessage)

//documents
route.post('/file/upload', upload.single("image"), uploadFile)
route.get('/file/:filename', getImage )
route.post('/file/cloudinaryUpload', cloudinaryUpload)

module.exports = route