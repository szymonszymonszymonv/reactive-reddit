import './styles/Comment.css'
import SubmissionScore from './SubmissionScore'
import React, { useState } from 'react';
import CreateComment from './CreateComment';


function Comment(props) {
    const { comment } = props
    const [ show, setShow ] = useState(true);
    const [showReply, setShowReply] = useState(false);
    const displayReplies = () => {
        if(comment.replies.length === 0) { return "" }
        return (
            <ul>
               {comment.replies.map(item => {
                   return <Comment key={item.id} comment={item} />
               })} 
            </ul>
        )
    }

   const displayComment = () => {
        if(show){
            return(
                <div className={`commentRoot ${comment.id} ${show ? "" : "collapsed"}`}>
                    <div className="treeContainer">
                        <div className="postContainer commentContainer">
                            <button onClick={showHandler} className="showButton">[{show ? '-' : '+'}]</button>
                            <div className='commentItem'>
                                <SubmissionScore submission={comment} isComment={true} />
                                <li>
                                    <div className="postContent commentContent">
                                        <span className="author">u/{comment.author} || {comment.timeInHours}</span>
                                        <span className="commentBody">{comment.body}</span>
                                    </div>
                                    <button id="reply" onClick={() => {setShowReply(!showReply)}}>reply</button>
                                    {showReply ? <CreateComment submission={comment}/> : ""} 
                                </li>
                            </div>
                            
                        </div>
                        {displayReplies()}
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className={`commentRoot collapsed ${comment.id}`}>
                    <div className="treeContainer"> 
                        <div className='commentContainer postContainer'>
                            <button onClick={showHandler} className="showButton">[{show ? '-' : '+'}]</button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const showHandler = () => {
        setShow(!show)
    }

    return (
        displayComment()
    )
}

export default Comment