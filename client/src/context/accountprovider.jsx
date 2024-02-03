import React, { useState, useEffect, useRef } from 'react'
import AccountContext from './accoountcontext'
import {io} from "socket.io-client"


const AccountProvider = (props) => {

  const [account, setAccount] = useState()
  const [person, setPerson] = useState({})
  const [activeUsers, setActiveUsers] = useState([])
  const socket = useRef()

  useEffect(()=>{
    socket.current = io("ws://127.0.0.1:9000")
  },[])
  
  return (
    <>
      <AccountContext.Provider value={{ account, setAccount, person, setPerson, socket, setActiveUsers }}>
        {props.children}
      </AccountContext.Provider>

    </>
  )
}

export default AccountProvider
