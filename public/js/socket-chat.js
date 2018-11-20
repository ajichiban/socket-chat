const socket  = io()

let params = new URLSearchParams(window.location.search)

if(!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html'
    throw new err('el nombre y sala son necesario')
}

const user = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

/* --- Conectado al server --- */
socket.on('connect', ()=> {
    console.log('conectado al servidor :)')

    socket.emit('entrarChat',user, (res)=>{
        console.log('Personas en el chat : ', res)
    })
})

/* --- Desconexion --- */
socket.on('disconnect', ()=> console.log('perdimos la conexion con el server :('))

/* --- Listado de personsa en el chat --- */
socket.on('listaPersonaChat', (users)=>{
    console.log('Personas en el chat : ', users)
})

/* --- Escuchando mensajes de otras personas --- */
socket.on('crearMensaje', (msg)=>{
    console.log(msg)
})

/* --- Escuchando mensajes privados --- */
socket.on('mensajePrivado',  (msg)=>{
    console.log('Mensaje Privado:', msg)
})

