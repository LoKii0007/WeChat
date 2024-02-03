import React, { useContext } from 'react'
import EmptyChat from '../components/emptychat'
import ChatMenu from '../components/chatmenu'
import ChatBox from '../components/chatbox'
import AccountContext from '../context/accoountcontext'
import "../css/chats.css"


const Chats = () => {

  const {person} = useContext(AccountContext)

  return (
    <>
      <div className="chat-menu d-flex flex-row">

        <ChatMenu />
        { Object.keys(person).length? <ChatBox/> : <EmptyChat/>}
        
      </div>
    </>
  )
}

export default Chats