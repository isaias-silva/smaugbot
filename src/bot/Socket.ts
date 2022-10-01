import makeWaSocket, {
    DisconnectReason,
    useMultiFileAuthState,
    useSingleFileAuthState,
} from "@adiwajshing/baileys";
import { Boom } from "@hapi/boom";
import { query } from "express";
import path from "path";
import qr from 'qrcode'
import { Iclient } from "../interfaces/Iclient";
import { toJsonArrays } from "../util/learnJson";

export class Socket {
    connect = async (io: any, id: any, keyx?: string) => {
        let clientsJson: any[] = toJsonArrays(path.resolve('cache', 'clients.json'))
        const clients: Iclient[] = clientsJson.map((item: Iclient) => {
            return {
                key: item.key
            }
        })
        let obj={
            key:keyx
        }
        const client=clients[clients.indexOf(obj)]
        let finalClient:Iclient;
       
        if(!client){
           finalClient={key:keyx} 
        }else{
            finalClient=client
        }
        const { state, saveCreds } = await useMultiFileAuthState(
            path.resolve("cache", `auth`)

        );
        const socket = makeWaSocket({

            auth: state,
            defaultQueryTimeoutMs: undefined,


        });

        socket.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect, receivedPendingNotifications } = update;
            console.log(update)

            if (update.qr) {
                await qr.toFile(path.resolve('public', 'img', 'qrcode-start.png'), update.qr)
                io.to(id).emit('conn', 'init')
               
            }
            if (receivedPendingNotifications) {

                io.to(id).emit('conn', 'finish')
                io.to(id).emit('localstorage', finalClient.key)
                console.log("id: " + id)
            }

            if (connection == "connecting") {
                io.to(id).emit('conn', 'connecting')
            }
            if (connection === "close") {
                const shouldReconnect =
                    (lastDisconnect?.error as Boom)?.output?.statusCode !==
                    DisconnectReason.loggedOut;
                io.to(id).emit('conn', 'close')

                if (shouldReconnect) {
                    await this.connect(io, id);
                }

            }
        });

        socket.ev.on("creds.update", saveCreds);

        return { state, socket };
    };
}