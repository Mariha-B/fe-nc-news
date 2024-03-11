import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../Utils/api';
import Comments from './Comments';

const ArticleCard =() => {
    const { article_id } = useParams()
    const [article, setArticle] = useState([])

    useEffect(() => {
        fetchData(`/articles/${article_id}`).then(({article})=>{
            setArticle(article)
        }).catch((err)=>{
            console.log(err);
        })
    },[article_id])

    return(
        <div>
            <div className="article-card">
                <h3 className="article-topic">Topic: {article.topic}</h3>
                <h2 className="article-title">{article.title}</h2>
                <h4 className="article-author">by {article.author}</h4>
                <p className="article-body">{article.body}</p>
                <img className="article-image" src={article.article_img_url} alt="Article Image" />
                <p className="article-comments">Comments: {article.comment_count}</p>
            </div>
            <div>
                <Comments article_id={article_id}/>
            </div>
        </div>
    )
}
export default ArticleCard