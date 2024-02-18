import React, { useContext, useEffect, useState } from 'react'
import { newMessage, uploadFile } from '../../service/api'
import AccountContext from '../../context/accoountcontext'

const ChatFooter = ({ conversation, onMessageSend, setMessages, messages }) => {
    const { account, person, socket } = useContext(AccountContext)

    const [text, setText] = useState("")
    const [image, setImage] = useState("")
    const [imageName, setImageName] = useState("")
    const [incoming, setIncoming] = useState(null)

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

        socket.current.emit('sendMessage', message)

        if ((message.text && message.text.length > 0) || imageName) {
            await newMessage(message)
        }

        setText("")
        setImage("")
        setImageName("")
        onMessageSend()
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            sendMessage()
        }
    }

    useEffect(() => {
        socket.current.on('getMessage', data => {
            // console.log("incoming : ",data)
            setIncoming({
                ...data,
                createdAt: Date.now()
            })
        })

    }, [socket])

    useEffect(() => {
        // console.log("convo : ",conversation)
        if (incoming && conversation?.member?.includes(incoming.senderId)) {
            setMessages((prev) => {
                const newState = [...prev, incoming];
                console.log('New state:', newState);
                return newState;
            }
            )
        }

    }, [incoming, conversation, messages])


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

                <div className='chatbox-input mx-2'>
                    <form className="d-flex align-items-center">
                        <input onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => onChange(e)} value={text} className="form-control chatbox-form-control me-2" type="text" placeholder="Type a message" />
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
