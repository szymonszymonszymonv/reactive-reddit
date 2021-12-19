import { Link } from 'react-router-dom'
import './styles/PostCard.css'

function PostCard(props) {
    const { post, subreddit } = props

    return (
        <Link className="post" id={post.id} to={`/${post.subreddit}/${post.id}`}> 
            <div className="postContainer">
                <div className="voteContainer">
                    <span className="upvote">▲</span>
                    <span className="score">{post.score}</span>
                    <span className="downvote">▼</span>
                </div>
                <div className="postContent">
                    <span className="author">posted by u/{post.author}</span>
                    <span className="title">{post.title}</span>
                </div>
                { /* card view with post title, author, score, upvoting arrows, date, subreddit origin */ }
            </div>
        </Link>
    )
}

export default PostCard