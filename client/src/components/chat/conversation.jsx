import React, { useContext } from 'react'
import "../../css/conversation.css"
import AccountContext from '../../context/accoountcontext'
import { formatDate } from '../../utils/common'

const ImageMessage = ({ message }) => {
  return (
    <>
      <div className="image-message">
        {
          message.text?.includes('.pdf') ?
            <div className='pdf'>
              <img style={{ height: "80px", width: "fit-content" }} src="pdf.png" alt="pdf" />
              <h6>{message.text.split("/").pop()}</h6>
            </div> :
            <div>
              <img style={{ height: "80px", width: "fit-content" }} src={'/images/'+message.text} alt={message.type} />
            </div>
        }
        <div>
          {formatDate(message.createdAt)}
        </div>
      </div>
    </>
  )
}

const TextMessage = ({ message }) => {
  return (
    <>
      <div className="message d-flex justify-content-center align-items-center position-relative">
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
      <div>
        {account.sub === message.senderId ? (
          <div className='conversation d-flex justify-content-end'>
            <div className=' conversation-box sender py-1 d-flex mt-1 me-1 '>
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
            <div className=' conversation-box reciever py-1 d-flex mt-1 mx-1'>
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
