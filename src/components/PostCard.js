import './styles/PostCard.css'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { useState, useEffect } from 'react'
import SubmissionScore from './SubmissionScore'
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'




function PostCard(props) {
    const { post, subreddit } = props
    let navigate = useNavigate()

    const carouselOnClick = (e) => {
        e.stopPropagation()
    }

    const postOnClickRedirect = (e) => {
        e.stopPropagation()
        navigate(`/r/${post.subreddit}/${post.id}/`)
    }

    const createCarousel = (images) => {
        if(images.length === 0) {
            return ""
        }
        if(images.length === 1) {
            return (
                <CImage  onClick={postOnClickRedirect} thumbnail fluid rounded src={images[0]} />
            )
        }
        else {
            return (
                <CCarousel onClick={(e) => {carouselOnClick(e)}} controls indicators wrap={false}>
                    {images.map(image => {
                        return (
                            <CCarouselItem key={image}>
                                <CImage onClick={postOnClickRedirect} thumbnail fluid rounded src={image} />
                            </CCarouselItem>
                        )
                    })}
                </CCarousel>
            )
        }
    }

    const displayPost = () => {
        let media = []

        try{
            for(let img of post.medias) {
                if(img.u){
                    media.push(img.u)
                }
                if(img.gif){
                    media.push(img.gif)
                }
            }
        }
        catch {
            console.log("no medias")
        }
        if(post.imageUrl !== "") {
            media.push(post.imageUrl)
        }
        let carousel = createCarousel(media)

        return (
            <div className="postContainer" onClick={postOnClickRedirect}>
                <SubmissionScore submission={post} isComment={false} />

                <div className="postContent">
                    <span className="author">posted by u/{post.author} in /r/{post.subreddit} || {post.timeInHours}</span>
                    <span className="title">{post.title}</span>
                    {carousel}
                </div>
            </div >
        )
    }

    return displayPost()
}
export default PostCard