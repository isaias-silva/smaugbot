import express from 'express'
import cors from 'cors'
export class App {
    private port;
    private server;
    constructor(port: number) {
        this.port = port
        this.server = express()
    }
    private config = () => {
        this.server.use(express.json())
        this.server.use(cors())
    }
    private routes=()=>{
        this.server.get('/',(res,req)=>{
            req.send('hello')
        })
    }
    
    start = () => {
        this.config()
        this.routes()
        this.server.listen(this.port, () => { console.log(`server on in ${this.port}`) })
    }


}