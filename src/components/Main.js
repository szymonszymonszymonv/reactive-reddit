import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Home from './Home'
import PostComments from './PostComments'

function Main() {

    const [subreddit, setSubreddit] = useState("all")

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home subreddit={subreddit} />} />
                <Route path={`/:subreddit/:id`} element={<PostComments subreddit={subreddit} />} />
                {/* more routes soon */}
            </Routes>
        </div>
    )
}

export default Main


// TODO: COMMENT VIEW
// TODO: SEND COMMENT
// TODO: SUBREDDIT LIST SIDEBAR
// TODO: CHANGE SUBREDDIT 