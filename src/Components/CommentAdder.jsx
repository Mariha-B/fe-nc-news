import { useState } from "react"
import { postComment } from "../Utils/api";

const CommentAdder =({article_id, setComments}) => {
const [newComment, setNewComment] = useState('')
const [isLoading, setIsLoading]=useState(false)

const handleSubmit=(event)=>{
    setIsLoading(true)
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
        setIsLoading(false)
    }).catch((err)=>{
        console.log(err);
    })
}
if(isLoading){
    return (
        <form id='form'>
        <h3>Add a comment...</h3>
        <div className="input-container">
            <p id='loading'>Posting your comment...</p>
        </div>
        <button type="submit">Submit Comment</button>
    </form>
        )
}
else{
return (
    <form id='form' onSubmit={handleSubmit}>
        <h3>Add a comment...</h3>
        <div className="input-container">
            <input minLength='5'type='text' required placeholder="What's on your mind..." value={newComment} onChange={(event) => setNewComment(event.target.value)}></input>
        </div>
        <button type="submit">Submit Comment</button>
    </form>
)
}

}
export default CommentAdder