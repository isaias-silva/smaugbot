import makeWaSocket, {
    DisconnectReason,
    useSingleFileAuthState,
} from "@adiwajshing/baileys";
import qr from 'qrcode'

import { Boom } from "@hapi/boom";
import path from "path";

export const connect = async () => {

    const { state, saveState } = useSingleFileAuthState(
        path.resolve(__dirname, "..", "cache", "auth.json")
    );

    const socket = makeWaSocket({
        printQRInTerminal: false,

        auth: state,
        defaultQueryTimeoutMs: undefined,


    });

    socket.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (update.qr) {
            qr.toFile(path.resolve('public','img','qrcode-start.png'), update.qr)
        }
        if (connection === "close") {
            const shouldReconnect =
                (lastDisconnect?.error as Boom)?.output?.statusCode !==
                DisconnectReason.loggedOut;

            if (shouldReconnect) {
                await connect();
            }
        }
    
    });

    socket.ev.on("creds.update", saveState);

    return socket;
};