import React, { useContext } from 'react'
import "../../css/conversation.css"
import AccountContext from '../../context/accoountcontext'
import { formatDate } from '../../utils/common'

const ImageMessage = ({ message  }) => {

  return (
    <>
      <div className="image-message position-relative">
        {
          message.text?.includes('.pdf') ?
            <div className='pdf'>
              <img src="pdf.png" alt="pdf" />
              <h6>{message.text.split("/").pop()}</h6>
            </div> :
            <div className='simple-img'>
              <img src={'/images/' + message.text} alt={message.type} />
            </div>
        }
        <div className='position-absolute img-time'>
          {formatDate(message.createdAt)}
        </div>
      </div>
    </>
  )
}

const TextMessage = ({ message }) => {
  return (
    <>
      <div className="message p-1 d-flex justify-content-center align-items-center position-relative">
        <div className='message-text pe-5'>{message.text}</div>
        <div className=' message-time position-absolute'>{formatDate(message.createdAt)}</div>
      </div>
    </>
  )
}

const Conversation = ({ message }) => {

  const { account } = useContext(AccountContext)

  return (
    <>
      <div >
        {account.sub === message.senderId ? (
          <div className='conversation d-flex justify-content-end'>
            <div className=' conversation-box sender d-flex py-1  '>
              {
                message.type === "file" ?
                  <ImageMessage message={message} /> : (
                    <TextMessage message={message} />
                  )
              }
            </div>
          </div>
        ) : (
          <div className='conversation d-flex justify-content-start'>
            <div className=' conversation-box reciever py-1 d-flex'>
              <div className="message">
                {
                  message.type === "file" ?
                    <ImageMessage message={message} /> :
                    <TextMessage message={message} />
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Conversation
