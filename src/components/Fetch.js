import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fetch() {

    const [redditData, setRedditData] = useState()

    let CLIENT_ID = 'EelSeExZDvz-gg8xnrIsVA'
    let SECRET_KEY = '2wuJ5zjFaX1rY6oC5kih3GTUbKTyHg'


    let auth = {
        username: CLIENT_ID,
        password: SECRET_KEY
    }

    let data = {
        'grant_type': 'password',
        'username': 'project_cli',
        'password': 'reddit123'
    }

    let refresh_token = "24671318-ZVi9DdnVqguHdpjmNxk46dYN0r98LA"
    let access_token = "24671318-FhOitbm6xp_GaWiFRi3N-MwtKd_-yQ"

    let headers = {'User-Agent': 'web_project/0.0.1'}


    // useEffect(() => {
    //     axios.get(`http://oauth.reddit.com/r/Python/`, {
    //         auth: {
    //             username: CLIENT_ID,
    //             password: SECRET_KEY
    //         }
    //     }, data, headers )
    // }, [])




    return (
        <div>
            {redditData}
        </div>
    )
}


export default Fetch;