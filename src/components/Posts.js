import PostCard from './PostCard'
import axiosInstance from '../axiosInstance'
import { useState, useEffect } from 'react' 
import './styles/Posts.css'
import { CSpinner } from '@coreui/react'
import { useParams } from 'react-router-dom'

function Posts(props) {
    const { subreddit, setPosts, posts, setSubreddit } = props
    const params = useParams()

    if(params.subreddit){
        setSubreddit(`r/${params.subreddit}`)
    }
    else {
        setSubreddit('r/all')
    }

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchPosts = async () => {
            let data = await axiosInstance.get(subreddit)
            console.log(data)
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
            return (
                <div>
                    <CSpinner />
                </div>
            )
        }
    }

    return (
        <div className="posts">
            
            {displayPosts()}
        </div>
    )
}

export default Posts
