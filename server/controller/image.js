const Message = require("../models/message");
const cloudinary = require("cloudinary").v2;

const url = "http://localhost:8000";

const uploadFile = async (request, response) => {
  try {
    const imageName = request.file.filename;
    return response
      .status(200)
      .json({ message: "file uploaded to public/images : ", imageName });
  } catch (error) {
    return response
      .status(500)
      .json({ error: "error in upload file api", message: error.message });
  }
};

const getImage = async (request, response) => {
  try {
    const image = await Message.findOne({ text: request.params.filename });
    return response.status(200).json({ message: "found image", image });
  } catch (error) {
    return response.status(500).json("msg : ", error.message);
  }
};

const cloudinaryUpload = async (req, res) => {
  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    const result = await cloudinary.uploader.upload(
      req.body.imagePath,
      options
    );
    console.log(result);
    return res.status(200).json({ message: "file uploaded to public/images : ", result });
  } catch (error) {
    return response.status(500).json("msg : ", error.message);
  }
};

module.exports = { uploadFile, getImage, cloudinaryUpload };
