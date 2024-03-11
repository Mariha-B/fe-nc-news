import {Link} from 'react-router-dom'
import UserContext from '../Contexts/User'
import { useContext } from 'react'
import ArticleList from './ArticleList'

const Header=()=>{
    const {loggedInUser} = useContext(UserContext)
    return (
    <>
        <div id= 'nav'>
            <h1 className="Header">NC News</h1>
            <nav className='main-nav'>
                <Link className="link" to={`/`}>Home</Link>
                <Link className="link" to={`/create`}>Create</Link>
            </nav>
            <div id='user'>
                <img id= 'avatar' src={loggedInUser.avatar_url}></img>
                <p>{loggedInUser.username}</p>
            </div>
        </div>
        <div>
            <ArticleList/>
        </div>
    </>
        
        )
}

export default Header