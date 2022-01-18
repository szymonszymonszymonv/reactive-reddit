import PostCard from './PostCard'
import axiosInstance from '../axiosInstance'
import { useState, useEffect } from 'react'
import './styles/Posts.css'
import './styles/Search.css'
import { useParams } from 'react-router-dom'
import SubredditListCard from './SubredditListCard'


function Search(props) {


    const { posts, setPosts, subreddit, setSubreddit } = props
    const { searchInput } = useParams()
    const [subreddits, setSubreddits] = useState([])
    const [subredditsActive, setSubredditsActive] = useState(false)
    const [postsActive, setPostsActive] = useState(true)


    useEffect(() => {
        axiosInstance.get(`/search/${searchInput}`)
            .then(res => {
                let postsList = res.data.posts
                let subredditsList = res.data.subreddits
                setSubreddits(subredditsList)
                setPosts(postsList)
            })
    }, [])

    const displayPosts = () => {
        return posts.map((post) => {
            return <PostCard post={post} subreddit={subreddit} key={post.id} />
        })
    }

    return (
        <div className="searchContainer">
            <div className="searchButtons">
                <button id='posts' className={postsActive ? `active` : `inactive`} onClick={() => { setPostsActive(true); setSubredditsActive(false) }}>posts</button>
                <button id='subreddits' className={subredditsActive ? `active` : `inactive`} onClick={() => { setSubredditsActive(true); setPostsActive(false) }}>subreddits</button>
            </div>
            {postsActive ? displayPosts() : <SubredditListCard subreddits={subreddits} />}
        </div>
    )

}

export default Search;