import { proto } from "@adiwajshing/baileys"
import { Socket } from "./socket"
import fs from 'fs'
import { IbotData } from "./interfaces/IbotData"
export class Bot {
    start = async () => {
        const socket = await new Socket().connect()
        socket.ev.on("messages.upsert", async (message) => {
            const [webMessage] = message.messages
            const botData = await this.getBotData(socket, webMessage)
            const { sendImage, sendText, reply, remoteJid, participant } = botData
            
            
        })
    }
    checkComand=()=>{
        
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
            remoteJid,
            participant,
            sendImage,
            sendText,
            reply
        }
    }
}