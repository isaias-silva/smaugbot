import express from 'express'
import wsocket from 'socket.io'
import cors from 'cors'
import http from 'http'
import ws from './ws'
const app = express()
const port = 8080
const server = http.createServer(app)
ws(server)

app.use(cors())
app.set(`view engine`, `ejs`);
app.get('/', (req, res) => {
    
    res.render('index.ejs')
})


server.listen(port, () => { console.log(`server on in ${port}`) })
