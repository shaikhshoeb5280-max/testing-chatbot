import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage.jsx'
import './Chatmessages.css'
import SpinnerImage from '../assets/loading-spinner.gif'

function ChatMessages({ chatmessages, isloading }) {
  const chatmessageRef = useRef(null)

  useEffect(() => {
    const containerElem = chatmessageRef.current
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight
    }
  }, [chatmessages])

  return (
    <div className="chat-message-container" ref={chatmessageRef}>

      {chatmessages.length === 0 ? (
        <div className="default-message">
          <p>Welcome! Send a message below to start chatting 👋</p>
        </div>
      ) : null}

      {chatmessages.map((chatmessage) => (
        <ChatMessage
          message={chatmessage.message}
          sender={chatmessage.sender}
          key={chatmessage.id}
        />
      ))}

      {isloading === true ?
        <ChatMessage message={<img src={SpinnerImage} className="spinner-img" />} sender='robot' />
        : null
      }
    </div>
  );
}

export default ChatMessages