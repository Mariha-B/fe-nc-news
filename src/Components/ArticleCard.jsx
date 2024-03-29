import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData, patchArticle } from '../Utils/api';
import Comments from './Comments';
import Errors from './Errors';

const ArticleCard =() => {
    const { article_id } = useParams()
    const [article, setArticle] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading]=useState(false)

    useEffect(() => {
        setIsLoading(true);
        fetchData(`/articles/${article_id}`).then(({article})=>{
            setArticle(article)
            setIsLoading(false)
        }).catch((err)=>{
            setError(err.response)
        })
    },[article_id])

    const upVote=(article_id)=>{
        const patchBody ={
            inc_votes: 1
        }
        const updatedArticle = { ...article, votes: article.votes + 1 };
        setArticle(updatedArticle);
        patchArticle(article_id, patchBody)
        .catch((err) => {
            setError(err.response)
            setArticle(article);
        })
    }

    const downVote=(article_id)=>{
        const patchBody ={
            inc_votes: -1
        }
        const updatedArticle = { ...article, votes: article.votes - 1 };
        setArticle(updatedArticle);
        patchArticle(article_id, patchBody)
        .catch((err) => {
            setError(err.response)
            setArticle(article);
        })
    }
    if(error){
        return <Errors errStatus={error.status} errMessage={error.data.msg} />   
       }
    if(error){
        return 'error'
    }
    if(isLoading){
        return (
            <p id='loading'>Fetching your article ...</p>
            )
    }
    else{

        return(
        <div id='full-container'>
            <div id='outer-container'>
                <div id= 'article-container'>
                <div id='vote-buttons'>
                    <button type='button' onClick={()=>{upVote(article.article_id)}}>Upvote</button>
                    <p className="article-votes">{article.votes}</p>
                    <button type='button' onClick={()=>{downVote(article.article_id)}}>DownVote</button>
                </div>
                <div className='card-container'>
                    <div className="article-card">
                        <h3 className="article-topic">Topic: {article.topic}</h3>
                        <h2 className="article-title">{article.title}</h2>
                        <h4 className="article-author">by {article.author}</h4>
                        <p className="article-body">{article.body}</p>
                        <img className="article-image" src={article.article_img_url} alt="Article Image" />
                        <p className="article-comments">Comments: {article.comment_count}</p>
                    </div>
                </div>
                </div>
                    <div>
                        <Comments article_id={article_id}/>
                    </div>
            </div>
        </div>
        )
    }
}
export default ArticleCard