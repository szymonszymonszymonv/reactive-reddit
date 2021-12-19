const secret = require('../secret.json')
const express = require('express')
const cors = require('cors')
const app = express()
const snoowrap = require('snoowrap')
const fs = require('fs')
const port = 5000

app.use(cors())

const { CLIENT_ID, SECRET_KEY, headers, refresh_token, access_token } = secret["secret"]

const reddit = new snoowrap({
    userAgent: headers['User-Agent'],
    clientId: CLIENT_ID,
    clientSecret: SECRET_KEY,
    refreshToken: refresh_token
})


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
//     let posts = []
//     try {
//         const promises = z.map(async element => {
//             // posts = await reddit.getSubmission(element.id).expandReplies({ limit: 5, depth: 5 })
//             posts = reddit.getSubmission(element.id).comments
//             return posts
//         })
//         posts = await Promise.all(promises)
//     }
//     catch (err) {
//         console.log(err)
//     }

//     fs.writeFileSync("comments.json", JSON.stringify(posts))
// }
// initFunction()


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
                
    let posts = JSON.parse(fs.readFileSync("posts.json"))
    posts = posts.map(post => {
        let currDate = new Date();   
        let timeStamp = currDate.getTime()
        let postTime = post.created_utc
        let timeDiff = timeStamp - postTime

        let hours = Math.round(timeDiff / (1000 * 3600))
        


        return {
            id: post.id,
            title: post.title,
            author: post.author,
            score: post.score,
            subreddit: post.subreddit,
            imageUrl: post.url_overridden_by_dest,
            timeInHours: hours
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

app.get(`/:subreddit/:id/`, async (req, res) => {


    // let posts = await reddit.getSubmission("rec6mi").expandReplies({limit: 5, depth: 5})
    let comments = JSON.parse(fs.readFileSync("comments.json"))

    let currDate = new Date();   

    comments = comments.map(comment => {

        let timeStamp = currDate.getTime()
        let postTime = comment.created_utc
        let timeDiff = timeStamp - postTime
        let hours = Math.round(timeDiff / (1000 * 3600))

        return {
            id: comment.id,
            body: comment.title,
            author: comment.author,
            score: comment.score,
            // subreddit: post.subreddit,
            parentId: comment.parent_id,
            timeInHours: hours
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


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})