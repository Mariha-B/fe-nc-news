import { useState , useEffect} from "react"
import { fetchData } from "../Utils/api"
import {Link, useParams, useSearchParams} from 'react-router-dom'


const ArticleList= ()=> {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading]=useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [sortBy, setSortBy] = useState("created_at");
    const [sortOrder, setSortOrder] = useState("DESC");
    

    useEffect(() => {
        setIsLoading(true);
        fetchData(`/articles?${searchParams.toString()}&sort_by=${sortBy}&order=${sortOrder}`).then(({articles})=>{
            setArticles(articles);
            setIsLoading(false)
        }).catch((err)=>{
            console.log(err);
        })
    },[searchParams, sortBy, sortOrder])
    
    const handleSort = (event) => {
        setSortBy(event.target.value);
    };

    const handleSortOrder = (event) => {
        setSortOrder(event.target.value);
    };

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
                            <select id="sortBy" value={sortBy} onChange={handleSort}>
                                <option value="created_at">Date</option>
                            </select>
                        </div>
                    <label htmlFor="sortOrder">Order:</label>
                <div className="custom-dropdown">
                    <select id="sortOrder" value={sortOrder} onChange={handleSortOrder}>
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