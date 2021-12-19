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


// const initFunction = async () => {
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
        return {
            id: post.id,
            title: post.title,
            author: post.author,
            score: post.score,        
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


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})