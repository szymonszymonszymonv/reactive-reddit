import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './styles/SubredditList.css'




function SubredditList(props) {
    const subreddits = ["r/AskReddit", "r/worldnews", "r/memes", "r/pics", "r/television", "r/explainlikeimfive", 
                        "r/NoStupidQuestions", "r/pcmasterrace", "r/Music", "r/gaming", "r/science"]

    const { subreddit, setSubreddit } = props

    const displaySubreddits = () => {
        return subreddits.map( (sub, idx) => {
            return <Link className='subreddit' key={idx} to={sub} onClick={() => {setSubreddit(sub)}}>{sub}</Link>
        })
    }
    
    return (
        <aside className='subredditList'>
            <h1>popular communities: </h1>
            {displaySubreddits()}
        </aside>
    )
}

export default SubredditList;