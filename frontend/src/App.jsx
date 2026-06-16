
import './App.css'
import ChatWindow from './components/ChatWindow'
import SideBar from './components/SideBar'
import { MyContext } from './context/MyContext'

function App() {
  const providerValues = {}

  return (
    <div className='app'>
      <MyContext.Provider values={providerValues}>
        <SideBar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  )
}

export default App
