import React from 'react'
import "../styles/SideBar.css"

export default function SideBar() {
  return (
    <section className='sidebar'>
      {/* New chat button */}
      <button>
        <img src="../src/assets/blacklogo.png" className='logo' alt="K-GPT" />
        <span className="fa-regular fa-pen-to-square"></span>
      </button>

      {/* history */}
      <ul className='history'>
        <li>History 1</li>
        <li>History 2</li>
        <li>History 3</li>
      </ul>

      {/* Sign */}
      <div className='sign'>
        <p> By Karan Singh &hearts; </p>
      </div>
    </section>
  )
}
