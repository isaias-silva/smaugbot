import { proto } from "@adiwajshing/baileys"
import { Socket } from "./socket"
import fs from 'fs'
import { IbotData } from "../interfaces/IbotData"

export class Bot implements IbotData {
    name: string;
    prefix: string;
    socket: any;
    webMessage: proto.WebMessageInfo | undefined
    remoteJid: string | undefined | null
    participant: string | null | undefined;
    constructor(name: string, prefix: string) {
        this.name = name;
        this.prefix = prefix;
     
    }
start=async ()=>{
    this.socket = await new Socket().connect()
    this.socket.ev.on("messages.upsert", async (message: any) => {
        this.webMessage = message.messages[0]
        this.remoteJid = this.webMessage?.key.remoteJid
        this.participant = this.webMessage?.key.participant
    })
}
    checkComand = (message: proto.IMessage) => {
        const texto = message?.conversation ||
            message?.imageMessage?.caption ||
            message?.extendedTextMessage?.text ||
            message.videoMessage?.caption ||
            message.templateButtonReplyMessage?.selectedId ||
            message.buttonsResponseMessage?.selectedButtonId
        if (!texto) {
            return
        }
        if (texto[0] != this.prefix) {
            return false
        } else return this.parameters(texto)

    }
    parameters = (comand: string) => {

        if (!comand) {
            return [comand]
        }
        const array = comand.split(" ").filter((x) => { return x.length > 1 })
        let parametro = array.filter(element => element != array[0])

        return [array[0], parametro.toString().replace(/,/g, " ")]
    }


    sendText = async (txt: string) => {
        return this.socket.sendMessage(this.remoteJid, { text: txt })
    }
    //responder mensagem
    reply = async (txt: string) => {
        return this.socket.sendMessage(this.remoteJid, { text: txt }, { quoted: this.webMessage })
    }
    //enviar imagem
    sendImage = async (pathOrBuffer: Buffer | string, caption?: string, isReply?: boolean) => {
        const image = pathOrBuffer instanceof Buffer ? pathOrBuffer : fs.readFileSync(pathOrBuffer);
        const params = {
            image,
            caption: caption
        }
        let options = isReply == true ? { quoted: this.webMessage } : {}
        return this.socket.sendMessage(this.remoteJid, params, options)
    }

}