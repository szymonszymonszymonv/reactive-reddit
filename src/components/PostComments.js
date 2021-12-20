import Comment from './Comment'
import axiosInstance from '../axiosInstance'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function PostComments(props) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const params = useParams()

    let subreddit = params.subreddit
    let postId = params.id

    useEffect(() => {
        const fetchComments = async () => {
            let data = await axiosInstance.get(`/${postId}`)
            return data
        }

        fetchComments().then(data => {
            setComments(data.data.comments)
            setLoading(false)
        })
    }, [])

    const displayComments = () => {
        if (!loading && comments) {
            return comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} subreddit={subreddit} />
            })
        }
        else {
            return "LOADING COMMENTS..."
        }
    }

    return (
        <div>
            {/* tu beda komentarze ahahaha */}
            {displayComments()}
        </div>
    )
}

export default PostComments