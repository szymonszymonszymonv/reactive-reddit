import SubmissionScore from "./SubmissionScore";
import './styles/PostDetails.css'
import { CCarousel, CCarouselItem, CImage } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { faWindowMinimize } from "@fortawesome/free-solid-svg-icons";

function PostDetails(props) {
    const navigate = useNavigate()
    const { post, subreddit } = props
    let media = []

    const imgOnClick = (e, img) => {
        e.stopPropagation()
        window.open(img)
    }

    const createCarousel = (images) => {
        if (images.length === 0) {
            return ""
        }
        if (images.length === 1) {
            return (
                <CCarousel>
                    <CCarouselItem onClick={(e) => { imgOnClick(e, images[0]) }}>
                        <CImage fluid rounded src={images[0]} />
                    </CCarouselItem>
                </CCarousel>
            )
        }
        else {
            return (
                <CCarousel controls indicators>
                    {images.map(image => {
                        return (
                            <CCarouselItem key={image} onClick={(e) => { imgOnClick(e, image) }}>
                                <CImage fluid rounded src={image} />
                            </CCarouselItem>
                        )
                    })}
                </CCarousel>
            )
        }
    }

    try {
        for (let img of post.medias) {
            if (img.u) {
                media.push(img.u)
            }
            if (img.gif) {
                media.push(img.gif)
            }
        }
    }
    catch {
        console.log("no medias")
    }
    if (post.imageUrl !== "") {
        media.push(post.imageUrl)
    }
    let carousel = createCarousel(media)

    return (
        <div className="postContainer notClickable">
            <SubmissionScore submission={post} />

            <div className="postContent">
                <span className="author">posted by u/{post.author} || {post.timeInHours}</span>
                <span className="title">{post.title}</span>
                <span className="selftext">{post.selftext}</span>
                {carousel}
            </div>
        </div >

    )
}

export default PostDetails;