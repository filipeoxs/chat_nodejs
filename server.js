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

//Armazenamento das messages em array
let messages = []

//Toda vez que um cliente se conectar ao socket será
io.on('connection', socket =>{
    console.log('Socket conectado:'+socket.id)

    //Enviar mensagens anteriores para o novo usuário
    //socket.emit('previousMessages',messages)
    //Usar socket.on para que o back-end possa ouvir a mensagem digitada no front
    socket.on('sendMessage', data =>{
        messages.push(data)
        //Usar socket.broadcast para que a mensagem seja exibida para todos
        socket.broadcast.emit('receivedMessage',data )

    })
});

server.listen(3000)

