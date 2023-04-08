import express from 'express'
import routes from './routes/index.js'

const server = express()

server.use(express.json())

const port = 5000

server.use(routes)

server.listen(port ,()=>{
    console.log(`Server running in port: ${port}`)
})