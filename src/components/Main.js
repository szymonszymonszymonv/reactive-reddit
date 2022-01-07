import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './Home'
import Header from './Header'
import PostComments from './PostComments'
import './styles/Main.css'
import Posts from './Posts'
import SubredditList from './SubredditList'
import CreatePost from './CreatePost'
import Auth from './Auth'

function Main() {

    const [subreddit, setSubreddit] = useState("r/all")
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState("")
    useEffect(() => {
        let name = localStorage.getItem("user")
        setUser(name)
    }, [])

    return (
        <div>
            <Header subreddit={subreddit} setSubreddit={setSubreddit} user={user} />
            <div className="mainContent">
                <Routes>
                    <Route path="/" element={<Home subreddit={subreddit} setSubreddit={setSubreddit} setPosts={setPosts} posts={posts} user={user}/>} />
                    <Route path="/r/:subreddit" element={<Posts subreddit={subreddit} setSubreddit={setSubreddit} setPosts={setPosts} posts={posts} />} />
                    <Route path="/r/:subreddit/:id" element={<PostComments subreddit={subreddit} posts={posts} />} />
                    <Route path="/post/create" element={<CreatePost />} />
                    <Route path="/auth" element={<Auth setUser={setUser} />} />
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