import './styles/Header.css'
import { Link } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Header(props) {
    const { subreddit, setSubreddit, user } = props
    const [search, setSearch] = useState("")

    const onClickLogin = () => {
        axiosInstance.get("/auth")
            .then(res => {
                window.location.href = res.data.authUrl
            })
    }
    const Logout = () => {
        localStorage.removeItem("user")
        axiosInstance.post("/logout")
            .then(res => {
                console.log(res)
                window.location.reload()
            })
    }

    return (
        <div>
            <header>

                <div className='redditWrapper'>
                    <Link id="reddit" to="/">
                        reddit
                    </Link>

                </div>
                <h1 id="browsing">browsing {subreddit}</h1>

                <div className='searchWrapper'>
                    <input className='searchBar' placeholder="search reddit" onChange={(e) => setSearch(e.target.value)}></input>
                    <Link to={`/search/${search}`} className="plusPost"><FontAwesomeIcon icon={faSearch} /></Link>

                </div>

                <div className="buttonsWrapper">
                    <div className='addPostButton'>
                        <Link to={`/${subreddit}/post/create`} className="plusPost">+</Link>
                    </div>
                    <span className="tooltipy">create post</span>
                </div>

                {user
                    ?
                    <div className='userWrapper'>
                        <h1 id="loggedUser">u/{user}</h1>
                        <button id="logout" onClick={Logout}>logout</button>
                    </div>
                    :
                    <div className='userWrapper'>
                        <button onClick={onClickLogin}>log in</button>
                    </div>
                }
            </header>
        </div>
    )
}

export default Header