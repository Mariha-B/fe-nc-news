import { useState , useEffect} from "react"
import { fetchData } from "../Utils/api"
import {Link, useParams, useSearchParams} from 'react-router-dom'


const ArticleList= ()=> {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading]=useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    
        useEffect(() => {
            setIsLoading(true);
            fetchData(`/articles?${searchParams.toString()}`).then(({articles})=>{
                setArticles(articles);
                setIsLoading(false)
            }).catch((err)=>{
                console.log(err);
            })
        },[searchParams])
        

        if(isLoading){
            return (
                <p id='loading'>Fetching your articles ...</p>
                )
        }else{
            return (
        <div className='article-container'>
            <ul className="article_list">
                 {articles.map((article) => (
                    <Link className='link' key={article.article_id} to ={`/articles/${article.article_id}`}><li className="article_card" key={article.article_id}>
                        <p>Votes:{article.votes}</p>
                        <h2 >{article.title}</h2>
                        <p>by {article.author}</p>
                        <p>Comments:{article.comment_count}</p>
                    </li>
                    </Link>
                ))}
              
            </ul>
        </div>
            )
    }
}

    export default ArticleList