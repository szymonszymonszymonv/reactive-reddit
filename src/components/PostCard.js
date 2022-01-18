import './styles/PostCard.css'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { useState, useEffect } from 'react'
import SubmissionScore from './SubmissionScore'




function PostCard(props) {
    const { post, subreddit } = props
    let navigate = useNavigate()

    const postOnClickRedirect = (e) => {
        e.stopPropagation()
        navigate(`/r/${post.subreddit}/${post.id}/`)
    }

    const displayPost = () => {
        // TODO: PICTURES GALLERY http://react-responsive-carousel.js.org/
        let media = []
        let gallery = ""

        try {
            console.log(post.medias[0].u)
            for (let img of post.medias) {
                if (img.u) {
                    media.push(<img src={img.u} alt="something" />)
                }
                if (img.gif) {
                    media.push(<img src={img.gif} alt="something gif" />)
                }
            }
            // media = <img src={post.medias[0].u} alt="something"></img>
        }
        catch {
            console.log("no media")
            media = ""
        }

        if (media) {
            console.log(media)
        }

        return (
            <div className="postContainer" onClick={postOnClickRedirect}>
                <SubmissionScore submission={post} isComment={false} />

                <div className="postContent">
                    <span className="author">posted by u/{post.author} in /r/{post.subreddit} || {post.timeInHours}</span>
                    <span className="title">{post.title}</span>
                    {gallery}
                </div>
            </div >
        )
    }

    return displayPost()
}
export default PostCard