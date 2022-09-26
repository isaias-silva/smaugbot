import { proto } from "@adiwajshing/baileys";

export interface ImessageForBrowser{
    perfil?:string|null;
    numero?:string|null;
    message?:string|null;
    webMessage:proto.IWebMessageInfo
}