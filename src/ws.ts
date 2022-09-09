import wsocket, { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const ws = (server: any) => {
    const io = new wsocket.Server(server)
   
    //connection
    io.on('connection', (socket) => {
        console.log('conectado')
     
        io.to(socket.id).emit('msg', `${socket.id} bem vindo!`)
        
        socket.on('msg',(ev)=>{
            socket.emit('msg',ev)
        })
    })
    
}

export default ws