import { proto } from "@whiskeysockets/baileys";

export interface IbotData {
    socket:any,
    remoteJid: string|null |undefined,
    participant:string |null |undefined,
    sendText: (txt: string,remoteJid:string) => Promise<proto.WebMessageInfo>
    reply: (txt: string,remoteJid:string,webMessage:proto.IWebMessageInfo) => Promise<proto.WebMessageInfo>
    sendImage: (pathOrBuffer: string | Buffer, caption?: string, isreply?: boolean) => Promise<proto.WebMessageInfo>
    //sendMenu: (title:string,footer:string,captionOrtext:string,image?: string | Buffer) => Promise<proto.WebMessageInfo>
}