import React, { useContext } from 'react'
import "../styles/Chat.css"
import { MyContext } from '../context/MyContext'

export default function Chat() {
  const { newChat, prevChats } = useContext(MyContext)
  return (
    <>
      {newChat && <h1>Start a new chat!</h1>}
      <div className="chats">

        {
          prevChats?.map((chat, idx) => (
            <div className={chat.role === 'user' ? "userDiv" : "gptDiv"} key={idx}>
              {
                chat.role === 'user' ?
                <p className='userMessage'>{chat.content}</p>
                :
                <p className='gptMessage'>{chat.content}</p>
              }
            </div>
          ))
        }
      </div>
    </>
  )
}
