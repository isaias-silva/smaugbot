import { connect } from "./connect";

export async function bot(io:any){

    const socket = await connect(io)
   socket.ev.on('messages.upsert',(message)=>{
    console.log('mensagem')
   })
}