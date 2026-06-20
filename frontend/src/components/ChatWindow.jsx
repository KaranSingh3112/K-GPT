import { useContext, useEffect, useState } from 'react'
import "../styles/ChatWindow.css"
import Chat from './Chat'
import { MyContext } from '../context/MyContext'
import { ScaleLoader } from "react-spinners";
import "highlight.js/styles/github-dark.css";

export default function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat } = useContext(MyContext)
  const [loading, setLoading] = useState(false)


  const getReply = async () => {
    setLoading(true)
    setNewChat(false)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      })
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat", options)
      const res = await response.json()
      console.log(res);
      setReply(res.reply)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  // Appending new chats to prevChats
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats(prevChats => [
        ...prevChats,
        { role: "user", content: prompt },
        { role: "assistant", content: reply }
      ])
      setPrompt("")
    }
  }, [reply])

  return (
    <div className='chatWindow'>
      <div className="navbar">
        <span>K-GPT <i className="fa-solid fa-angle-down"></i></span>
        <div className="userIconDiv">
          <span className='userIcon'><i className="fa-solid fa-user"></i></span>
        </div>
      </div>

      <Chat />

      <ScaleLoader color='#fff' loading={loading}>

      </ScaleLoader>

      <div className="chatInput">
        <div className="inputBox">
          <input type="text"
            placeholder='Ask anything...'
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" ? getReply() : ""}
          />
          <div id='submit' onClick={getReply}><i className="fa-solid fa-arrow-up"></i></div>
        </div>
        <p className="info">
          K-GPT can make mistakes. Check important info. See Cookie Prefrences
        </p>
      </div>
    </div>
  )
}
