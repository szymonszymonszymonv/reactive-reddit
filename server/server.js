const secret = require('../secret.json')
const express = require('express')
const cors = require('cors')
const app = express()
const snoowrap = require('snoowrap')
const fs = require('fs')
const port = 5000
const crypto = require("crypto")

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.multipart());

const { CLIENT_ID, SECRET_KEY, headers, refresh_token, access_token } = secret["secret"]

let reddit = new snoowrap({
    userAgent: headers['User-Agent'],
    clientId: CLIENT_ID,
    clientSecret: SECRET_KEY,
    refreshToken: refresh_token
})
let reddit_user = false

app.get('/auth', (req, res) => {
    const authUrl = snoowrap.getAuthUrl({
        clientId: CLIENT_ID,
        scope: ['vote', 'subscribe', 'mysubreddits', 'submit', 'identity', 'edit', 'history'],
        redirectUri: "http://localhost:3000/auth",
        permanent: true,
        state: crypto.randomBytes(20).toString('hex')
    })
    console.log(authUrl)
    res.send(JSON.stringify({authUrl: authUrl}))
})

app.post('/login', (req, res) => {
    let code = req.body.code
    snoowrap.fromAuthCode({
        code: code,
        userAgent: headers['User-Agent'],
        clientId: CLIENT_ID,
        clientSecret: SECRET_KEY,
        redirectUri: "http://localhost:3000/auth"
    }).then(r => {
        reddit_user = r
        r.getMe().then(data => {
            res.send(JSON.stringify({me: data}))
        })
    }).catch(err => {
        console.log(err)
    })
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



const initFunction = async () => {                                    //komentarze
    let z = JSON.parse(fs.readFileSync("posts.json"))
    let comments = []

    comments = await reddit.getSubmission(z[0].id).fetch()
    fs.writeFileSync("comments.json", JSON.stringify(comments))
}
initFunction()

app.get('/', async (req, res) => {
    let posts = JSON.parse(fs.readFileSync("posts.json"))
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

        let medias = []
        
        if(post.media_metadata){
            for(let img in post.media_metadata){
                medias.push(post.media_metadata[img].s)
            }
        }

        return {
            id: post.id,
            title: post.title,
            author: post.author,
            selftext: post.selftext,
            score: post.score,
            subreddit: post.subreddit.display_name,
            imageUrl: post.url_overridden_by_dest,
            timeInHours: timeString(hours),
            likes: post.likes,
            medias: medias
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

app.get('/r/:subreddit', async (req, res) => {
    let posts = []
    let subreddit = req.params.subreddit
    console.log(`SUBREDDIT: ${subreddit}`)
    try {
        posts = await reddit.getHot(subreddit, {limit: 10})
    }
    catch (err){
        console.log(err)
    }

    posts = posts.map(post => {
        let timeStamp = Date.now()
        let postTime = post.created_utc * 1000 // change s to ms
        let timeDiff = timeStamp - postTime
        let hours = Math.round(timeDiff / (1000 * 3600))

        let medias = []
        
        if(post.media_metadata){
            for(let img in post.media_metadata){
                medias.push(post.media_metadata[img].s)
            }
        }

        return {
            id: post.id,
            title: post.title,
            author: post.author.name,
            selftext: post.selftext,
            score: post.score,
            subreddit: post.subreddit.display_name,
            imageUrl: post.url_overridden_by_dest,
            timeInHours: timeString(hours),
            likes: post.likes,
            medias: medias
        }
    })

    let object = {posts: posts}
    console.log("sending posts")
    res.send(JSON.stringify(object)) 

    // reddit.getHot(subreddit, {limit: 10})
    //     .then(data => {
    //         posts = data
    //         console.log("fetching posts successful")
            
    //         posts = posts.map(post => {
    //             let timeStamp = Date.now()
    //             let postTime = post.created_utc * 1000 // change s to ms
    //             let timeDiff = timeStamp - postTime
    //             let hours = Math.round(timeDiff / (1000 * 3600))

    //             let medias = []
                
    //             if(post.media_metadata){
    //                 for(let img in post.media_metadata){
    //                     medias.push(post.media_metadata[img].s)
    //                 }
    //             }

    //             return {
    //                 id: post.id,
    //                 title: post.title,
    //                 author: post.author,
    //                 selftext: post.selftext,
    //                 score: post.score,
    //                 subreddit: post.subreddit,
    //                 imageUrl: post.url_overridden_by_dest,
    //                 timeInHours: timeString(hours),
    //                 likes: post.likes,
    //                 medias: medias
    //             }
    //         })

    //         let object = {posts: posts}
    //         console.log("sending posts")
    //         res.send(JSON.stringify(object)) 
    //     })
    //     .catch(err => console.log(err))

    // try {
    //     posts = await reddit.getHot(subreddit)
    // }
    // catch (err){
    //     console.log(err)
    // }

})

let constructComment = (comment) => {
    let timeStamp = Date.now()
    let postTime = comment.created_utc * 1000
    let timeDiff = timeStamp - postTime
    let hours = Math.round(timeDiff / (1000 * 3600))
    
    let commentObj =  {
        id: comment.id,
        body: comment.body,
        author: comment.author.name,
        score: comment.score,
        parentId: comment.parent_id,
        timeInHours: timeString(hours),
        likes: comment.likes
    }
    return commentObj
}

let constructReplies = (comment) => {
    let replies = []
    if([...comment.replies].length === 0) {
        return replies
    }
    for(let reply of comment.replies) {
        let replyObj = constructComment(reply)
        replyObj.replies = constructReplies(reply)
        replies.push(replyObj)
    }
    return replies
}

app.get(`/r/:subreddit/:id/`, async (req, res) => {
    
    let comments = JSON.parse(fs.readFileSync("comments.json"))
    let postId = req.params.id
    console.log(`fetching comments for post ${postId}`)
    comments = await reddit.getSubmission(postId).comments

    comments = comments.map(comment => {

        let commentObj = constructComment(comment)
        commentObj.replies = constructReplies(comment)
        return commentObj
        
    })
    let object = {
        comments: comments
    }
    res.send(JSON.stringify(object))
})

app.post(`/:id/upvote`, (req, res) => {
    let id = req.params.id
    console.log(id)
    let r = reddit
    if(reddit_user){
        r = reddit_user
    }
    r.getSubmission(id).upvote()
        .then( res => {console.log(res)})
        .catch( err => {console.log(err)})
})

app.post(`/:id/downvote`, (req, res) => {
    let id = req.params.id
    console.log(id)
    let r = reddit
    if(reddit_user){
        r = reddit_user
    }
    r.getSubmission(id).downvote()
        .then( res => {console.log(res)})
        .catch( err => {console.log(err)})
})

app.post(`/:id/unvote`, (req, res) => {
    let id = req.params.id
    console.log(id)
    let r = reddit
    if(reddit_user){
        r = reddit_user
    }
    r.getSubmission(id).unvote()
        .then( res => {console.log(res)})
        .catch( err => {console.log(err)})
})

app.post(`/comment/:id/upvote`, (req, res) => {
    let id = req.params.id
    console.log(id)
    let r = reddit
    if(reddit_user){
        r = reddit_user
    }
    r.getComment(id).upvote()
        .then( res => {console.log(res)})
        .catch( err => {console.log(err)})
})

app.post(`/comment/:id/downvote`, (req, res) => {
    let id = req.params.id
    console.log(id)
    let r = reddit
    if(reddit_user){
        r = reddit_user
    }
    r.getComment(id).downvote()
        .then( res => {console.log(res)})
        .catch( err => {console.log(err)})
})

app.post(`/comment/:id/unvote`, (req, res) => {
    let id = req.params.id
    console.log(id)
    let r = reddit
    if(reddit_user){
        r = reddit_user
    }
    r.getComment(id).unvote()
        .then( res => {console.log(res)})
        .catch( err => {console.log(err)})
})

app.post(`/:id/addComment`, (req, res) => {
    let object = req.body
    
    let cut = object.comment.parentId.slice(3) // moze niepotrzebne? ucinam t3_ z id
    let r = reddit
    if(reddit_user){
        r = reddit_user
    }
    r.getSubmission(cut).reply(object.text)
})

app.post(`/addPost`, (req, res) => {
    
    let post = req.body
    console.log(post)
    let subreddit = req.body.subreddit
    let r = reddit
    if(reddit_user){
        r = reddit_user
    }
    r.submitSelfpost({
        // subredditName: 'testingground4bots',
        subredditName: subreddit,
        title: post.title,
        text: post.selftext
      }).then(data => {
          let submission_name = data.name.slice(3)
          let obj = {
              link: `r/${subreddit}/${submission_name}`
          }
          res.send(JSON.stringify(obj))
      })
})

app.post(`/addPostImage`, (req, res) => {
    
    let imgUrl = req.body.image
    console.log(imgUrl)
    let subreddit = req.body.subreddit
    let r = reddit
    if(reddit_user){
        r = reddit_user
    }
    // r.submitLink({
    //     subredditName: 'testingground4bots',
    //     title: 'test title',
    //     url: imgUrl
    //   }).then(console.log)
})

app.post(`/logout`, (req, res) => {
    reddit_user = false
    res.send("user logged out")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})