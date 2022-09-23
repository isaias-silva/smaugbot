import http from 'http'
import express from 'express'
import path from 'path'




export class App {
    private io;
    private app;
    private server;
    private port;
    constructor(port: number) {
        this.port=process.env.PORT || port
        this.app = express()
        this.server = new http.Server(this.app);
        this.io = require('socket.io')(this.server);
    }
    start=()=>{
        this.routesAndConfig()
        this.webscsocketCommunication()
        this.server.listen(this.port,()=>{console.log(`server on in port ${8080}`)})
    }
   private routesAndConfig=()=>{
        this.app.set("view engine", "ejs")
        this.app.get('/', (req, res) => {
            res.render('index.ejs')
        })
    }
    private webscsocketCommunication=()=>{
        this.io.on('connection', function (socket: any) {
            console.log('connected')
            socket.on('msg', function (msg: any) {
                console.log(msg)
            });
        });
    }

}