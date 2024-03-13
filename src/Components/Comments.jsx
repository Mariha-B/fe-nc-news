import { useContext, useEffect, useState } from 'react';
import { deleteComment, fetchCommentsOnArticle } from '../Utils/api';
import CommentAdder from './CommentAdder';
import UserContext from '../Contexts/User';

const Comments =({article_id}) => {
    const {loggedInUser} = useContext(UserContext)
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchCommentsOnArticle(article_id).then(({comments})=>{
            setComments(comments)
        }).catch((err)=>{
            console.log(err);
        })
    },[article_id])
    
    const handleDelete = (comment_id) => {
        deleteComment(comment_id).then(()=>{
            setComments((currComments) => currComments.filter(comment => comment.comment_id !== comment_id));
    
        }).catch((err)=>{
            console.log(err);
        })
    }


    return (
        <div className="comments-container">
            <div>
               <CommentAdder article_id={article_id} setComments={setComments}/>
            </div>
            <ul className="comments-list">
                {comments.map((comment) => (
                    <li className="comment-item" key={comment.comment_id}>
                        <div className="comment-header">
                            <h3 className="comment-author">{comment.author}</h3>
                            <h4 className="comment-date">
                                {new Date(comment.created_at).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </h4>
                            {loggedInUser.username === comment.author ? (
                                    <button className="comment-delete-button" onClick={() => {handleDelete(comment.comment_id)}}>X</button>
                                ) : null}
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