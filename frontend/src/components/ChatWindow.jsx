import { useContext, useEffect, useState } from 'react'
import "../styles/ChatWindow.css"
import Chat from './Chat'
import { MyContext } from '../context/MyContext'
import { ScaleLoader } from "react-spinners";
import "highlight.js/styles/github-dark.css";
import { useNavigate } from 'react-router-dom';
import { v1 as uuidv1 } from "uuid";
import toast from "react-hot-toast";

export default function ChatWindow({isSidebarOpen,setIsSidebarOpen}) {
  const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat, setAllThreads, setCurrThreadId } = useContext(MyContext)
  const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate();

  const getReply = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Please login to continue")
      navigate("/login")
      return;
    }

    setLoading(true)
    setNewChat(false)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
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

  const resetChatState = () => {
    setAllThreads([]);
    setPrevChats([]);
    setReply(null);
    setPrompt("");
    setCurrThreadId(uuidv1());
    setNewChat(true);
  };

  return (
    <div className='chatWindow'>
      <div className="navbar">
        <i
          className="fa-solid fa-bars hamburger"
          onClick={() => setIsSidebarOpen(prev => !prev)}
        ></i>
        <span>K-GPT <i className="fa-solid fa-angle-down"></i></span>
        <div className="userIconDiv" onClick={() => setIsOpen(!isOpen)}>
          <span className='userIcon'><i className="fa-solid fa-user"></i></span>
        </div>
      </div>

      {
        isOpen &&
        <div className="dropDown">
          <div className="dropDownItem"><i className="fa-solid fa-gear"></i>Settings</div>
          <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i>Upgrade plan</div>
          {
            localStorage.getItem("token")
              ?
              <div className='dropDownItem'
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  resetChatState();
                  toast.success("Logged out successfully");
                  navigate("/")
                }}
              >
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </div>
              :
              <div className='dropDownItem' onClick={() => navigate("/login")}>
                <i className="fa-solid fa-right-to-bracket"></i>
                Login
              </div>
          }
        </div>
      }

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
