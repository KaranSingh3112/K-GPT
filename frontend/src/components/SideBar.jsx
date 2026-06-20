import React, { useContext, useEffect } from 'react'
import "../styles/SideBar.css"
import { MyContext } from '../context/MyContext'
import { v1 as uuidv1 } from "uuid";

export default function SideBar() {

  const { allThreads, setAllThreads, currThreadId, newChat, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();
      const filteredData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }))
      setAllThreads(filteredData)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllThreads();
  }, [currThreadId])

  const createNewChat = () => {
    setNewChat(true)
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  }

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    try {
      const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
      const res = await response.json();
      console.log(res);
      setPrevChats(res);
      setNewChat(false);
      setReply(null)

    } catch (error) {
      console.log(error);

    }
  }

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/thread/${threadId}`,{method: "DELETE"})
      const res = await response.json();
      console.log(res);
      //Updating threads re-render 
      setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId))
      if(threadId === currThreadId){
        createNewChat();
      }
    } catch (error) {
      console.log(error);
    }
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
          allThreads?.map((thread, idx) => (
            <li key={idx} onClick={(e) => { changeThread(thread.threadId) }}>
              {thread.title}
              <i className="fa-solid fa-trash" onClick={(e) => {
                e.stopPropagation(); //stop event bubbling
                deleteThread(thread.threadId)
              }}
              >
              </i>
            </li>
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
