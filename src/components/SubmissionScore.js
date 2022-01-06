import axiosInstance from "../axiosInstance"
import { useState } from 'react'
import './styles/SubmissionScore.css'

function SubmissionScore(props) {
    const {submission, isComment } = props 
    const [upvoted, setUpvoted] = useState(submission.likes)
    const [downvoted, setDownvoted] = useState(submission.likes)
    const [score, setScore] = useState(submission.score)

    const upvoteHandler = (e) => {
        e.stopPropagation()
        const url = isComment ? `comment/${submission.id}` : `${submission.id}`
        if (upvoted === true) {
            setUpvoted(null)
            setScore(score - 1)
            
            axiosInstance.post(`/${url}/unvote`)
                .then(res => { console.log(res) })
                .catch(err => { console.log(err) })
        }
        else {
            setUpvoted(true)
            setDownvoted(null)
            setScore(score + 1)

            axiosInstance.post(`/${url}/upvote`)
                .then(res => { console.log(res) })
                .catch(err => { console.log(err) })
        }
    }

    const downvoteHandler = (e) => {
        const url = isComment ? `comment/${submission.id}` : `${submission.id}`
        e.stopPropagation()

        if (downvoted === false) {
            setDownvoted(null)
            setScore(score + 1)
            axiosInstance.post(`/${url}/unvote`)
                .then(res => { console.log(res) })
                .catch(err => { console.log(err) })
        }
        else {
            setUpvoted(null)
            setDownvoted(false)
            setScore(score - 1)
            axiosInstance.post(`/${url}/downvote`)
                .then(res => { console.log(res) })
                .catch(err => { console.log(err) })
        }
    }

    const displayScore = () => {
        let upvotedClassName = "upvote"
        let downvotedClassName = "downvote"
        if (upvoted === true) {
            upvotedClassName += " clicked"
        }
        else if (downvoted === false) {
            downvotedClassName += " clicked"
        }


        return (
            <div className="voteContainer">
                <button onClick={upvoteHandler} className={upvotedClassName}>▲</button>
                <span className="score">{score}</span>
                <button onClick={downvoteHandler} className={downvotedClassName}>▼</button>
            </div>
        )
    }

    return (
        displayScore()
    )
}

export default SubmissionScore;