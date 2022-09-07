import WebSocket from 'ws'
function onError(ws:any, err:Error) {
    console.error(`onError: ${err.message}`);
}
 
function onMessage(ws:any, data:Error) {
    console.log(`onMessage: ${data}`);
    ws.send(`recebido!`);
}
 
function onConnection(ws:any, req:Request) {
    ws.on('message', (data: any) => onMessage(ws, data));
    ws.on('error', (error: Error)=> onError(ws, error));
    console.log(`onConnection`);
}
 
 export default (server:any) => {
    const wss = new WebSocket.Server({
        server
    });
 
    wss.on('connection', onConnection);
    
    console.log(`Smaug acordou! e quer ouro!`);
    return wss;
}