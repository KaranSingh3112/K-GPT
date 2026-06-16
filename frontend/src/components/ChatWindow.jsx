import React from 'react'
import "../styles/ChatWindow.css"
import Chat from './Chat'

export default function ChatWindow() {
  return (
    <div className='chatWindow'>
      <div className="navbar">
        <span>K-GPT <i class="fa-solid fa-angle-down"></i></span>
        <div className="userIconDiv">
          <span className='userIcon'><i class="fa-solid fa-user"></i></span>
        </div>
      </div>

      <Chat />

      <div className="chatInput">
        <div className="inputBox">
          <input type="text" placeholder='Ask anything...'/>
          <div id='submit'><i class="fa-solid fa-arrow-up"></i></div>
        </div>
        <p className="info">
          K-GPT can make mistakes. Check important info. See Cookie Prefrences
        </p>
      </div>
    </div>
  )
}
