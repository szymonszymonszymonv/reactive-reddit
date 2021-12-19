import { Link } from 'react-router-dom'

function PostCard(props) {
    const { post, subreddit } = props


    return (
        <div>
            <Link to={`/${post.id}`}> 
                { `${post.author} - ${post.title} (${post.score})` }
                { /* card view with post title, author, score, upvoting arrows, date, subreddit origin */ }

            </Link>
        </div>
    )
}

export default PostCard