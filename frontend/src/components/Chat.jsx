import React, { useContext } from 'react'
import "../styles/Chat.css"
import { MyContext } from '../context/MyContext'
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";

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
                <ReactMarkdown rehypePlugins={[rehypeHighlight]} >{chat.content}</ReactMarkdown>
              }
            </div>
          ))
        }
      </div>
    </>
  )
}
