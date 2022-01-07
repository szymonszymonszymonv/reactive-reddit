import './styles/CreatePost.css'
import axiosInstance from '../axiosInstance'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

function CreatePost(props) {
    const navigate = useNavigate()
    const [addPostTitle, setAddPostTitle] = useState()
    const [addPostSelftext, setAddPostSelftext] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [subreddit, setSubreddit] = useState()

    const addPostHandler = () => {
        axiosInstance.post(`/addPost`, { subreddit: subreddit, title: addPostTitle, selftext: addPostSelftext })
            .then(res => { 
                console.log(res) 
                // navigate(`/${res.data.link}`)
            })
    }

    const addPostImgHandler = () => {
        axiosInstance.post(`/addPostImage`, { image: imgUrl, subreddit: subreddit })
            .then(res => { console.log(res) })
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
            console.log(files[0].type)
        }
        else if (videoRegExp.test(files[0].type)) {
            formdata.append("video", files[0])
            url = "https://api.imgur.com/3/upload"
            console.log(files[0].type)
        }


        // url = "https://api.imgur.com/3/upload/"
        // formdata.append("image", files[0])
        // for (var p of formdata){
        //     formdata.append("image", p)
        //     console.log(formdata.get())
        //     console.log("ss")
        //     console.log(formdata.getAll())
        // }

        // for(let i = 0; i < files.length; i++){

        //     formdata.append("image", files[i]) 

        // }

        // for (var p of formdata){

        //     console.log(p)
        //     console.log("ss")
        //     // console.log(p.get())
        // }

        let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // headers.append('Accept', 'application/json');
        headers.append('Authorization', "Client-ID " + apiKey);
        // headers.append('Origin', 'http://192.168.43.183:3000/');

        fetch(url, {
            // mode: 'no-cors',
            method: "post",
            headers: headers,
            // {
            //     Authorization: "Client-ID " + apiKey,

            // },
            body: formdata
        }).then(data => data.json()).then(data => {
            // event.preventDefault();
            console.log("i am in data")
            console.log(data)
            console.log(data.data.link)
            setImgUrl(data.data.link)
            // img.src = data.data.link
            // url.innerText = data.data.link
            // console.log(url)


        })

    }

    return (
        <div>
            <input placeholder="choose subreddit" onChange={e => setSubreddit(e.target.value)}></input>

            <div className="postForm">
                <div className='postImgForm'>
                    <h1 id="imgFormTitle">create post with image</h1>
                    <input placeholder="add title" onChange={e => setAddPostTitle(e.target.value)}></input>
                    <label className="fileUpload" htmlFor="file">
                        <span id="fileSpan"><FontAwesomeIcon icon={faUpload} /> Upload file</span>
                    </label>
                    <input id="file" type="file" accept="image/*,audio/*,video/*" onChange={loadFile} hidden></input>
                    <button className="formButtons" id="addImgPost" onClick={addPostImgHandler}>Add image post</button>
                    {imgUrl}
                </div>
                <div className='postSelftextForm'>
                    <h1 id="selftextFormTitle">create post with text</h1>
                    <input placeholder="add title" onChange={e => setAddPostTitle(e.target.value)}></input>
                    <textarea id="selftext" placeholder="add selftext" onChange={e => setAddPostSelftext(e.target.value)}></textarea>
                    <button class="formButtons" id="addPost" onClick={addPostHandler}>Add post</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost