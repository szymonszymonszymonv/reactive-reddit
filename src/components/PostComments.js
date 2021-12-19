import Comment from './Comment'
import axiosInstance from '../axiosInstance'
import { useState, useEffect } from 'react'

function PostComments(props) {

    const { subreddit } = props
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchComments = async () => {
            let data = await axiosInstance.get(`/:subreddit/:id`)
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