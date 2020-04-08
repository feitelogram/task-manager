const express = require('express')
require('../db/mongoose')
const Task = require('../models/task')

const taskRouter = new express.Router() 

taskRouter.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
       await task.save()
       res.status(201).send(task) 
    } catch (e) {
        res.status(400).send(e)
    }
})

taskRouter.get('/tasks', async (req, res) => {
    const tasks = await Task.find({})
    try {   
        res.send(tasks)
    } catch (e) {
        e => res.status(500).send(e) 
    }
})

taskRouter.get('/tasks/:id', async (req, res)=> {
    const _id = req.params.id
    const task = await Task.findById(_id)
    try {
        if(!task) return res.status(404).send();
        res.send(task)
    } catch (e) {
        e => res.status(500).send(e)
    }
})

taskRouter.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['description', 'completed']
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    if(!isValidOperation) return res.status(400).send({error: "Invalid attempt to update"});
    try {
        const task = await Task.findById(_id)
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

taskRouter.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if(!task) return res.status(404).send();
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = taskRouter