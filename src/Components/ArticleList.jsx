import { useState , useSearchParams, useEffect} from "react"
import { fetchData } from "../Utils/api"
import {Link} from 'react-router-dom'


const ArticleList= ()=> {
    const [articles, setArticles] = useState([])
    
        useEffect(() => {
            fetchData(`/articles`).then(({articles})=>{
                setArticles(articles);
            }).catch((err)=>{
                console.log(err);
            })
        },[])
        
            return (
            <ul className="article_list">
                 {articles.map((article) => (
                    <Link className='link' key={article.article_id} to ={`articles/${article.article_id}`}><li className="article_card" key={article.article_id}>
                        <p>Votes:{article.votes}</p>
                        <h2 >{article.title}</h2>
                        <p>by {article.author}</p>
                        <p>Comments:{article.comment_count}</p>
                    </li>
                    </Link>
                ))}
              
            </ul>
            )
    }

    export default ArticleList