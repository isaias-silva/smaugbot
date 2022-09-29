import makeWaSocket, {
    DisconnectReason,
    useSingleFileAuthState,
} from "@adiwajshing/baileys";
import { Boom } from "@hapi/boom";
import { query } from "express";
import path from "path";
import qr from 'qrcode'

export class Socket {
    connect = async (io: any,id:any) => {

        const { state, saveState } = useSingleFileAuthState(
            path.resolve("cache", "auth.json")

        );

        const socket = makeWaSocket({

            auth: state,
            defaultQueryTimeoutMs: undefined,


        });

        socket.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect ,receivedPendingNotifications} = update;
         console.log(update)

            if (update.qr) {
                await qr.toFile(path.resolve('public', 'img', 'qrcode-start.png'), update.qr)
                io.to(id).emit('conn', 'init')
            }
            if(receivedPendingNotifications){
               
                io.to(id).emit('conn','finish')
                console.log("id: " +id)
            }
           
            if (connection == "connecting") {
                io.to(id).emit('conn', 'connecting')
            }
            if (connection === "close") {
                const shouldReconnect =
                    (lastDisconnect?.error as Boom)?.output?.statusCode !==
                    DisconnectReason.loggedOut;
                io.emit('conn', 'close')

                if (shouldReconnect) {
                    await this.connect(io,id);
                }

            }
        });
      
        socket.ev.on("creds.update", saveState);
      
        return {state,socket};
    };
}