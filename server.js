const express = require('express')
const path = require('path')

const app = express()
//Protocolo HTTP
const server = require('http').createServer(app)
//CONFIG WEBSOCKET
const io = require('socket.io')(server)
//Configurando a pasta publica
app.use(express.static(path.join(__dirname,'public')))
//Configuração da Engine
app.set('views',path.join(__dirname,'public'))
app.engine('html',require('ejs').renderFile)
app.set('view engine','html')

app.use('/',(req,res)=>{
    res.render('index.html')
})
//Toda vez que um cliente se conectar ao socket será
io.on('connection')
server.listen(3000)