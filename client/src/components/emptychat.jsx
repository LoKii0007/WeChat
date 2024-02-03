import React from 'react'
import "../css/emptychat.css"

const EmptyChat = () => {
  return (
    <>
      <div className="chat-display d-flex justify-content-center align-items-center ">
        <div className="empty-chat d-flex flex-column justify-content-center align-items-center">
          <div className="empty-chat-img mb-4">
            <img src="emptychst.png" alt="" />
          </div>
          <div className="empty-chat-body d-flex flex-column mb-4">
            <div className='mb-1 text-center'>
              <h1>Downlaod WeChat for windows</h1>
            </div>
            <div className='mb-1'>
              Make calls, share your screen for faster experience when you download the windows app
            </div>
          </div>
          <div className="empty-footer text-center">
            <button className='btn btn-success'>
              Get the app
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmptyChat
