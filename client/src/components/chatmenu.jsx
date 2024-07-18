import React, { useContext, useEffect, useState } from 'react'
import ChatDialog from "../components/chatdialog"
import Drawer from '../components/drawer'
import "../css/chats.css"
import { getUsers } from '../service/api'
import AccountContext from '../context/accoountcontext'

const ChatMenu = () => {
    const [users, setUsers] = useState([])
    const { account, activeUsers, setActiveUsers, socket} = useContext(AccountContext)
    const [text, setTetxt] = useState("")

    const onchange = (e) => {
        e.preventDefault()
        setTetxt(e.target.value)
    }

    useEffect(() => {
        const fetchdata = async () => {
            try {
                let response = await getUsers()
                if (response) {
                    const filteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
                    setUsers(filteredData)
                } else {
                    console.log("invalid response", response)
                }
            }
            catch (error) {
                console.log("error ", error)
            }
        }

        fetchdata()
    }, [text])

    // useEffect(() => {

    //     if (!socket) {
    //         return
    //     }
    //     socket.onmessage = (event) => {
    //         const message = JSON.parse(event.data)
    //         if (message.type === 'activeUsers') {
    //             setActiveUsers(message.payload)
    //             console.log('active users : ', activeUsers.length)
    //         }
    //     }

    // }, [activeUsers])

    const handleEllipsis = () => {

    }


    return (
        <>

            <div className="chats d-flex flex-column align-items-center">

                {/* --------------chat header------------- */}

                <div className="chat-top d-flex flex-row py-2 justify-content-between align-items-center ">
                    <div className="chat-top-left ms-3">
                        <Drawer />
                    </div>

                    <div className="chat-top-right d-flex flex-row">
                        <div onClick={handleEllipsis} className=''><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z" /></svg></div>

                        <div className='mx-4'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" /></svg></div>

                        <div className='me-4'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg></div>
                    </div>
                </div>

                {/* --------------chat-search---------------- */}

                <div className="chat-search d-flex flex-row align-items-center justify-content-center">
                    <form className="d-flex search-form align-items-center" role="search">
                        <div className="search-icon ms-3">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                        </div>
                        <input onChange={(e) => onchange(e)} value={text} className="form-control chatmenu-form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>

                {/* ----------------all chats-------------- */}

                <div className="all-chats pt-2 d-flex flex-column align-items-center">

                    {users && users.length > 0 ?
                        users.map(user => {
                            return ((account.sub !== user.sub) && <ChatDialog key={user._id} user={user} />)
                        }) : 'loading...'
                    }
                </div>
            </div>
        </>
    )
}

export default ChatMenu
