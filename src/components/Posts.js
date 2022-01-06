import PostCard from './PostCard'
import axiosInstance from '../axiosInstance'
import { useState, useEffect } from 'react'
import './styles/Posts.css'
import { CSpinner } from '@coreui/react'
import { useParams } from 'react-router-dom'

function Posts(props) {
    const { subreddit, setPosts, posts, setSubreddit } = props
    const params = useParams()

    const [loading, setLoading] = useState(true)
    const [addPostTitle, setAddPostTitle] = useState()
    const [addPostSelftext, setAddPostSelftext] = useState()
    const [imgUrl, setImgUrl] = useState()


    if(params.subreddit){
        setSubreddit(`r/${params.subreddit}`)
    }
    else {
        setSubreddit('r/all')
    }

    useEffect(() => {
        const fetchPosts = async () => {
            let data = await axiosInstance.get(subreddit)
            console.log(data)
            return data
        }
        fetchPosts().then(data => {
            setPosts(data.data.posts)
            setLoading(false)
        })

        console.log(posts)
    }, [])

    const addPostHandler = () => {
        axiosInstance.post(`/addPost`, { subreddit: subreddit, title: addPostTitle, selftext: addPostSelftext })
            .then(res => { console.log(res) })
    }

    const addPostImgHandler = () => {
        axiosInstance.post(`/addPostImage`, { image: imgUrl, subreddit: subreddit })
            .then(res => { console.log(res) })
    }

    const displayPosts = () => {
        if (!loading && posts) {
            return posts.map((post) => {
                return <PostCard post={post} subreddit={subreddit} key={post.id} />
            })
        }
        else{
            return (
                <div>
                    <CSpinner />
                </div>
            )
        }
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

    // const typeHandler = (type) => {
    //     if (type === "text") {
    //         return (
    //             <div>
    //                 <input placeholder="add title" onChange={e => setAddPostTitle(e.target.value)}></input>
    //                 <input placeholder="add selftext" onChange={e => setAddPostSelftext(e.target.value)}></input>
    //                 <button onClick={addPostHandler}>Add post</button>
    //             </div>
    //         )
    //     }
    //     else if (type === "image") {
    //         return (
    //             <div>
    //                 <input placeholder="add title" onChange={e => setAddPostTitle(e.target.value)}></input>
    //                 <input id="file" type="file" accept="image/*,audio/*,video/*" onChange={loadFile}></input>
    //                 {imgUrl}
    //                 <button onClick={addPostImgHandler}>Add image</button>
    //             </div>
    //         )
    //     }
    //     else {
    //         return null
    //     }


    // }

    return (
        <div className="posts">

            {displayPosts()}
            <input placeholder="add title" onChange={e => setAddPostTitle(e.target.value)}></input>
            <input placeholder="add selftext" onChange={e => setAddPostSelftext(e.target.value)}></input>
            <button onClick={addPostHandler}>Add post</button>

            <input placeholder="add title" onChange={e => setAddPostTitle(e.target.value)}></input>
            <input id="file" type="file" accept="image/*,audio/*,video/*" onChange={loadFile}></input>
            {imgUrl}
            <button onClick={addPostImgHandler}>Add image</button>


            {/* <button onClick={typeHandler("text")}>Text</button>
            <button onClick={typeHandler("image")}>image</button> */}


        </div>
    )
}

export default Posts
