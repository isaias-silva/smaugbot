import { app, BrowserWindow, nativeImage } from 'electron'
import { Bot } from './bot/Bot';
import { App } from './io/WebSocket';


let mainwindow;
const server = new App(8081)
server.start()

/*const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })
}
app.on("ready",()=>{
    mainwindow=new BrowserWindow({
        
    })
    mainwindow.loadURL(`http://localhost:8080`)
})*/


