import wsocket, { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const ws = (server: any) => {
    const io = new wsocket.Server(server)
   
    //connection
    io.on('connection', (socket) => {
        console.log('conectado ao websocket')
        
        socket.on('msg',(ev)=>{
           console.log(`[${socket.id}] : ${ev}`)
        })
       
    })
    
}

export default ws