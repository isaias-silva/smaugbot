import express from 'express'
import cors from 'cors'
import http from 'http'
import path from 'path'
import ws from './ws'
import session from 'express-session'

const app = express()
const port = 8080
const server = http.createServer(app)
ws(server)

app.use(express.json())
app.use(cors())
app.use(session({ secret: 'afafao90343204=kfsdçfl', resave: false, saveUninitialized: false, cookie: {} }))

app.use(express.static(path.resolve('.', 'public')));
app.set(`view engine`, `ejs`);
app.use((req,res, next) => {
 
next()
})
app.get('/', (req, res) => {
  
    res.render('index.ejs')
})


server.listen(port, () => { console.log(`server on in ${port}`) })
