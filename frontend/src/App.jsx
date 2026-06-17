
import { useState } from 'react'
import './App.css'
import ChatWindow from './components/ChatWindow'
import SideBar from './components/SideBar'
import { MyContext } from './context/MyContext'
import {v1 as uuidv1, v1} from "uuid"

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId
  }

  return (
    <div className='app'>
      <MyContext.Provider value={providerValues}>
        <SideBar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  )
}

export default App
