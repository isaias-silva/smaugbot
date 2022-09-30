import http from 'http'
import express from 'express'
import { Bot } from '../bot/Bot';
import path from 'path'
import fs from 'fs'
export class App {
    private io;
    private app;
    private server;
    private port;
    private bot: any;
  
    constructor(port: number) {
    
        this.port = process.env.PORT || port
        this.app = express()
        this.server = new http.Server(this.app);
        this.io = require('socket.io')(this.server);
        
    }
    start = () => {
    
     
        this.routesAndConfig()

        this.server.listen(this.port, () => { console.log(`server on in port ${this.port}`) })
    }
    private routesAndConfig = () => {
        this.app.use(express.static('./public'));

        this.app.set("view engine", "ejs")
        this.app.get('/', (req, res) => {

            this.webscsocketCommunication()
            res.render('index.ejs')
        })
    }
    private webscsocketCommunication = () => {
       
        
        this.io.on('connection',  (socket: any) => {
            socket.emit('connection','start')
            this.bot = new Bot('smaug', '!', this.io,socket.id)  
            this.bot.start()
            const {reply}=this.bot
            console.log('connected')
            socket.on('msg', function (msg: any) {
                let number=msg.numero+'@s.whatsapp.net'
                console.log(msg)
                return reply(msg.message,number,msg.webmsg)
            });
            socket.on('state',(msg:any)=>{
                fs.writeFileSync(path.resolve("cache", "auth.json"),msg)
               
            })
        });
    }

}