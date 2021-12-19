import Comment from './Comment'

function PostComments(props) {
    
    const { comments, subreddit } = props

    const displayComments = () => {
        return comments.map( (comment) => {
            return <Comment comment={comment}/>
        })
    }

    return (
        <div>
            { displayComments() }
        </div>
    )
}

export default PostComments