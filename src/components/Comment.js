function Comment(props) {
    const { comment } = props

    return (
        <div>
            {/* comment with author, body, score, upvoting arrows, date */}
            {comment.body}
        </div>
    )
}

export default Comment