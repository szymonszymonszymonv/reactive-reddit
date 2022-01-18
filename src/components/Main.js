import { Route, Routes, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './Home'
import Header from './Header'
import PostComments from './PostComments'
import './styles/Main.css'
import Posts from './Posts'
import SubredditList from './SubredditList'
import CreatePost from './CreatePost'
import Auth from './Auth'
import Search from './Search'

function Main() {

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState("")
    const [subreddit, setSubreddit] = useState("r/all")


    useEffect(() => {
        let name = localStorage.getItem("user")
        setUser(name)
    }, [])

    return (
        <div>
            <Header subreddit={subreddit} setSubreddit={setSubreddit} user={user} />
            <div className="mainContent">
                <Routes>
                    <Route path="/" element={<Home subreddit={subreddit} setSubreddit={setSubreddit} setPosts={setPosts} posts={posts} user={user} />} />
                    <Route path="/r/:subreddit" element={<Posts subreddit={subreddit} setSubreddit={setSubreddit} setPosts={setPosts} posts={posts} />} />
                    <Route path="/r/:subreddit/:id" element={<PostComments subreddit={subreddit} posts={posts} />} />
                    {/* <Route path="/post/create" element={<CreatePost />} /> */}
                    <Route path="/r/:subreddit/post/create" element={<CreatePost subreddit={subreddit} setSubreddit />} />
                    <Route path="/auth" element={<Auth setUser={setUser} />} />
                    <Route path="/search/:searchInput" element={<Search posts={posts} setPosts={setPosts} subreddit={subreddit} setSubreddit={setSubreddit} />} />
                    {/* more routes soon */}
                </Routes>
            </div>
        </div>
    )
}

export default Main

// TODO: SEND COMMENT
// TODO: PICTURES GALLERY http://react-responsive-carousel.js.org/
// TODO: RECOMMENDED SUBREDDITS (?)