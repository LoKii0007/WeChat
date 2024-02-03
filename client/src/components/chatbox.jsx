import React, {useContext, useEffect, useState, useRef} from 'react'
import "../css/chatbox.css"
import AccountContext from '../context/accoountcontext'
import { getConversation,  getMessage } from '../service/api'
import Conversation from './chat/conversation'
import ChatFooter from './chat/chatfooter'

const ChatBox = () => {

    const {account, person, activeUsers } = useContext(AccountContext)

    const [messages, setMessages] = useState([])
    const [conversation, setConversation] = useState({})
    const [text, setText] = useState("")
    const scrollRef = useRef()


    useEffect(()=>{
        const getConvoDetails = async ()=>{
            let data = await getConversation({senderId:account.sub, recieverId:person.sub})
            setConversation(data)
        }
        getConvoDetails()
    },[person.sub])


    const getMessageDetails = async ()=>{
        if (conversation._id) {
            let message = await getMessage(conversation._id);
            if(message){
                // const filteredData = message.filter(msg => msg.text.toLowerCase().includes(text.toLowerCase()))
                // setMessages(filteredData);
                setMessages(message )
            }
            else{
                console.log("no messages")
            }
        }
    }

    useEffect(()=>{
        getMessageDetails()
        window.scrollTo()
    },[person._id, conversation._id])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({transition:"smooth"})
    },[messages])


    return (
        <>
            <div className="chat-box d-flex flex-column" id='chat-box'>

              <div className="chatbox-header position-static py-2 d-flex flex-row justify-content-between align-items-center">
                    <div className="header-left d-flex flex-row justify-content-center align-items-center">
                        <div className="header-img mx-2 ms-4">
                            <img src={person.picture} alt="" />
                        </div>
                        <div className="header-name mx-2 d-flex flex-column">
                            <div className="header-profile-name">
                                {person.name}
                            </div>
                            <div className="header-profile-status">
                                {activeUsers?.find(user => user.sub === person.sub)?"online":"offline"}
                            </div>
                        </div>
                    </div>
                    <div className="header-right d-flex flex-row ">
                        <div className="header-search-icon icon mx-3 d-flex justify-content-center align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                        </div>
                        <div className="header-ellipsis-icon icon mx-3 me-4 d-flex justify-content-center align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>
                        </div>
                    </div>
              </div>

              <div className=" chatbox-body">
                <div className='mt-auto mb-1'>
                {
                    messages && messages.length>0 ? messages.map((message)=>{
                        return( <Conversation ref={scrollRef} key={message._id} message={message}/>)
                    }) : ""
                }
                </div>
              </div>

              <ChatFooter person={person} onMessageSend={getMessageDetails} setMessages={setMessages} conversation={conversation}/>

            </div>
        </>
    )
}

export default ChatBox
