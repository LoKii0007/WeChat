import React, { useState, useContext, useEffect } from 'react'
import AccountContext from '../context/accoountcontext'
import { setConversation, getConversation } from '../service/api'
import { formatDate } from '../utils/common'
import "../css/chatdialog.css"
import ChatBox from './chatbox'

const ChatDialog = ({ user }) => {

  const { setPerson, account, person } = useContext(AccountContext)
  const [clicked, setClicked] = useState("")
  const [message, setMessage] = useState({})
  const [data, setdata] = useState({})

  const getUser = async () => {
    setPerson(user)
    setClicked(user.sub)
    await setConversation({ senderId: account.sub, recieverId: user.sub })
  }

  useEffect(() => {
    const getConvoDetails = async () => {
      const convo = await getConversation({ senderId: account.sub, recieverId: user.sub })
      setdata(convo)
      setMessage({
        text: data?.message,
        timestamp: data?.createdAt
      })
    }

    getConvoDetails()

  }, [])

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

  return (
    <>
      <div onClick={() => getUser()} 
        className={`${clicked === person.sub && 'clicked'} chat-item d-flex flex-row align-items-center`}
        data-bs-toggle={mobile?"offcanvas":''} 
        data-bs-target={mobile?"#offcanvasExample":''}
        aria-controls={mobile?"offcanvasExample":''}
      >
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


      {/* offcanvas  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>  */}

      <div className="offcanvas offcanvas-start mobile-chatbox offcanvas-sm" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <ChatBox/>
      </div>

    </>
  )
}

export default ChatDialog
