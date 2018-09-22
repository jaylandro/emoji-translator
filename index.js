const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require("body-parser")

const translator = require('./server/translator')

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('client'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/api/translate/', (req, res) => {
    const input = req.body.input;
    const output = translator.translate(input)
    res.send(output)
    // translator.translate(input, function(output){
    //     res.send(output);
    // })
})

app.listen(port, () => console.log(`👋 ${port}!`))
