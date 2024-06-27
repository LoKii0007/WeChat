import React, { useContext, useEffect, useState } from 'react'
import EmptyChat from '../components/emptychat'
import ChatMenu from '../components/chatmenu'
import ChatBox from '../components/chatbox'
import AccountContext from '../context/accoountcontext'
import "../css/chats.css"


const Chats = () => {

  const {person} = useContext(AccountContext)
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
      <div className="chat-menu d-flex flex-row">

        <ChatMenu />
        { !mobile && Object.keys(person).length? <ChatBox/> : <EmptyChat/>}
      </div>
    </>
  )
}

export default Chats