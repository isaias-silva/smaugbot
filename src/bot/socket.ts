import makeWaSocket, {
    DisconnectReason,
    useSingleFileAuthState,
} from "@adiwajshing/baileys";
import { Boom } from "@hapi/boom";
import { query } from "express";
import path from "path";
import qr from 'qrcode'

export class Socket {
    connect = async (io: any) => {

        const { state, saveState } = useSingleFileAuthState(
            path.resolve("cache", "auth.json")

        );

        const socket = makeWaSocket({

            auth: state,
            defaultQueryTimeoutMs: undefined,


        });

        socket.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect } = update;



            if (update.qr) {
                await qr.toFile(path.resolve('public', 'img', 'qrcode-start.png'), update.qr)
                io.emit('conn', 'init')
            }

            if (connection == "connecting") {
                io.emit('conn', 'connecting')
            }
            if (connection === "close") {
                const shouldReconnect =
                    (lastDisconnect?.error as Boom)?.output?.statusCode !==
                    DisconnectReason.loggedOut;
                io.emit('conn', 'close')

                if (shouldReconnect) {
                    await this.connect(io);
                }

            }
        });

        socket.ev.on("creds.update", saveState);
      
        return socket;
    };
}