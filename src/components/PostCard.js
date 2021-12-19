import { Link } from 'react-router-dom'
import './styles/PostCard.css'
import axiosInstance from '../axiosInstance'

function PostCard(props) {
    const { post, subreddit } = props

    const upvoteHandler = (e) => {
        // e.stopPropagation()
        axiosInstance.post('/',  post )
            .then(res => { console.log(res) })
        console.log(post)
    }

    const downvoteHandler = (e) => {
        // e.stopPropagation()
        console.log("asdads")
    }
    return (
        <Link className="post" id={post.id} to={`/${post.subreddit}/${post.id}`}>
            <div className="postContainer">
                <div className="voteContainer">
                    <button onClick={upvoteHandler} className="upvote">▲</button>
                    <span className="score">{post.score}</span>
                    <button onClick={downvoteHandler} className="downvote">▼</button>
                </div>

                <div className="postContent">
                    <span className="author">posted by u/{post.author}</span>
                    <span className="title">{post.title}</span>
                </div>
                { /* card view with post title, author, score, upvoting arrows, date, subreddit origin */}

            </div >
        </Link>

    )
}

export default PostCard