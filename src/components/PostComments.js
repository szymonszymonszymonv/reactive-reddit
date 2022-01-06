import axiosInstance from '../axiosInstance'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostDetails from './PostDetails'
import Comment from './Comment'
import './styles/PostComments.css'
import { CSpinner } from '@coreui/react'


function PostComments(props) {
    let { posts } = props
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [addComment, setAddComment] = useState()
    const params = useParams()

    let subreddit = params.subreddit
    let postId = params.id
    const post = posts.find(x => { return x.id === postId })

    const addCommentHandler = () => {

        axiosInstance.post(`/${comments[0].parentId}/addComment`,{comment: comments[0], text: addComment} )
                .then(res => { console.log(res) })
    }

    useEffect(() => {
        const fetchComments = async () => {
            let data = await axiosInstance.get(`/r/${subreddit}/${postId}`)
            return data
        }

        fetchComments().then(data => {
            setComments(data.data.comments)
            setLoading(false)
        })
    }, [])

    const displayComments = () => {
        console.log(comments)
        if (!loading && comments) {
            return comments.map((comment) => {
                return (
                    <Comment key={comment.id} comment={comment} subreddit={subreddit} post={post} />
                )
            })
            
            
        }
        else {
            return (
                <div>
                    <CSpinner />
                </div>
            )
        }
    }
    

    return (
        <div className='commentsContent'>
            <PostDetails post={post} />
            <div className='comments'>
                {displayComments()}
            </div>
        {/* <div> */}
            {/* tu beda komentarze ahahaha */}
            {/* {displayComments()} */}
            {/* <input onChange={e => setAddComment(e.target.value)}></input> */}
            {/* <button onClick={addCommentHandler}>Add comment</button> */}
        {/* </div> */}
            


        </div>
    )
}

export default PostComments