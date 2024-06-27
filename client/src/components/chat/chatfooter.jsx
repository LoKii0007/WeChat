import React, { useContext, useEffect, useState } from 'react'
import { newMessage, uploadFile } from '../../service/api'
import AccountContext from '../../context/accoountcontext'

const ChatFooter = ({ conversation, setMessages }) => {

    const { account, person, socket } = useContext(AccountContext)

    const [text, setText] = useState("")
    const [image, setImage] = useState("")
    const [imageName, setImageName] = useState("")

    const onChange = (e) => {
        e.preventDefault()
        setText(e.target.value)
    }

    const onFileChange = (e) => {
        e.preventDefault()
        setImage(e.target.files[0])
    }

    const uploadImage = async () => {
        if (image) {
            const data = new FormData();
            data.append("image", image);
            // console.log(data.get("image"))

            let response = await uploadFile(data);

            if (response.imageName) {
                setImageName(response.imageName);
                if (imageName) {
                    setText({ text: imageName })
                }
            } else {
                console.error("Unexpected response format:", response);
            }
        }
    }

    useEffect(() => {
        uploadImage()
    }, [image])

    useEffect(() => {
    }, [conversation])

    const sendMessage = async () => {
        let message = {}
        if (conversation?._id) {
            if (!imageName) {
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
                    text: imageName
                }
            }
        }

        socket.send(JSON.stringify({
            type : 'message_sent',
            payload : {
                sender : account.sub,
                receiver : person.sub,
                newMessage : message
            }
        }))

        setMessages( prev => [...prev, message])

        if ((message.text && message.text.length > 0) || imageName) {
            setText("")
            setImage("")
            setImageName("")
            await newMessage(message)
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
            {image && <img src={URL.createObjectURL(image)} />}
            <div className="chatbox-footer position-static py-2 d-flex flex-row align-items-center">

                <div className='smile-icon icon py-1 mx-2 px-2 ms-3 d-flex justify-content-center align-items-center'>
                    <i class="fa-regular fa-face-smile"></i>
                </div>

                <label htmlFor="plus-icon">
                    <div className='plus-icon icon py-1 mx-2 px-2 d-flex justify-content-center align-items-center'>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </label>
                <input id='plus-icon' type="file" style={{ display: "none" }} onChange={(e) => onFileChange(e)} />

                <div className='chatbox-input mx-2 rounded-pill'>
                    <form className="d-flex align-items-center rounded-pill">
                        <input onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => onChange(e)} value={text} className="form-control chatbox-form-control rounded-pill me-2" type="text" placeholder="Type a message" />
                        <div onClick={() => sendMessage()} className='icon send-icon py-1 px-3' >
                            <i class="fa-regular fa-paper-plane"></i>
                        </div>
                    </form>
                </div>

                <div className='mic-icon icon py-1 px-2 me-4 d-flex justify-content-center align-items-center'>
                    <i class="fa-solid fa-microphone"></i>
                </div>

            </div>
        </>
    )
}

export default ChatFooter
