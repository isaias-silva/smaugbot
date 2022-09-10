import { connect } from "./connect";

export async function bot(io: any) {

    const socket = await connect(io, io.id)
    socket.ev.on('messages.upsert', (message) => {
        console.log('mensagem')
    })
}