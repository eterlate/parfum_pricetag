const express = require('express')
const config = require('config')
// const {sendQuery} = require('./db')
const path = require('path')
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json({ extended: true }))

app.use(express.json({extended: true}))
app.use('/find', require('./routes/main_router'))
app.use(cookieParser())

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

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

