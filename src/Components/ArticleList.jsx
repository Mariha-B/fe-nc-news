import { useState , useEffect} from "react"
import { fetchData } from "../Utils/api"
import {Link, useNavigate, useParams, useSearchParams} from 'react-router-dom'
import Errors from "./Errors";


const ArticleList= ()=> {
    const [error, setError] = useState(null); 
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading]=useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const {topic} = useParams();
    const sortBy = searchParams.get('sort_by')
    const order = searchParams.get('order')
    useEffect(() => {
        setIsLoading(true);
        fetchData(`/articles`, topic, sortBy, order).then(({articles})=>{

            setArticles(articles);
            setIsLoading(false)
        }).catch((err)=>{
            setError(err.response)
        })
    },[topic,sortBy, order])
    
    const handleSort = (event) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort_by', event.target.value);
        setSearchParams(newParams);
    };

    const handleSortOrder = (event) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('order', event.target.value);
        setSearchParams(newParams);
    };
    if(error){
     return <Errors errStatus={error.status} errMessage={error.data.msg} />   
    }
    if(isLoading){
        return (
            <p id='loading'>Fetching your articles ...</p>
            )
    }else{
        return (
            <div>
                <div className="sort-container">
                    <label htmlFor="sortBy">Sort by:</label>
                        <div className="custom-dropdown">
                            <select id="sortBy" value={sortBy || ''}  onChange={handleSort}>
                                <option value="created_at">Date</option>
                                <option value="votes">Votes</option>
                                <option value="comment_count">Comment Count</option>
                            </select>
                        </div>
                    <label htmlFor="sortOrder">Order:</label>
                <div className="custom-dropdown">
                    <select id="sortOrder" value={order || ''} onChange={handleSortOrder}>
                        <option value="DESC">Descending</option>
                        <option value="ASC">Ascending</option>
                    </select>
            </div>
        </div>
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
    </div>
        )
}
}

    export default ArticleList