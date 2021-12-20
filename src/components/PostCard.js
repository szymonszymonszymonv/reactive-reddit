import { Link, useNavigate } from 'react-router-dom'
import './styles/PostCard.css'
import axiosInstance from '../axiosInstance'
import { useState, useEffect } from 'react'



function PostCard(props) {
    const { post, subreddit } = props
    const [upvoted, setUpvoted] = useState(post.likes)
    const [downvoted, setDownvoted] = useState(post.likes)
    let navigate = useNavigate()

    const upvoteHandler = (e) => {
        e.stopPropagation()
        if (upvoted === true) {
            setUpvoted(null)
            axiosInstance.post(`/${post.id}/unvote`, post)
                .then(res => { console.log(res) })
        }
        else {
            setUpvoted(true)
            setDownvoted(null)

            axiosInstance.post(`/${post.id}/upvote`, post)
                .then(res => { console.log(res) })
        }
    }

    const downvoteHandler = (e) => {
        e.stopPropagation()

        if (downvoted === false) {
            setDownvoted(null)
            axiosInstance.post(`/${post.id}/unvote`, post)
                .then(res => { console.log(res) })
        }
        else {
            setUpvoted(null)
            setDownvoted(false)
            axiosInstance.post(`/${post.id}/downvote`, post)
                .then(res => { console.log(res) })
        }
    }

    const postOnClickRedirect = (e) => {
        e.stopPropagation()
        navigate(`${post.subreddit}/${post.id}/`)
    }

    const displayPost = () => {
        let upvotedClassName = "upvote"
        let downvotedClassName = "downvote"
        if (upvoted === true) {
            console.log("add upvote clicked")
            upvotedClassName += " clicked"
        }
        else if (downvoted === false) {
            console.log("add downvote clicked")
            downvotedClassName += " clicked"
        }

        return (
            <div className="postContainer" onClick={postOnClickRedirect}>

                <div className="voteContainer">
                    <button onClick={upvoteHandler} className={upvotedClassName}>▲</button>
                    <span className="score">{post.score}</span>
                    <button onClick={downvoteHandler} className={downvotedClassName}>▼</button>
                </div>

                <div className="postContent">
                    <span className="author">posted by u/{post.author}</span>
                    <span className="title">{post.title}</span>
                </div>
                { /* card view with post title, author, score, upvoting arrows, date, subreddit origin */}
            </div >
        )
    }

    return displayPost()
}
export default PostCard