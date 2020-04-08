const mongoose = require('mongoose')

const { log } = console

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'
const options = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}

mongoose.connect(connectionURL, options)



