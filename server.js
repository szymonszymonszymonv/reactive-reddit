const secret = require('./secret.json')
const express = require('express')
const app = express()
const snoowrap = require('snoowrap')
const port = 8000

const { CLIENT_ID, SECRET_KEY, headers, refresh_token, access_token } = secret["secret"]

const reddit = new snoowrap({
    userAgent: headers['User-Agent'],
    clientId: CLIENT_ID,
    clientSecret: SECRET_KEY,
    refreshToken: refresh_token
})

reddit.getHot().then((data) => {console.log(data)})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})