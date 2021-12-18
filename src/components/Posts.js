import PostCard from './PostCard'
import axiosInstance from '../axiosInstance'

function Posts(props) {
    const { subreddit } = props
    let posts = axiosInstance.get(`/${subreddit}`)

    const displayPosts = () => {
        return posts.map( (post) => {
            return <PostCard post={post} subreddit={subreddit} />
        })
    }

    return (
        <div>
            {displayPosts()}
        </div>
    )
}

export default Posts
