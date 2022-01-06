import SubmissionScore from "./SubmissionScore";
import './styles/PostDetails.css'

function PostDetails(props) {

    const { post } = props

    return (
        <div className="postContainer notClickable">
            <SubmissionScore submission={post} />

            <div className="postContent">
                <span className="author">posted by u/{post.author} || {post.timeInHours}</span>
                <span className="title">{post.title}</span>
            </div>
        </div >
        
    )
}

export default PostDetails;