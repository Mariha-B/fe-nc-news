import { useState, createContext } from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Header from './Components/Header'
import UserContext from './Contexts/User'


function App() {
  const [loggedInUser, setLoggedInUser]=useState({
    username: 'You',
    avatar_url: '../Hello@112.png'
  })
  return (
    <>
    <UserContext.Provider value={{loggedInUser: loggedInUser, setLoggedInUser:setLoggedInUser}}>
      <Routes>
        <Route path="/" element={<Header/>}/>
        {/* <Route path="/create" element={<Create/>}/> */}
      </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App
