import express from 'express'
import wss from './wss'
const server= express()
const port=8080

server.listen(port,()=>{console.log(`server on in ${port}`)})

wss(server)