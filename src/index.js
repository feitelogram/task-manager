const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')

const { log } = console


const app = express() 
const port = process.env.PORT

app.use(express.json())

//users

app.use(userRouter)

//tasks

app.use(taskRouter)

//setting port

app.listen(port, ()=> log(`Server is up on Port ${port}`))

