const express = require("express");
const { addUser, getUser } = require("../controller/user.js");
const {
  newConversation,
  getConversation,
  updateConversation,
} = require("../controller/conversation.js");
const { newMessage, getMessage } = require("../controller/message.js");
const {
  uploadFile,
  getImage
} = require("../controller/image.js");
const {upload, cloudinaryUpload }= require("../utils/upload.js");

const route = express.Router();

route.post("/add", addUser);
route.get("/users", getUser);

//conversation
route.post("/conversation/c-add", newConversation);
route.post("/conversation/c-get", getConversation);
route.patch("/conversation/update", updateConversation);

//messags
route.post("/message/m-new", newMessage);
route.get("/message/m-get/:id", getMessage);

//documents
route.post("/file/upload", upload.single("image"), uploadFile);
route.get("/file/:filename", getImage);
route.post("/file/cloudinaryUpload", cloudinaryUpload.single("image"), (req, res) => {
  console.log(req.file)
  try {
    if(req.file){
        return res.status(200).json({
            message: "Image uploaded successfully",
            url: req.file.path,
            originalName: req.file.originalname
        })
    }
    return res.status(400).json({
      message: "some error occured"
    })
  } catch (err) {
    console.log('error', err)
    return res.status(500).json({
      message: "An error occurred while uploading the image",
      error: err.message,
    });
  }
});

module.exports = route;