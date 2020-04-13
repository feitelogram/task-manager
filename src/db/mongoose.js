const mongoose = require('mongoose') 

const connectionURL = process.env.MONGODB_URL
const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
}

mongoose.connect(connectionURL, options)



