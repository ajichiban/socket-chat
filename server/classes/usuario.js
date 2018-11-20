


class Usuarios{

    constructor(){
        this.personas = []
    }

    agregarPersona(id, nombre, sala){
        this.personas.push({id, nombre, sala})
        return this.personas
    }

    getPersonaId(id){
        let persona =  this.personas.filter(persona => persona.id === id )[0]
        return persona
    }

    getPersonas(){
        return this.personas
    }

    getPersonasSala(sala){
        let personasPorSala = this.personas.filter( (persona)=>{
            return persona.sala === sala
        })
        return personasPorSala
    }

    borrarPersona(id){
        let personaBorrada = this.getPersonaId(id)

        this.personas = this.personas.filter( persona => persona.id != id)

        return personaBorrada
    }
}

module.exports ={
    Usuarios
}