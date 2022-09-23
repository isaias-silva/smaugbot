import { app, BrowserWindow, nativeImage } from 'electron'
import { App } from './io/WebSocket';


let mainwindow;
const server=new App(8080)
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


 