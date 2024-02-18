import React, { useState, useContext }  from 'react'
import AccountContext from '../context/accoountcontext'
import { setConversation , getConversation} from '../service/api'
import { formatDate } from '../utils/common'

import "../css/chatdialog.css"
import { useEffect } from 'react'

const ChatDialog = ({user}) => {

  const {setPerson , account} = useContext(AccountContext)
  const [clicked, setClicked] = useState(null)
  const [message , setMessage] = useState({})
  const [data, setdata] = useState({})

  const getUser = async ()=>{
    if (user.sub !== clicked) {
      setClicked(user.sub);
    }
    setPerson(user)
    await setConversation({senderId:account.sub, recieverId:user.sub})
  }

  useEffect(()=>{
    const getConvoDetails = async()=>{
      const convo = await getConversation({senderId:account.sub , recieverId : user.sub })
      setdata(convo)
      setMessage({
        text:data?.message,
        timestamp : data?.createdAt
      })
    }

    getConvoDetails()

  },[])

  useEffect(()=>{
  }, [clicked])

  return (
    <>
      <div onClick={()=>getUser()} className={`chat-item ${clicked === user.sub ?"clicked": ""} d-flex flex-row align-items-center`}>
        <div className="chat-profile mx-2">
          <img src={user.picture} alt="" />
        </div>
        <div className="chat-info py-2 d-flex flex-column mx-2">
          <div className="info-top d-flex flex-row justify-content-between align-items-center">
            <div className="chat-name">
              {user.name}
            </div>
            <div className="chat-time">
              {message.timestamp ? formatDate(message.timestamp) : ""}
            </div>
          </div>
          <div className="info-bottom d-flex flex-row justify-content-between align-items-center">
            <div className="chat-data">
             {message.text ? message.text : "start chatting"}
            </div>
            <div className="unread-chat">
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatDialog
