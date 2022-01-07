import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './styles/CreateComment.css'

function CreateComment(props) {

    const { subreddit, submission } = props
    const [addComment, setAddComment] = useState()
    const [commentSent, setCommentSent] = useState(false)

    const addCommentHandler = () => {
    let type = "parentId" in submission ? "comment" : "post" // true => comment / false => post
        axiosInstance.post(`/${submission.id}/addComment`, { text: addComment, type: type} )
                .then(res => {
                    console.log(res)
                    setCommentSent(true)
                })
                .catch(err => {
                    console.log(err)
                })
    }

    return (
        <div className="commentForm">
            <span id="commentTooltip">add a new comment</span>
            <textarea id="commentInput" onChange={e => setAddComment(e.target.value)}></textarea>
            <button id="sendComment" onClick={addCommentHandler}>Add comment</button>
            {commentSent ? <span>comment sent successfully!</span> : ""}
        </div>
    )
}

export default CreateComment