import { app, BrowserWindow, nativeImage } from 'electron'
import { Bot } from './bot/Bot';
import { App } from './io/WebSocket';


let mainwindow;
const server = new App(8082)
server.start()



