import React, { useContext, useEffect } from 'react'
import "../styles/SideBar.css"
import { MyContext } from '../context/MyContext'
import { v1 as uuidv1} from "uuid";

export default function SideBar() {

  const {allThreads, setAllThreads, currThreadId, newChat, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats} = useContext(MyContext);

  const getAllThreads = async() => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}))
      console.log(filteredData);
      setAllThreads(filteredData)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllThreads();
  },[currThreadId])

  const createNewChat = () => {
    setNewChat(true)
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  }

  return (
    <section className='sidebar'>
      {/* New chat button */}
      <button onClick={createNewChat}>
        <img src="../src/assets/blacklogo.png" className='logo' alt="K-GPT" />
        <span className="fa-regular fa-pen-to-square"></span>
      </button>

      {/* history */}
      <ul className='history'>
        {
          allThreads?.map((thread)=>(
            <li>{thread.title}</li>
          ))
        }
      </ul>

      {/* Sign */}
      <div className='sign'>
        <p> By Karan Singh &hearts; </p>
      </div>
    </section>
  )
}
