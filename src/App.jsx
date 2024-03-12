import { useState, createContext } from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Header from './Components/Header'
import UserContext from './Contexts/User'
import ArticleCard from './Components/ArticleCard'
import Home from './Components/Home'


function App() {

  const [loggedInUser, setLoggedInUser]=useState({
    username: 'You',
    avatar_url: '../Hello@112.png'
  })
  
  return (
    <>
    <UserContext.Provider value={{loggedInUser: loggedInUser, setLoggedInUser:setLoggedInUser}}>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/articles/:article_id" element={<ArticleCard/>}/>
        {/* <Route path="/create" element={<Create/>}/> */}
      </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App
