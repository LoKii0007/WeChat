import React, { useContext } from 'react'
import Chats from './chats'
import LoginDialog from '../components/logindialog'
import AccountContext from '../context/accoountcontext'

const Messanger = () => {
  const {account} = useContext(AccountContext)
  return (
    <>
      {account?
        <Chats/>:
        <LoginDialog/>
      }
    </>
  )
}

export default Messanger
