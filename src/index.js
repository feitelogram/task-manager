const express = require('express')
const jwt = require('jsonwebtoken')
require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')

const { log } = console


const app = express() 
const port = process.env.PORT || 3000




app.use(express.json())

//users

app.use(userRouter)

//tasks

app.use(taskRouter)

//setting port

app.listen(port, ()=> log(`Server is up on Port ${port}`))



const myFunction = async () => {
    const secret = 'jwtisthebird'
    const token = jwt.sign({_id: 'abc123'}, secret, {expiresIn: '7 days'})
    log(token)
    const data = jwt.verify(token, secret)
    log(data)
    }


myFunction()
