import React, { useState, useContext, useEffect } from 'react'
import AccountContext from '../context/accoountcontext'
import { setConversation, getConversation } from '../service/api'
import { formatDate } from '../utils/common'
import "../css/chatdialog.css"
import ChatBox from './chatbox'

const ChatDialog = ({ user }) => {

  const { setPerson, account, person, socket, recentMessage } = useContext(AccountContext)
  const [clicked, setClicked] = useState("")
  const [message, setMessage] = useState({})
  const [newconvo, setNewConvo] = useState()

  const getUser = async () => {
    setPerson(user)
    setClicked(user.sub)
    const res = await setConversation({ senderId: account.sub, recieverId: user.sub })
    if (res.status) {
      setNewConvo(res.message)
    }
  }

  const getConvoDetails = async () => {
    const convo = await getConversation({ senderId: account.sub, recieverId: user.sub })
    setMessage({
      text: convo?.message,
      timestamp: convo?.createdAt
    })
  }

  useEffect(() => {
    getConvoDetails()
    console.log(message)
  }, [newconvo, recentMessage])

  // reponsiveness
  const [mobile, setMobile] = useState(false)
  function responsive() {
    if (window.innerWidth > 600) {
      setMobile(false)
    } else {
      setMobile(true)
    }
  }
  useEffect(() => {
    responsive()
    window.addEventListener('resize', responsive)
    return () => {
      window.removeEventListener('resize', responsive)
    }
  }, [])

  //socket
  useEffect(() => {
    if (!socket) {
      return
    }
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'update_receiver') {
        console.log('recieved :', data.payload)
        getConvoDetails()
      }
    }
  }, [socket])

  useEffect(() => {
    console.log(message)
  }, [message])

  return (
    <>
      <div onClick={() => getUser()}
        className={`${clicked === person.sub && 'clicked'} chat-item d-flex flex-row align-items-center`}
        data-bs-toggle={mobile ? "offcanvas" : ''}
        data-bs-target={mobile ? "#offcanvasExample" : ''}
        aria-controls={mobile ? "offcanvasExample" : ''}
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

      <div className="offcanvas offcanvas-start mobile-chatbox offcanvas-sm" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <ChatBox />
      </div>

    </>
  )
}

export default ChatDialog
