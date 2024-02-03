const Message =   require("../models/message");

const url = "http://localhost:8000";

const uploadFile = async (request, response) => {
  console.log(request.body)
  try {
    const imageName = request.file.filename;
    return response.status(200).json({message : "file uploaded to public/images : ", imageName});
  } catch (error) {
    return response.status(500).json({error: "error in upload file api", message :error.message})
  }
};


const getImage = async (request, response) => {
  try {
    const image = await Message.findOne({ text : request.params.filename });
    return response.status(200).json({message : "found image" , image})
  } catch (error) {
    return response.status(500).json("msg : ",error.message);
  }
};


module.exports = { uploadFile, getImage };
