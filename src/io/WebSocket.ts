import http from 'http'
import express from 'express'
import path from 'path'
import { Bot } from '../bot/Bot';
import { fstat } from 'original-fs';




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
        this.bot = new Bot('smaug', '!', this.io)
    }
    start = () => {
    
        this.routesAndConfig()
        this.webscsocketCommunication()
        this.server.listen(this.port, () => { console.log(`server on in port ${this.port}`) })
    }
    private routesAndConfig = () => {
        this.app.use(express.static('./public'));

        this.app.set("view engine", "ejs")
        this.app.get('/', (req, res) => {

            this.bot.start()
            res.render('index.ejs')
        })
    }
    private webscsocketCommunication = () => {
        this.io.on('connection', function (socket: any) {
            console.log('connected')
            socket.on('msg', function (msg: any) {
                console.log(msg)
            });
        });
    }

}