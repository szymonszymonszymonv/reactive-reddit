import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Home from './Home'
import Header from './Header'
import PostComments from './PostComments'
import './styles/Main.css'
import Posts from './Posts'
import SubredditList from './SubredditList'

function Main() {

    const [subreddit, setSubreddit] = useState("r/all")
    const [posts, setPosts] = useState([])

    

    return (
        <div>
            <Header subreddit={subreddit} setSubreddit={setSubreddit} />
            <div className="mainContent">
                <Routes>
                    <Route path="/" element={<Home subreddit={subreddit} setSubreddit={setSubreddit} setPosts={setPosts} posts={posts} />} />
                    <Route path="/r/:subreddit" element={<Posts subreddit={subreddit} setSubreddit={setSubreddit} setPosts={setPosts} posts={posts} />} />
                    <Route path={`/r/:subreddit/:id`} element={<PostComments subreddit={subreddit} posts={posts} />} />
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