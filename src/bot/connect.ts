import makeWaSocket, {
    DisconnectReason,
    useSingleFileAuthState,
} from "@adiwajshing/baileys";
import qr from 'qrcode'

import { Boom } from "@hapi/boom";
import path from "path";

export const connect = async (io:any) => {

    const { state, saveState } = useSingleFileAuthState(
        path.resolve(__dirname,".." ,"..", "cache", "auth.json")
    );

    const socket = makeWaSocket({
        printQRInTerminal: false,
        auth:state ,

    defaultQueryTimeoutMs: undefined,


    });

    socket.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (update.qr) {
           await qr.toFile(path.resolve('public','img','qrcode-start.png'), update.qr)
            io.emit('bot','qrcode')
        }
        if (connection === "close") {
            const shouldReconnect =
                (lastDisconnect?.error as Boom)?.output?.statusCode !==
                DisconnectReason.loggedOut;
                io.emit('bot','closecon')
            if (shouldReconnect) {
                await connect(io);
            }
        }
    
    });

    socket.ev.on("creds.update", saveState);

    return socket;
};