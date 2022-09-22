import http from 'http'
import express from 'express'
import path from 'path'
const PORT =process.env.PORT || 8080

const app = express()
const server = new http.Server(app)
const io = require('socket.io')(server);



app.set("view engine","ejs")
app.get('/', (req, res) => {
res.render('index.ejs')
})
io.on('connection', function (socket: any) {
    console.log('connected')
    socket.on('msg', function (msg: any) {
       console.log(msg)
    });
});



server.listen(PORT, () => { console.log(PORT) })

export default server