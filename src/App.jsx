import { useState, createContext } from 'react'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Header from './Components/Header'
import UserContext from './Contexts/User'
import ArticleCard from './Components/ArticleCard'
import Home from './Components/Home'
import ArticleList from './Components/ArticleList'
import Errors from './Components/Errors'


function App() {

  const [loggedInUser, setLoggedInUser]=useState({
    username: 'grumpy19',
    avatar_url: `https://www.ihaveabean.com/cdn/shop/files/coffeebean45kb_1600x.jpg?v=1643148745`
  })
  
  return (
    <>
    <UserContext.Provider value={{loggedInUser: loggedInUser, setLoggedInUser:setLoggedInUser}}>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/articles/:article_id" element={<ArticleCard/>}/>
        <Route path="/articles/topic/:topic" element={<ArticleList/>}/>
        <Route path="*" element={<Errors/>}/>
      </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App
