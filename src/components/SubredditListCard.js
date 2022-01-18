import { useNavigate } from "react-router-dom"

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
                <div>
                    <div className="postContainer subredditContainer" onClick={(e) => { subredditOnClickRedirect(e, subreddit) }}>
                        <div className="postContent subredditContent">
                            <span className="subredditName">{subreddit.url} || {subreddit.subscribers}</span>
                            <span className="subredditSubtitle">{subreddit.description}</span>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default SubredditListCard;