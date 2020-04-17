const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const user1Id = new mongoose.Types.ObjectId()
const user1 = {
    _id: user1Id,
    name: "Mike",
    email: "Mike@example.com",
    password: "56What!!",
    tokens: [{
        token: jwt.sign({_id: user1Id}, process.env.JWT_SECRET)
    }]
}

const user2Id = new mongoose.Types.ObjectId()
const user2 = {
    _id: user2Id,
    name: "Nic",
    email: "nic@example.com",
    password: "myHooose112",
    tokens: [{
        token: jwt.sign({_id: user2Id}, process.env.JWT_SECRET)
    }]
}


const task1 = {
    _id: new mongoose.Types.ObjectId(),
    description: "Create a task in Db.js",
    completed: false,
    owner: user1Id
}

const task2 = {
    _id: new mongoose.Types.ObjectId(),
    description: "Create a second task in Db.js",
    completed: true,
    owner: user2._id
}

const task3 = {
    _id: new mongoose.Types.ObjectId(),
    description: "Create a third task in Db.js",
    completed: false,
    owner: user1Id
}

const setUpDB = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(user1).save()
    await new User(user2).save()
    await new Task(task1).save()
    await new Task(task2).save()
    await new Task(task3).save()
}


module.exports = {
    user1Id,
    user1,
    user2,
    user2Id,
    task1,
    setUpDB
}