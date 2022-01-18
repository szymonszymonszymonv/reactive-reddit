import PostCard from './PostCard'
import axiosInstance from '../axiosInstance'
import { useState, useEffect } from 'react'
import './styles/Posts.css'
import { CSpinner } from '@coreui/react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from './InfiniteScroll'

function Posts(props) {
    const { subreddit , setSubreddit, posts, setPosts } = props
    const params = useParams()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => { // fetch posts
        let sub = ""
        if(params.subreddit){
            sub = `r/${params.subreddit}`
        }
        else {
            sub = `r/all`
        }
        setSubreddit(sub)
        const fetchPosts = async () => {
            let data = await axiosInstance.get(sub)
            return data
        }
        fetchPosts().then(data => {
            setPosts(data.data.posts)
            setLoading(false)
        })

    }, [])

    useEffect(() => { // 

    })

    const displayPosts = () => {
        if (!loading && posts) {
            return posts.map((post) => {
                return <PostCard post={post} key={post.id} />
            })
        }
        else if(loading && posts) {
            let postsAndLoader = posts.map((post) => {
                return <PostCard post={post} key={post.id} />
            })
            postsAndLoader.push(<div><CSpinner /></div>)
            return postsAndLoader
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
        <div className="postsWrapper">

            <div className="posts">
                {/* {displayPosts()} */}
                {posts.length > 0 ? <InfiniteScroll posts={posts} setPosts={setPosts} subreddit={subreddit} /> : ""}
                {/* <InfiniteScroll posts={posts} setPosts={setPosts} /> */}
            </div>
        </div>
    )
}

export default Posts
