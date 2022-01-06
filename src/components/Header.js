import './styles/Header.css'
import { Link } from 'react-router-dom'

function Header(props) {
    const { subreddit, setSubreddit } = props

    return (
        <div>
            <header>
                <div className='redditWrapper'>
                    <Link id="reddit" to="/" onClick={() => {setSubreddit("r/all")}}>
                        sreddit
                    </Link>

                </div>
                <h1 id="browsing">browsing {subreddit}</h1>

                <div className='searchWrapper'>
                    <input className='searchBar' placeholder="search sreddit"></input>
                </div>

                <div className='userWrapper'>
                    <h1 id="loggedUser">u/user</h1>
                </div>
            </header>
        </div>
    )
}

export default Header