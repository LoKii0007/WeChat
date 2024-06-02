import React, { useState } from 'react'
import AccountContext from './accoountcontext'
import UseSocket from '../hooks/UseSocket'

const AccountProvider = (props) => {

  const [account, setAccount] = useState()
  const [person, setPerson] = useState({})
  const [activeUsers, setActiveUsers] = useState([])
  const socket = UseSocket()

  return (
    <>
      <AccountContext.Provider value={{ account, setAccount, person, setPerson,activeUsers, setActiveUsers, socket }}>
        {props.children}
      </AccountContext.Provider>

    </>
  )
}

export default AccountProvider
