import PostCard from './PostCard'
import axiosInstance from '../axiosInstance'
import { useState, useEffect } from 'react' 

function Posts(props) {
    const { subreddit } = props
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchPosts = async () => {
            let data = await axiosInstance.get('/')
            return data
        }
        fetchPosts().then(data => {
            setPosts(data.data.posts)
            setLoading(false)
        })        
        console.log(posts)
    }, [])

    const displayPosts = () => {
        if(!loading && posts){
            return posts.map( (post) => { 
                return <PostCard post={post} subreddit={subreddit} key={post.id} />
            })
        }
        else{
            return "LOADING POSTS..."
        }
    }

    return (
        <div>
            {displayPosts()}
        </div>
    )
}

export default Posts
