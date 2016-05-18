"use strict";

const http = require('http')
const Bot = require('messenger-bot')

const FB_TOKEN = process.env.FB_TOKEN
const FB_VERIFY = process.env.FB_VERIFY

let bot = new Bot({
    token: FB_TOKEN,
    verify: FB_VERIFY
})

bot.on('error', (err) => {
    console.log(err.message)
})

bot.on('message', (payload, reply) => {
    let text = payload.message.text
    console.log('text : ' + text)

    let response = 'Bonjour'
    console.log('response : ' + response)

    if (text === 'Bonjour'){
        response = 'Bonjour, que puis-je faire pour vous?'
    } else {
        response = text
    }
    console.log()
    reply({
        response
    }, (err) => {
        if (err) throw err

        console.log(`Echoed back : ${text}`)
    })
})
http.createServer(bot.middleware()).listen(process.env.PORT)
console.log('Server is running.')
