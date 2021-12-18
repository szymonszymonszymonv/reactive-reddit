import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance.js'

function Fetch() {
    const [redditData, setRedditData] = useState()

    axiosInstance.get("/")
    .then(res => {
        console.log(res)
    })
    
    return (
        <div>
            {redditData}
        </div>
    )
}

export default Fetch;