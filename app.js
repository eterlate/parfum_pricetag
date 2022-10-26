const express = require('express')
const config = require('config')
// const {sendQuery} = require('./db')

const app = express()

app.use('/auth', require('./routes/auth_router'))


const PORT = config.get('server.port') || 5000

async function start(){
    try{
        app.listen(PORT, () => console.log(`App started on port: ${PORT}`))
    }catch(e){
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()

