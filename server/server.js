const secret = require('../secret.json')
const express = require('express')
const cors = require('cors')
const app = express()
const snoowrap = require('snoowrap')
const fs = require('fs')
const port = 5000

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.multipart());

const { CLIENT_ID, SECRET_KEY, headers, refresh_token, access_token } = secret["secret"]

const reddit = new snoowrap({
    userAgent: headers['User-Agent'],
    clientId: CLIENT_ID,
    clientSecret: SECRET_KEY,
    refreshToken: refresh_token
})

function timeString(hours) {
    if (hours < 24) {
        let time_ago = `${hours} hours ago`
        return time_ago
    }
    else {
        let days = Math.round(hours / 24)
        let time_ago = `${days} days ago`
        return time_ago
    }
}
// const initFunction = async () => {      //posty
//     let posts = []
//     try {
//         posts = await reddit.getHot("xqcow")
//     }
//     catch (err){
//         console.log(err)
//     }

//     fs.writeFileSync("posts.json", JSON.stringify(posts))
// }
// initFunction()



// const initFunction = async () => {                                    //komentarze
//     let z = JSON.parse(fs.readFileSync("posts.json"))
//     let comments = []

//     comments = await reddit.getSubmission(z[0].id).comments
//     fs.writeFileSync("comments.json", JSON.stringify(comments))
// }
// initFunction()

let posts = JSON.parse(fs.readFileSync("posts.json"))
app.get('/', async (req, res) => {
    // let postTitle = await reddit.getHot("xqcow").map(post => post.title)

    // try {
    //     posts = await reddit.getHot("xqcow")
    // }
    // catch (err){
    //     console.log(err)
    // }
    // let posts = await reddit.getSubmission("rec6mi").expandReplies({limit: 5, depth: 5})

    // const promises = postId.map(async element =>{
    //     const posts = await reddit.getSubmission(element).expandReplies({limit: 5, depth: 5})
    //     return posts
    // })
    // const posts = await Promise.all(promises)
    // let user = await reddit.getUser(posts.map(element => element.author))
    // object.postComments[0][0].upvote()
    // posts[0].upvote()   //downvote()   //wazna linijka
    // .then( data => { res.send(JSON.stringify(data)) })
    // .catch(res.send("failure"))

    //object.postComments[0].comments[0].replies[0].replies[0]
    // object.keys.map(element => element.postComments)


    posts = posts.map(post => {
        let currDate = new Date()
        let timeStamp = Date.now()
        let postTime = post.created_utc * 1000 // change s to ms
        let timeDiff = timeStamp - postTime
        let hours = Math.round(timeDiff / (1000 * 3600))



        return {
            id: post.id,
            title: post.title,
            author: post.author,
            score: post.score,
            subreddit: post.subreddit,
            imageUrl: post.url_overridden_by_dest,
            timeInHours: timeString(hours),
            likes: post.likes
        }
    })
    let object = {
        posts: posts
        //TODO upvote
        //TODO downvote?
        //get profile
    }

    res.send(JSON.stringify(object)) //comments.replies - zwraca komentarz komentarza popoga
})

app.get(`/:id/`, async (req, res) => {
    
    let comments = JSON.parse(fs.readFileSync("comments.json"))
    let postId = req.params.id
    console.log(`fetching comments for post ${postId}`)
    comments = await reddit.getSubmission(postId).comments

    comments = comments.map(comment => {

        let timeStamp = Date.now()
        let postTime = comment.created_utc * 1000
        let timeDiff = timeStamp - postTime
        let hours = Math.round(timeDiff / (1000 * 3600))

        return {
            id: comment.id,
            body: comment.body,
            author: comment.author,
            score: comment.score,
            parentId: comment.parent_id,
            timeInHours: timeString(hours)
        }
    })
    let object = {
        comments: comments

        //TODO upvote
        //TODO downvote?
        //get profile
    }
    res.send(JSON.stringify(object)) //comments.replies - zwraca komentarz komentarza popoga
})

app.post(`/:id/upvote`, (req, res) => {
    let post = req.body
    console.log(post)
    console.log(post.id)
    reddit.getSubmission(post.id).upvote()
})

app.post(`/:id/downvote`, (req, res) => {
    let post = req.body
    reddit.getSubmission(post.id).downvote()
})

app.post(`/:id/unvote`, (req, res) => {
    let post = req.body
    reddit.getSubmission(post.id).unvote()
})

app.post(`/:id/addComment`, (req, res) => {
    let object = req.body
    
    let cut = object.comment.parentId.slice(3) // moze niepotrzebne? ucinam t3_ z id
    
    reddit.getSubmission(cut).reply(object.text)
})

app.post(`/addPost`, (req, res) => {
    
    let post = req.body
    console.log(post)
    let subreddit = req.body.subreddit
    // reddit.submitSelfpost({
    //     subredditName: 'testingground4bots',
    //     title: post.title,
    //     text: post.selftext
    //   }).then(console.log)
})

app.post(`/addPostImage`, (req, res) => {
    
    let imgUrl = req.body.image
    console.log(imgUrl)
    let subreddit = req.body.subreddit
    // reddit.submitLink({
    //     subredditName: 'testingground4bots',
    //     title: 'test title',
    //     url: imgUrl
    //   }).then(console.log)
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})