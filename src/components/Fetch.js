import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance.js'
// import axios from 'axios'

function Fetch() {
    const [redditData, setRedditData] = useState()
    axiosInstance.get("/")
    .then(res => {
        console.log("hehe")
        console.log(res)
    })

    // axios.get("http://localhost:5000/")
    // .then(res => {
    //     console.log("hehe")
    //     console.log(res)
    // })

    return (
        <div>
            {redditData}
        </div>
    )
}

export default Fetch;