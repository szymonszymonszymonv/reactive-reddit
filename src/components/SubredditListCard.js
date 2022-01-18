import { useNavigate } from "react-router-dom"
import './styles/SubredditListCard.css'

function SubredditListCard(props) {
    const navigate = useNavigate()
    const { subreddits } = props

    const subredditOnClickRedirect = (e, subreddit) => {
        e.stopPropagation()
        navigate(`${subreddit.url}`)
    }

    return (
        subreddits.map((subreddit, idx )=> {
            return (
                <div key={idx} className="postContainer subredditContainer" onClick={(e) => { subredditOnClickRedirect(e, subreddit) }}>
                    <div className="postContent subredditContent">
                        <span className="subredditName">community: {subreddit.url}</span>
                        <span className="subredditName">subscribers: {subreddit.subscribers}</span>
                        <span className="subredditSubtitle">{subreddit.description}</span>
                    </div>
                </div>
            )
        })
    )
}

export default SubredditListCard;