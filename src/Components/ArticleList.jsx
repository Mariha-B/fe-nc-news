import { useState , useSearchParams, useEffect} from "react"
import { fetchData } from "../Utils/api"



const ArticleList= ()=> {
    const [articles, setArticles] = useState([])
    // const [searchParams, setSearchParams] = useSearchParams()
    
        useEffect(() => {
            fetchData(`/articles`).then(({articles})=>{
                console.log(articles);
                setArticles(articles);
            }).catch((err)=>{
                console.log(err);
            })
        },[])
        
            return (
            
            <ul className="article_list">
                 {articles.map((article) => (
                    <li className="article_card" key={article.article_id}>
                        <p>Votes:{article.votes}</p>
                        <h2 >{article.title}</h2>
                        <p>by {article.author}</p>
                        <p>Comments:{article.comment_count}</p>
                    </li>
                ))}
              
            </ul>
            )
    }

    export default ArticleList