import Posts from './Posts'

function Home(props) {
    
    const { subreddit } = props

    return (
        <div>
            {/* NAVBAR */}
            {/* SUBREDDITS LIST / ON CLICK -> CHANGE SUBREDDIT */}
            <Posts />
        </div>
    )
}

export default Home