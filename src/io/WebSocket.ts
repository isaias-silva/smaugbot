import http from 'http'
import express from 'express'
import { Bot } from '../bot/Bot';
import path from 'path'
import fs from 'fs'
import session from 'express-session';

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
      this.app.use(session({secret:'sdçfkwsokwkwçpkfçwsdfgl',saveUninitialized:true,resave:true}))
        this.app.set("view engine", "ejs")
        this.app.get('/start', (req, res) => {

            console.log(req.session.id)
            this.webscsocketCommunication(req)
            res.render('index.ejs')
        })
    }
    private webscsocketCommunication = (req:Request | any) => {
       
        
        this.io.on('connection',  (socket: any) => {
        
            socket.emit('connection','start')
            this.bot = new Bot('smaug', '!', this.io,socket.id)  
            socket.on('controlstart',(key:any)=>{
               if(!key){
                socket.emit('localstore',req.session.id)
                this.bot.start(req.session.id)
            }else{
                this.bot.start(key)
            }
               
               
                
            })
            const {reply}=this.bot
            console.log('connected')
            socket.on('msg', function (msg: any) {
                let number=msg.numero+'@s.whatsapp.net'
                console.log(msg)
                return reply(msg.message,number,msg.webmsg)
            });
          
        });
    }

}