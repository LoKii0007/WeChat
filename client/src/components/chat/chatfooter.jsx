import React, { useContext, useEffect, useState } from 'react';
import { UpdateConversation, newMessage } from '../../service/api';
import AccountContext from '../../context/accoountcontext';
import axios from 'axios';
import toast from 'react-hot-toast'

const ChatFooter = ({ conversation, setMessages }) => {
    const backUrl = 'https://we-chat-ten.vercel.app/file/cloudinaryUpload'
    // const backUrl = 'http://localhost:8000/file/cloudinaryUpload';
    const { account, person, socket, setRecenetMessage } = useContext(AccountContext);

    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [imageName, setImageName] = useState("");
    const [imageUploading, setImageUploading] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    function responsive() {
        if (window.innerWidth > 600) {
            setMobile(false);
        } else {
            setMobile(true);
        }
    }

    useEffect(() => {
        responsive();
        window.addEventListener('resize', responsive);
        return () => {
            window.removeEventListener('resize', responsive);
        };
    }, []);

    const onChange = (e) => {
        setText(e.target.value);
    };

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        const previewUrl = URL.createObjectURL(selectedFile);
        setImagePreviewUrl(previewUrl);
    };

    const uploadImage = async () => {
        setImageUploading(true);
        if (file) {
            const data = new FormData();
            data.append("image", file);
            try {
                let response = await axios.post(backUrl, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 200) {
                    setImageName(response.data.originalName);
                    setImageUrl(response.data.url);
                    if (!text) setText(response.data.originalName);  // Set text only if it's empty
                } else {
                    // console.error("Unexpected response format:", response);
                    toast.error('something went wrong')
                }
            } catch (error) {
                // console.error("Error uploading image:", error);
                toast.error('something went wrong')
            }
            setImageUploading(false);
        }
    };

    useEffect(() => {
        if (file) {
            uploadImage();
        }
    }, [file]);

    useEffect(() => {
        console.log(imageName, imageUrl);
    }, [imageUrl, imageName, imageUploading]);

    useEffect(() => { }, [conversation]);

    const sendMessage = async (e) => {
        e.preventDefault()
        if(!socket){
            toast.error('something went wrong')
            // console.log('some error occured')
            return
        }
        let message = {};
        if (conversation?._id) {
            if (!imageUrl && !imageName) {
                message = {
                    conversationId: conversation._id,
                    senderId: account.sub,
                    recieverId: person.sub,
                    type: "text",
                    text: text
                };
            } else {
                message = {
                    conversationId: conversation._id,
                    senderId: account.sub,
                    recieverId: person.sub,
                    type: "file",
                    text: imageName,
                    url: imageUrl
                };
            }
        }

        socket.send(JSON.stringify({
            type: 'message_sent',
            payload: {
                sender: account.sub,
                receiver: person.sub,
                newMessage: message
            }
        }));

        setMessages(prev => [...prev, message]);

        if ((message.text && message.text.length > 0) || imageName) {
            setText("");
            setFile(null);
            setImageName("");
            setImageUrl("");
            await newMessage(message);
            const res = await UpdateConversation({ senderId: account.sub, recieverId: person.sub, message: message.text });
            if (res != undefined) {
                setRecenetMessage(res);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && text.length > 0) {
            sendMessage();
        }
    };

    return (
        <>
            {imageName &&
                <div className='uploadImage' >
                    <img className='' src={`${imageUrl}`} alt={imageName} />
                </div>
            }

            {/* <div className='uploadImage' >
                <img className='' src='/emptychst.png' alt={imageName} />
            </div> */}

            <div className="chatbox-footer position-static py-2 d-flex flex-row align-items-center">

                {!mobile &&
                    <div className='smile-icon icon py-1 mx-2 px-2 ms-3 d-flex justify-content-center align-items-center'>
                        <i className="fa-regular fa-face-smile"></i>
                    </div>
                }

                <label htmlFor="plus-icon">
                    <div className='plus-icon icon ms-2 p-2 d-flex justify-content-center align-items-center'>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                </label>
                <input id='plus-icon' type="file" style={{ display: "none" }} onChange={onFileChange} />

                <div className='chatbox-input mx-2 rounded-pill'>
                    <form className="d-flex align-items-center rounded-pill">
                        <input onKeyDown={handleKeyDown} onChange={onChange} value={text} className="form-control chatbox-form-control rounded-pill me-2" type="text" placeholder="Type a message" />
                        <button disabled={!imageName && !text} onClick={(e)=>sendMessage(e)} className='icon send-icon rounded-circle py-1 px-3' >
                            <i className="fa-regular fa-paper-plane"></i>
                        </button>
                    </form>
                </div>

                {!mobile &&
                    <div className='mic-icon icon py-1 px-2 me-4 d-flex justify-content-center align-items-center'>
                        <i className="fa-solid fa-microphone"></i>
                    </div>
                }

            </div>
        </>
    );
};

export default ChatFooter;
