import { useEffect, useState } from 'react';
import { fetchData } from '../Utils/api';

const Comments =({article_id}) => {

    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchData(`/articles/${article_id}/comments`).then(({comments})=>{
            setComments(comments)
        }).catch((err)=>{
            console.log(err);
        })
    },[article_id])

    
    return (
        <div className="comments-container">
            <ul className="comments-list">
                {comments.map((comment) => (
                    <li className="comment-item" key={comment.comment_id}>
                        <div className="comment-header">
                            <h3 className="comment-author">{comment.author}</h3>
                            <h4 className="comment-date">
                                {new Date(comment.created_at).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </h4>
                        </div>
                        <p className="comment-body">{comment.body}</p>
                        <h5 className="comment-votes">{comment.votes}</h5>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default Comments