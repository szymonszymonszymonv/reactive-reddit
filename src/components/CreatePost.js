import './styles/CreatePost.css'
import axiosInstance from '../axiosInstance'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { CSpinner } from '@coreui/react'

function CreatePost(props) {
    // const navigate = useNavigate()

    const [subreddit, setSubreddit] = useState()
    const params = useParams()
    const [addPostTitle, setAddPostTitle] = useState()
    const [addPostSelftext, setAddPostSelftext] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [createPostLoading, setCreatePostLoading] = useState(false)
    const [creatingImgPost, setCreatingImgPost] = useState(false)
    const [createImgPostLoading, setCreateImgPostLoading] = useState(false)
    const [creatingPost, setCreatingPost] = useState(false)

    const displayImgLoading = () => {
        if(createImgPostLoading && creatingImgPost) {
            return <div><CSpinner></CSpinner></div> 
            
        }
        else if(creatingImgPost) {
            return <span>created post successfully!</span>
        }
    }

    const displayLoading = () => {
        if(createPostLoading && creatingPost) {
            return <div><CSpinner></CSpinner></div> 
            
        }
        else if(creatingPost) {
            return <span>created post successfully!</span>
        }
    }

    useEffect(() => {
        if(params.subreddit === "r/all") {
            setSubreddit("r/all")
        }
        else {
            setSubreddit(params.subreddit)
        }
    }, [])

    const displaySubredditInput = () => {
        if(params.subreddit !== "all"){
            return <span id="selectedSubreddit">r/{subreddit}</span>
        }
        else{
            return <input placeholder="choose subreddit" onChange={e => setSubreddit(e.target.value)}></input>
        }
    }

    const addPostHandler = () => {
        setCreatingPost(true)
        setCreatePostLoading(true)
        axiosInstance.post(`/addPost`, { subreddit: subreddit, title: addPostTitle, selftext: addPostSelftext })
            .then(res => { 
                console.log(res) 
                setCreatePostLoading(false)
        // navigate(`/${res.data.link}`)
            })
    }

    const addPostImgHandler = () => {
        setCreatingImgPost(true)
        setCreateImgPostLoading(true)
        axiosInstance.post(`/addPostImage`, { image: imgUrl, subreddit: subreddit, title: addPostTitle })
            .then(res => { 
                console.log(res)
                setCreateImgPostLoading(false)
            })
    }

    const loadFile = (event) => {

        let apiKey = '6023e0065cc5d2b';
        let url = "https://api.imgur.com/3/image/"
        const formdata = new FormData()
        let files = []
        files = event.target.files

        let videoRegExp = /video\/\w+/g
        let imageRegExp = /image\/\w+/g


        if (imageRegExp.test(files[0].type)) {
            formdata.append("image", files[0])
            url = "https://api.imgur.com/3/image"
        }
        else if (videoRegExp.test(files[0].type)) {
            formdata.append("video", files[0])
            url = "https://api.imgur.com/3/upload"
        }

        let headers = new Headers();
        headers.append('Authorization', "Client-ID " + apiKey);

        fetch(url, {
            method: "post",
            headers: headers,
            body: formdata
        }).then(data => data.json()).then(data => {
            setImgUrl(data.data.link)
        })

    }

    return (
        <div>
            {/* <input placeholder="choose subreddit" onChange={e => setSubreddit(e.target.value)}></input> */}
            {displaySubredditInput()}

            <div className="postForm">
                <div className='postImgForm'>
                    <h1 id="imgFormTitle">create post with image</h1>
                    <input placeholder="add title" onChange={e => setAddPostTitle(e.target.value)}></input>
                    <label className="fileUpload" htmlFor="file">
                        <span id="fileSpan"><FontAwesomeIcon icon={faUpload} /> Upload file</span>
                    </label>
                    <input id="file" type="file" accept="image/*,audio/*,video/*" onChange={loadFile}></input>
                    <a href={imgUrl}>{imgUrl}</a>
                    <button className="formButtons" id="addImgPost" onClick={addPostImgHandler}>Add image post</button>
                    {displayImgLoading()}
                </div>
                <div className='postSelftextForm'>
                    <h1 id="selftextFormTitle">create post with text</h1>
                    <input placeholder="add title" onChange={e => setAddPostTitle(e.target.value)}></input>
                    <textarea id="selftext" placeholder="add selftext" onChange={e => setAddPostSelftext(e.target.value)}></textarea>
                    <button className="formButtons" id="addPost" onClick={addPostHandler}>Add post</button>
                    {displayLoading()}
                </div>
            </div>
        </div>
    )
}

export default CreatePost