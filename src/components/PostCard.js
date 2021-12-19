import { Link } from 'react-router-dom'

function PostCard(props) {
    const { post, subreddit } = props

    return (
        <div>
            <Link to={`/${subreddit}/${post.id}`}> 
                { post.title }
                { /* card view with post title, author, score, upvoting arrows, date */ }
            </Link>
        </div>
    )
}

export default PostCard