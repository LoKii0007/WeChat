import React, { useContext} from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"
import AccountContext from '../context/accoountcontext'
import { adduser } from '../service/api'
import toast from 'react-hot-toast'
import '../css/logindialog.css'

const LoginDialog = () => {

  const {socket, setAccount} = useContext(AccountContext)

  const loginCredentials = async (res) => {
    const decoded = jwtDecode(res.credential)
    setAccount(decoded)
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'addUser',
        payload: decoded
      }));
      // console.log('Message sent')
    } else {
      // console.log('WebSocket is not open')
      toast.error('something went wrong')
    }
    await adduser(decoded)
  }

  const loginError = () => {
    console.log("login failed")
    toast.error('something went wrong')
  }

  return (
    <>
      <div className="header" />
      <div className="top">
        <img src="" alt="" />
        <div className="top-heading">
          whatsapp web
        </div>
      </div>
      <div className="conatiner">
        <div className="screen m-5">
          <div className="heading text-center">
            <h1>Chat with your frined online</h1>
          </div>
          <div className="body d-flex position-relative justify-content-center">
            <img className='d-flex justify-content-center' src="qr.webp" alt="" />
            <div className="login-box position-absolute">
              <GoogleLogin
                onSuccess={loginCredentials}
                onError={loginError}
              />
            </div>
          </div>
        </div>
        <br />

      </div>
    </>
  )
}

export default LoginDialog
