import Posts from './Posts'
import SubredditList from './SubredditList'
import './styles/Home.css'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Home(props) {

    const { setSubreddit, subreddit, setPosts, posts } = props

    return (
        <div className='main'>
            <section className="content">
                <aside className='list'>
                    <SubredditList subreddit={subreddit} setSubreddit={setSubreddit} />
                </aside>
                <Posts subreddit={"r/all"} setSubreddit={setSubreddit} setPosts={setPosts} posts={posts} />
            </section>
        </div>
    )
}

export default Home