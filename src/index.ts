import express from 'express'
import cors from 'cors'
import http from 'http'
import path from 'path'
import ws from './ws'
const app = express()
const port = 8080
const server = http.createServer(app)
ws(server)
app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve('.', 'public')));
app.set(`view engine`, `ejs`);

app.get('/', (req, res) => {

    res.render('index.ejs')
})


server.listen(port, () => { console.log(`server on in ${port}`) })
