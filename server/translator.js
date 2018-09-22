
'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const uuidv4 = require('uuid/v4');

let https = require ('https');
let accessKey = process.env.TEXT_ANALYTICS_KEY;
let uri = process.env.TEXT_ANALYTICS_HOST;
let path = process.env.TEXT_ANALYTICS_PATH;

let response_handler = function (response) {
    let body = '';
    response.on ('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        let body_ = JSON.parse (body);
        let body__ = JSON.stringify (body_, null, '  ');
        console.log (body__);
    });
    response.on ('error', function (e) {
        console.log ('Error: ' + e.message);
    });
};

function getEmojis() {
    // require emoji file
    const emojis = require('emoji.json')

    // load emoji backend lookup
    return emojis.reduce((acc, current) => {
        // NOTE: If this doesn't work we can RegEx and then trim
        // RegEx pattern [^|]+
        const keywords = current.keywords.split('|') //.map(keyword => keyword.trim())

        for (var i = 0; i < keywords.length; i++) {
            var keyword = keywords[i].trim()
            keyword = keyword.replace("”", "")
            keyword = keyword.replace("'", "")
            keyword = keyword.replace("“", "")
            keyword = keyword.toLowerCase()
            
            if (keyword.indexOf(' ') < 0 && acc[keyword] == null) {
                acc[keyword] = []
            }

            if (acc[keyword]) {
                acc[keyword].push(current.char)
            }
        }

        return acc
    }, {})
}

const upsideDownEmojis = getEmojis()

console.log(upsideDownEmojis)

function parseInput(input) {
    if (input != null && input.length) {
        return input.toLowerCase().split(' ')
    }

    return []
}

function lookupFromDictionary(arr) {
    console.log('keywords in process "' + arr.join(',') + '"')
    const keywords = arr.filter(item => upsideDownEmojis[item])

    const emojis = []

    for (var i = 0; i < keywords.length; i++) {
        const keyword = keywords[i]

        console.log('matched "' + keyword + '"')
        emojis.push(upsideDownEmojis[keyword][0])
    }

    return emojis;
}

function fetchKeyPhrases(input){

        let body = JSON.stringify (createDocument(input))
        let request_params = {
            method : 'POST',
            hostname : uri,
            path : path + 'keyPhrases',
            headers : {
                'Ocp-Apim-Subscription-Key' : accessKey,
            }
        };
    console.log(request_params);
        let req = https.request (request_params, response_handler);
        req.write (body);
        req.end ();
}

function createDocument(phrase){
    return {
        'documents' : [
            {
                'id': uuidv4(),
                'language': 'en',
                'text': phrase
            }
        ]
    };
}

module.exports = {
    translate: function(input) {
        // return ['👋','🌎']
        return lookupFromDictionary(parseInput(input))
    }
}