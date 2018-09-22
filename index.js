const express = require('express')
const app = express()
const path = require('path')
const translator = require('./translator')

const port = process.env.PORT || 8080;

app.use(express.static('client'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/api/translate/', (req, res) => {
    const input = req.body;
    const output = translator.translate(input)
    res.send(output)
})

app.listen(port, () => console.log(`👋 ${port}!`))
