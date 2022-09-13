import { proto } from "@adiwajshing/baileys"
import { Socket } from "./socket"
import fs from 'fs'
import { IbotData } from "./interfaces/IbotData"

export class Bot {
    name: string;
    prefix: string;
    constructor(name: string, prefix: string) {
        this.name = name;
        this.prefix = prefix;
    }
    start = async () => {
        const socket = await new Socket().connect()
        socket.ev.on("messages.upsert", async (message) => {
            const [webMessage] = message.messages
            const botData = await this.getBotData(socket, webMessage)
            const { sendImage, sendText, reply, remoteJid, participant } = botData
            if (!webMessage.message) {
                return
            }
            const comand = this.checkComand(webMessage.message)
            if (!comand) {
                return
            }

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
    getBotData = async (socket: any, webMessage: proto.IWebMessageInfo): Promise<IbotData> => {
        const { remoteJid, participant } = webMessage.key

        const sendText = async (txt: string) => {
            return socket.sendMessage(remoteJid, { text: txt })
        }
        //responder mensagem
        const reply = async (txt: string) => {
            return socket.sendMessage(remoteJid, { text: txt }, { quoted: webMessage })
        }
        //enviar imagem
        const sendImage = async (pathOrBuffer: Buffer | string, caption?: string, isReply?: boolean) => {
            const image = pathOrBuffer instanceof Buffer ? pathOrBuffer : fs.readFileSync(pathOrBuffer);
            const params = {
                image,
                caption: caption
            }
            let options = isReply == true ? { quoted: webMessage } : {}
            return socket.sendMessage(remoteJid, params, options)
        }
        return {
            socket,
            remoteJid,
            participant,
            sendImage,
            sendText,
            reply
        }
    }
}