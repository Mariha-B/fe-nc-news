import { useEffect, useState } from "react"
import { fetchData } from "../Utils/api"
import { Link } from "react-router-dom"
import Errors from "./Errors";

const Topics = () => {
    const [error, setError] = useState(null); 
    const [topics, setTopics]=useState([])
    const [isLoading, setIsLoading]=useState(false)

    useEffect(()=>{
        setIsLoading(true)
        fetchData('/topics').then(({topics})=>{
            setTopics(topics)
            setIsLoading(false)
        }).catch((err)=>{
            setError(err.response)
        })
    },[])

    if(error){
        return <Errors errStatus={error.status} errMessage={error.data.msg} />   
       }
    if(isLoading){
        return (
            <p id='loading'>Fetching your topics ...</p>
            )
    }else{
        return (
            <div id='full-topic-container'>
                <h2>Topics</h2>
                <div className='topic-container'>
                    <ul className="topic-list">
                        {topics.map((topic) => (
                            <Link className='link' key={topic.slug} to ={`/articles/topic/${topic.slug}`}><li className="topic-card" key={topic.slug}>
                                <p>{topic.slug}</p>
                            </li>
                            </Link>
                        ))}
                    
                    </ul>
                </div>
            </div>
        )
}


}
export default Topics