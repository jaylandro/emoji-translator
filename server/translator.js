'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const uuidv4 = require('uuid/v4');

let https = require('https');
let accessKey = process.env.TEXT_ANALYTICS_KEY;
let uri = process.env.TEXT_ANALYTICS_HOST;
let path = process.env.TEXT_ANALYTICS_PATH;

function getEmojis() {
    // require emoji file
    const emojis = require('emoji.json')
    const synonyms = require('synonyms')
    const uniqueKeywords = []

    // load emoji backend lookup
    let emojiList = emojis.reduce((acc, current) => {
        const keywords = current.keywords.split('|')


        for (var i = 0; i < keywords.length; i++) {
            var keyword = keywords[i].trim()
            keyword = keyword.replace("”", "")
            keyword = keyword.replace("'", "")
            keyword = keyword.replace("“", "")
            keyword = keyword.toLowerCase()

            if (acc[keyword] == null) {
                acc[keyword] = []
                uniqueKeywords.push(keyword)
            }

            acc[keyword].push(current.char)
        }

        return acc
    }, {})


    //query for sysnonymns
    for (var x = 0; x < uniqueKeywords.length; x++) {
        let uniqueKeyword = uniqueKeywords[x]

        let nounAndVerbSynonyms = synonyms(uniqueKeywords[x])

        if (nounAndVerbSynonyms != null) {
            if (nounAndVerbSynonyms.n != null) {
                for (var n = 0; n < nounAndVerbSynonyms.n.length; n++) {
                    var noun = nounAndVerbSynonyms.n[n]
                    if (emojiList[noun] == null) {
                        emojiList[noun] = emojiList[uniqueKeyword]
                    }
                }
            }

            if (nounAndVerbSynonyms.v != null) {
                for (var v = 0; v < nounAndVerbSynonyms.v.length; v++) {
                    var verb = nounAndVerbSynonyms.v[v]
                    if (emojiList[verb] == null) {
                        emojiList[verb] = emojiList[uniqueKeyword]
                    }
                }
            }

            if (nounAndVerbSynonyms.s != null) { 
                for (var s = 0; s < nounAndVerbSynonyms.s.length; s++) {
                    var something = nounAndVerbSynonyms.s[s]
                    if (emojiList[something] == null) {
                        emojiList[something] = emojiList[uniqueKeyword]
                    }
                }
            }
        }
    }


    return emojiList
}

const upsideDownEmojis = getEmojis()

function parseInput(input) {
    if (input != null && input.length) {
        // fetchKeyPhrases(input)
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

        const emojiLength = upsideDownEmojis[keyword].length;

        const randomEmoji = Math.floor(Math.random() * emojiLength);

        const emoji = upsideDownEmojis[keyword][randomEmoji];

        console.log('matched ' + keyword + ': ' + emoji)

        emojis.push(emoji)
    }

    return emojis;
}

function fetchKeyPhrases(input, cb) {

    let response_handler = function (response) {
        let body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            let body_ = JSON.parse(body);
            let body__ = JSON.stringify(body_, null, '  ');
            console.log(body__);
            let analyzedWords = body_.documents[0].keyPhrases;
            console.log(analyzedWords);
            let emoList = lookupFromDictionary(analyzedWords);
            cb(emoList);
        });
        response.on('error', function (e) {
            console.log('Error: ' + e.message);
        });
    };


    let body = JSON.stringify(createDocument(input))
    let request_params = {
        method: 'POST',
        hostname: uri,
        path: path + 'keyPhrases',
        headers: {
            'Ocp-Apim-Subscription-Key': accessKey,
        }
    };

    let req = https.request(request_params, response_handler);

    req.write(body);
    req.end();
}

function createDocument(phrase) {
    return {
        'documents': [{
            'id': uuidv4(),
            'language': 'en',
            'text': phrase
        }]
    };
}

module.exports = {
    translate: function (input) {
        // return ['👋','🌎']
        return lookupFromDictionary(parseInput(input))
        // return fetchKeyPhrases('fire truck down house', cb)
    }
}