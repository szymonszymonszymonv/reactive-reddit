import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fetch() {

    const [redditData, setRedditData] = useState()

    let CLIENT_ID = '0nI9cm_qsT73a0Rk2u5Yzg'
    let SECRET_KEY = 'z6Z54IJaBawdffP-yUDThQRrLEw9hA'

    let data = {
        'grant_type': 'password',
        'username': 'project_cli',
        'password': 'reddit123'
    }

    let headers = {'User-Agent': 'web_project/0.0.1'}

    useEffect(() => {
        axios.get(`https://www.reddit.com/r/Python/`, {
            auth: {
                username: CLIENT_ID,
                password: SECRET_KEY
            }
        }, data, headers )
    }, [])




    return (
        <div>
            {redditData}
        </div>
    )
}


export default Fetch;