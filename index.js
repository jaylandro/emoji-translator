const express = require('express')
const app = express()

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('👋🌎'))

app.listen(port, () => console.log(`👋 ${port}!`))
