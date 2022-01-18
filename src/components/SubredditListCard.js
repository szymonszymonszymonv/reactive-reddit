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
        subreddits.map(subreddit => {
            return (
                <div className="postContainer subredditContainer" onClick={(e) => { subredditOnClickRedirect(e, subreddit) }}>
                    <div className="postContent subredditContent">
                        <span className="subredditName">community: {subreddit.url}  subscribers: {subreddit.subscribers}</span>
                        <span className="subredditSubtitle">{subreddit.description}</span>
                    </div>
                </div>
            )
        })
    )
}

export default SubredditListCard;