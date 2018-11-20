const {io} = require('../server')

const {Usuarios}= require('../classes/usuario')
const {crearMensaje} = require('../utilities/utilities')
const user = new Usuarios()

io.on('connection', (client)=>{
    
    /* --- Nueva persona en el chat --- */
    client.on('entrarChat', (data, callback)=>{

        console.log(data)
        //Valindando el nombre
        if(!data.nombre || !data.sala){
            return callback({
                err: true,
                msg:'El nombre y la sala son necesarios'
            })
        }

        // Agregar  persona a la lista global
        user.agregarPersona(client.id, data.nombre, data.sala)

        let personasEnSala = user.getPersonasSala(data.sala)

        // Agregar persona a la sala
        client.join(data.sala)

        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Admin', `${data.nombre} se acaba de conectar`))
        client.broadcast.to(data.sala).emit('listaPersonaChat', personasEnSala)

        return callback(personasEnSala)

    })

    /* --- Desconexiones de personas --- */
    client.on('disconnect', ()=>{

        let personaBorrada = user.borrarPersona(client.id),
            nombre = personaBorrada.nombre

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Admin', `${nombre} salió`))
        client.broadcast.to(personaBorrada.sala).emit('listaPersonaChat', user.getPersonasSala(personaBorrada.sala))

    } )

    /* --- Mensajes de 1 a muchos  --- */
    client.on('crearMensaje', (data)=>{
        let persona = user.getPersonaId(client.id)

        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje(persona.nombre, data.mensaje))
    })

    /* --- Mensajes Privados --- */
    client.on('mensajePrivado', (data)=>{
        let persona = user.getPersonaId(client.id)
        client.broadcast.to(data.para).emit('crearMensaje', crearMensaje(persona.nombre, data.msg))
    })
}) 

