
'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

function getEmojis() {
    // require emoji file
    const emojis = require('emoji.json')

    // load emoji backend lookup
    return emojis.reduce((acc, current) => {
        // NOTE: If this doesn't work we can RegEx and then trim
        // RegEx pattern [^|]+
        const keywords = current.keywords.split('|').map(keyword => keyword.trim())

        for (var i = 0; i < keywords.length; i++) {
            const keyword = keywords[i]

            if (acc[keyword] == null) {
                acc[keyword] = []
            }

            acc[keyword].push(current.char)
        }

        return acc
    }, {})
}

const upsideDownEmojis = getEmojis()

function parseInput(input) {
    console.log(input)
    return input.split(' ')
}

function lookupFromDictionary(arr) {
    const keywords = arr.filter(item => upsideDownEmojis[item])

    const emojis = []

    for (var i = 0; i < keywords.length; i++) {
        const keyword = keywords[i]

        emojis.push(upsideDownEmojis[keyword][0])
    }

    return emojis;
}

module.exports = {
    translate: function(input) {
        // return ['👋','🌎']
        return lookupFromDictionary(parseInput(input))
    }
}