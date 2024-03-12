import { useState } from "react"
import { postComment } from "../Utils/api";

const CommentAdder =({article_id, setComments}) => {
const [newComment, setNewComment] = useState('')
const handleSubmit=(event)=>{
    event.preventDefault();
    const postBody = {
        author: "grumpy19",
        body: newComment
    }
    postComment(article_id,postBody).then((commentFromApi)=>{
        setNewComment('')
        setComments((currComments)=>{
            return [commentFromApi,...currComments]
        })
    }).catch((err)=>{
        console.log(err);
    })
}

return (
    <form id='form' onSubmit={handleSubmit}>
        <h3>Add a comment...</h3>
        <div className="input-container">
            <input type='text' placeholder="What's on your mind..." value={newComment} onChange={(event) => setNewComment(event.target.value)}></input>
        </div>
        <button type="submit">Submit Comment</button>
    </form>
)
}


export default CommentAdder