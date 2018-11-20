const express = require('express'),
    path = require('path'),
    socketIO =require('socket.io'),
    http = require('http')


const app = express()

//Configurar el servidor para usar sockets
const server = http.createServer(app)

const publicPath = path.resolve(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

// Inicializo sockets IO, comunicacion con el frontend
module.exports.io = socketIO(server)

require('./sockets/sockets')

// server run 
server.listen(port, (err) => {

    if (err) throw new Error(err)

    console.log(`Servidor corriendo en puerto ${ port }`)

});