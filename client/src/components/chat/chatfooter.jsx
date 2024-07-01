import React, { useContext, useEffect, useState } from 'react'
import { UpdateConversation, newMessage, uploadFile } from '../../service/api'
import AccountContext from '../../context/accoountcontext'
import axios from 'axios'

const ChatFooter = ({ conversation, setMessages }) => {

    const { account, person, socket , setRecenetMessage} = useContext(AccountContext)
    const [text, setText] = useState("")
    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState("")
    const [imageName, setImageName] = useState("")
    const [imageUploading, setImageUploading] = useState(false)
    const [mobile, setMobile]= useState(false)

    function responsive(){
      if(window.innerWidth>600){
        setMobile(false)
      }else{
        setMobile(true)
      }
    }
  
    useEffect(()=>{
      responsive()
  
      window.addEventListener('resize', responsive)
    
      return()=>{
        window.removeEventListener('resize', responsive)
      }
    }, [])

    const onChange = (e) => {
        e.preventDefault()
        setText(e.target.value)
    }

    const onFileChange = (e) => {
        e.preventDefault()
        setFile(e.target.files[0])
    }

    const uploadImage = async () => {
        setImageUploading(true)
        if (file) {
            const data = new FormData();
            data.append("image", file);
            // console.log(data.get("image"))

            // using normal multer disk storage
            // let response = await uploadFile(data);
            // if (response.imageName) {
            //     setImageName(response.imageName);
            //     if (imageName) {
            //         setText({ text: imageName })
            //     }
            // } else {
            //     console.error("Unexpected response format:", response);
            // }

            // using cloudinary online upload
            try {
                let response = await axios.post('http://localhost:8000/file/cloudinaryUpload', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if (response.status === 200) {
                    setImageName(response.data.originalName)
                    setImageUrl(response.data.url)
                    setText(response.data.originalName)
                    console.log(text)
                } else {
                    console.error("Unexpected response format:", response);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }finally{
                setImageUploading(false)
            }
        }
    }

    useEffect(() => {
        if (file) {
            uploadImage()
        }
    }, [file])

    useEffect(()=>{
        console.log(imageName, imageUrl)
    }, [imageUrl, imageName])

    useEffect(() => {
    }, [conversation])

    const sendMessage = async () => {
        let message = {}
        if (conversation?._id) {
            if (!imageUrl && !imageName) {
                message = {
                    conversationId: conversation._id,
                    senderId: account.sub,
                    recieverId: person.sub,
                    type: "text",
                    text: text
                }
            } else {
                message = {
                    conversationId: conversation._id,
                    senderId: account.sub,
                    recieverId: person.sub,
                    type: "file",
                    text: imageName,
                    url : imageUrl
                }
            }
        }

        socket.send(JSON.stringify({
            type: 'message_sent',
            payload: {
                sender: account.sub,
                receiver: person.sub,
                newMessage: message
            }
        }))

        setMessages(prev => [...prev, message])

        if ((message.text && message.text.length > 0) || imageName) {
            setText("")
            setFile(null)
            setImageName("")
            setImageUrl("")
            await newMessage(message)
            const res = await UpdateConversation({senderId: account.sub, recieverId: person.sub, message : message.text})
            console.log(res)
            if(res!= undefined){
                setRecenetMessage(res)
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <>
            {/* {file && <img src={URL.createObjectURL(file)} />} */}
            {imageUploading ? 
                <div style={{ fontSize: "20px", color: "red" }}>loading...</div> : 
                imageUrl && <img className='uploadImage position-fixed' src={imageUrl} alt={imageName} />
            }
             <div className="chatbox-footer position-static py-2 d-flex flex-row align-items-center"> { imageUploading ? <div style={{fontSize:"300px"}} >'loading...'</div> : imageUrl && <img className='uploadImage position-fixed' src={imageUrl} />}

                {!mobile &&
                    <div className='smile-icon icon py-1 mx-2 px-2 ms-3 d-flex justify-content-center align-items-center'>
                        <i class="fa-regular fa-face-smile"></i>
                    </div>
                }

                <label htmlFor="plus-icon">
                    <div className='plus-icon icon ms-2 p-2 d-flex justify-content-center align-items-center'>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </label>
                <input id='plus-icon' type="file" style={{ display: "none" }} onChange={(e) => onFileChange(e)} />

                <div className='chatbox-input mx-2 rounded-pill'>
                    <form className="d-flex align-items-center rounded-pill">
                        <input onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => onChange(e)} value={text} className="form-control chatbox-form-control rounded-pill me-2" type="text" placeholder="Type a message" />
                        <div onClick={() => sendMessage()} className='icon send-icon rounded-circle py-1 px-3' >
                            <i class="fa-regular fa-paper-plane"></i>
                        </div>
                    </form>
                </div>

                {!mobile &&
                    <div className='mic-icon icon py-1 px-2 me-4 d-flex justify-content-center align-items-center'>
                        <i class="fa-solid fa-microphone"></i>
                    </div>
                }

            </div>
        </>
    )
}

export default ChatFooter
