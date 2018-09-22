
'use strict';

// require emoji file
const emojis = require('emoji.json')

// load emoji backend lookup
// const emojiDictionary = emojis.reduce((array, current) => {
//     if (array == null) {
//         array = []
//     }

//     const keywords = current.keywords.split('|').map(keyword => keyword.trim())

//     array = [...keywords, array]
// })

function parseInput(input) {
    return []
}

function lookupFromDictionary(arr) {
    return []
}

module.exports = {
    translate: function(input) {
        return ['👋','🌎']
        // return lookupFromDictionary(parseInput(input))
    }
}