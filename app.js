const express = require('express')
const config = require('config')
// const {sendQuery} = require('./db')

const app = express()

app.use(express.json({ extended: true }))

app.use(express.json({extended: true}))
app.use('/find', require('./routes/main_router'))



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

