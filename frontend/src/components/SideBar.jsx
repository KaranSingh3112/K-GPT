import React, { useContext, useEffect } from 'react'
import "../styles/SideBar.css"
import { MyContext } from '../context/MyContext'
import { v1 as uuidv1 } from "uuid";
import API from '../api/axios';
import toast from "react-hot-toast";
import logo from "../assets/blacklogo.png";

export default function SideBar({ isSidebarOpen, setIsSidebarOpen }) {

  const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(MyContext);

  const getAllThreads = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAllThreads([]);
      return;
    }
    try {
      const { data } = await API.get("/thread")
      setAllThreads(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      )
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
      const { data } = await API.get(`/thread/${newThreadId}`)
      setPrevChats(data)
      setNewChat(false);
      setReply(null)

    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      )
    }
  }

  const deleteThread = async (threadId) => {
    try {
      await API.delete(`/thread/${threadId}`)
      //Updating threads re-render 
      setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId))
      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      )
    }
  }

  return (
    <section className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      {
        isSidebarOpen &&
        <div
          className="overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      }
      {/* New chat button */}
      <button onClick={createNewChat}>
        <img src={logo} className='logo' alt="K-GPT" />
        <span className="fa-regular fa-pen-to-square"></span>
      </button>

      {/* history */}
      <ul className='history'>
        {
          allThreads?.map((thread, idx) => (
            <li key={idx}
              onClick={(e) => { changeThread(thread.threadId) }}
              className={thread.threadId === currThreadId ? "highlighted" : ""}
            >
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
