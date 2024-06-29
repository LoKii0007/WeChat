import React, { useState } from 'react'
import AccountContext from './accoountcontext'
import UseSocket from '../hooks/UseSocket'

const AccountProvider = (props) => {

  const [account, setAccount] = useState()
  const [person, setPerson] = useState({})
  const [activeUsers, setActiveUsers] = useState([])
  const socket = UseSocket()
  const [recentMessage, setRecenetMessage] = useState({})

  return (
    <>
      <AccountContext.Provider value={{ account, setAccount, person, setPerson,activeUsers, setActiveUsers, socket, recentMessage, setRecenetMessage }}>
        {props.children}
      </AccountContext.Provider>

    </>
  )
}

export default AccountProvider
