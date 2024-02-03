import React, { useContext, useEffect, useState } from 'react'
import { newMessage, uploadFile } from '../../service/api'
import AccountContext from '../../context/accoountcontext'

const ChatFooter = ({ conversation, onMessageSend, setMessages }) => {
    const { account, person , socket} = useContext(AccountContext)

    const [text, setText] = useState("")
    const [image, setImage] = useState("")
    const [imageName, setImageName] = useState("")
    const [incoming , setIncoming] = useState(null)

    const onChange = (e) => {
        e.preventDefault()
        setText(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            sendMessage()
        }
    }

    const onFileChange = (e) => {
        e.preventDefault()
        // console.log(e.target.files[0])
        setImage(e.target.files[0])
    }

    const uploadImage = async()=>{
        if(image){
            const data = new FormData();
            data.append("image", image);
            // console.log(data.get("image"))

            let response = await uploadFile(data);

            if (response.imageName) {
                setImageName(response.imageName);
                if(imageName){
                    setText({text:imageName})
                }
            } else {
              console.error("Unexpected response format:", response);
            }
        }
    }

    useEffect(()=>{
        uploadImage()
    },[image])

    const sendMessage = async () => {
        let message = {}
        if(!imageName){
            message={
            conversationId: conversation._id,
            senderId: account.sub,
            recieverId: person.sub,
            type: "text",
            text: text
            }
        }else{
            message={
                conversationId: conversation._id,
                senderId: account.sub,
                recieverId: person.sub,
                type: "file",
                text: imageName
            }
        }

        socket.current.emit('newMessage', message)
        await newMessage(message)
        setText("")
        setImage("")
        setImageName("")
        onMessageSend()
    }

    useEffect(()=>{
        socket.current.on('onMessageSend', data=>{
            setIncoming({
                ...data,
                createdAt : Date.now()
            })
        })
    })

    useEffect(() => {
      incoming && conversation?.member?.includes(incoming.senderId) && setMessages(prev => [...prev, incoming])
    }, [incoming, conversation])
    


    return (
        <>
        {image && <img src={URL.createObjectURL(image)}/>}
            <div className="chatbox-footer position-static py-2 d-flex flex-row align-items-center">
                <div className='smile-icon icon py-1 mx-2 px-2 ms-3 d-flex justify-content-center align-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                </div>
                <label htmlFor="plus-icon">
                    <div className='plus-icon icon py-1 mx-2 px-2 d-flex justify-content-center align-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                    </div>
                </label>
                <input  id='plus-icon' type="file" style={{ display: "none" }} onChange={(e) => onFileChange(e)} />
                <div className='chatbox-input mx-2'>
                    <form className="d-flex align-items-center">
                        <input onKeyDown={handleKeyDown} onChange={onChange} value={text} className="form-control chatbox-form-control me-2" type="text" placeholder="Type a message" />
                    </form>
                </div>
                <div className='mic-icon icon py-1 px-2 me-4 d-flex justify-content-center align-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" /></svg>
                </div>
            </div>
        </>
    )
}

export default ChatFooter
