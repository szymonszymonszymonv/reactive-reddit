import { Link } from 'react-router-dom'
import './styles/PostCard.css'

function PostCard(props) {
    const { post, subreddit } = props

    const divOnClick = () => {
        console.log("clicked div")
    }

    const buttonOnClick = (e) => {
        e.stopPropagation()
        console.log("clicked button")
    }

    return (
            <div className="postContainer" onClick={divOnClick}>
                <div className="voteContainer">
                    <button onClick={buttonOnClick} className="upvote">▲</button>
                    <span className="score">{post.score}</span>
                    <button onClick={buttonOnClick} className="downvote">▼</button>
                </div>
                <div className="postContent">
                    <span className="author">posted by u/{post.author}</span>
                    <span className="title">{post.title}</span>
                </div>
                { /* card view with post title, author, score, upvoting arrows, date, subreddit origin */ }
            </div>
        // </Link>
    )
}

export default PostCard