import Posts from './Posts'

function Home(props) {
    
    const { subreddit } = props

    return (
        <div>
            {/* NAVBAR */}
            {/* SUBREDDITS LIST / ON CLICK -> CHANGE SUBREDDIT */}
            {/* POSTS LIST */}
            <Posts />
        </div>
    )
}

export default Home