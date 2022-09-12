import { proto } from "@adiwajshing/baileys";

export interface IbotData {
    remoteJid: string|null |undefined,
    participant:string |null |undefined,
    sendText: (txt: string) => Promise<proto.WebMessageInfo>
    reply: (txt: string) => Promise<proto.WebMessageInfo>
    sendImage: (pathOrBuffer: string | Buffer, caption?: string, isreply?: boolean) => Promise<proto.WebMessageInfo>
    //sendMenu: (title:string,footer:string,captionOrtext:string,image?: string | Buffer) => Promise<proto.WebMessageInfo>
}