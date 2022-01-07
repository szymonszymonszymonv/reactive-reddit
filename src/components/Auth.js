import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

function Auth(props) {
    const { setUser } = props
    let navigate = useNavigate()
    let search = useLocation().search
    const code = new URLSearchParams(search).get("code")
    console.log("hej")
    axiosInstance.post("/login", {code: code})
        .then(res => {
            setUser(res.data.me.name)
            localStorage.setItem("user", res.data.me.name)
            console.log(res.data)
            navigate("/")
        })
        .catch(err => {console.log(err)})

    return (
        <div>
            {code}
        </div>
    )
}

export default Auth