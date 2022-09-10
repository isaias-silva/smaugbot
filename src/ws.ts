import wsocket, { Server } from 'socket.io'
import { bot } from './bot/bot'
import fs from 'fs'
import path from 'path'
const ws = (server: any) => {
    const io = new wsocket.Server(server)
   
    //connection
    io.on('connection', (socket) => {
        console.log('conectado ao websocket')
        
        socket.on('msg',(ev)=>{
           console.log(`[${socket.id}] : ${ev}`)
        })
        socket.on('bot',(msg)=>{
            switch(msg){
                case 'connect':
                bot(socket)
                break;
                case 'connected':
            
                break;
            }
        })
       
    })
    return io
}

export default ws