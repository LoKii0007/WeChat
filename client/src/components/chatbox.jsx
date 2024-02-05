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
        if (conversation && conversation._id) {
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
        if ((person && person._id ) || (conversation && conversation._id)) {
            getMessageDetails();
        }
    },[person?._id, conversation?._id])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({transition:"smooth"})
    },[messages, getMessageDetails])


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
                        <div className="header-search-icon icon mx-3 py-1 px-2 d-flex justify-content-center align-items-center">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className="header-ellipsis-icon icon py-1 px-2 me-4 d-flex justify-content-center align-items-center">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
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
