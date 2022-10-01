import { proto } from "@adiwajshing/baileys"
import { Socket } from "./Socket"
import fs from 'fs'
import { IbotData } from "../interfaces/IbotData"
import path from 'path'
import { ImessageForBrowser } from "../interfaces/ImessageForBrowser"

export class Bot implements IbotData {
    name: string;
    prefix: string;
    socket: any;
    webMessage: proto.WebMessageInfo | undefined
    remoteJid: string | undefined | null
    participant: string | null | undefined;
    io: any
    id:any
    constructor(name: string, prefix: string, io: any,id:any) {
        this.name = name;
        this.prefix = prefix;
        this.io = io
      this.id=id;
    }
    start = async (key:any) => {
     
        const{socket,state} = await new Socket().connect(this.io,this.id,key)
        this.socket=socket
       
        this.socket.ev.on("messages.upsert", async (message: any) => {

            this.webMessage = message.messages[0]

            this.remoteJid = this.webMessage?.key.remoteJid
            this.participant = this.webMessage?.key.participant

            if (this.webMessage?.message && !this.participant && this.webMessage.key.fromMe) {
              const msg=this.webMessage.message.conversation || 
              this.webMessage.message.extendedTextMessage?.text ||
              this.webMessage.message.imageMessage?.caption ||
              this.webMessage.message.documentMessage?.caption||
              this.webMessage.message.videoMessage?.caption
              if(!msg){return}
              let img=await this.socket.profilePictureUrl(this.remoteJid, "preview") 
              const msgBrow: ImessageForBrowser = {
                    perfil: img?img:'https://img1.gratispng.com/20180624/ivq/kisspng-business-organization-computer-software-tom-clancy-unknown-person-5b2f72c6649235.833799281529836230412.jpg',
                    numero:this.remoteJid?.split('@')[0],
                    nome:this.webMessage.pushName,
                    message: msg,
                    webMessage: this.webMessage
                }
                
                this.io.emit('msgTxt', msgBrow)
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


    sendText = async (txt: string,remoteJid:string) => {
        return this.socket.sendMessage(remoteJid, { text: txt })
    }
    //responder mensagem
    reply = async (txt: string,remoteJid:string,webMessage:proto.IWebMessageInfo) => {
        console.log(txt)
        console.log(remoteJid)
        console.log(webMessage)
        return this.socket.sendMessage(remoteJid, { text: txt }, { quoted: webMessage })
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