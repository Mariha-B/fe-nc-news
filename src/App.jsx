import { useState, createContext } from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Header from './Components/Header'
import UserContext from './Contexts/User'
import ArticleCard from './Components/ArticleCard'
import Home from './Components/Home'
import ArticleList from './Components/ArticleList'


function App() {

  const [loggedInUser, setLoggedInUser]=useState({
    username: 'grumpy19',
    avatar_url: '../bean.png'
  })
  
  return (
    <>
    <UserContext.Provider value={{loggedInUser: loggedInUser, setLoggedInUser:setLoggedInUser}}>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/articles/:article_id" element={<ArticleCard/>}/>
        <Route path="/articles" element={<ArticleList/>}/>
        {/* <Route path="/create" element={<Create/>}/> */}
      </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App
