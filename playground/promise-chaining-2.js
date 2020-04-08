require('../src/db/mongoose')
const Task = require('../src/models/task')

const { log } = console
const __id = "5e8656920ed1f5e3fe730c8e"

// Task.findByIdAndRemove("5e8505a377b52aa334c504bf")
//     .then(res => {
//         log(res)
//         return Task.countDocuments({completed: false})
//     }).then(count => log(count))

const RemoveTaskAndCount = async(id) => {
    const task = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

RemoveTaskAndCount(__id)
    .then(count => log(count))
    .catch(e => log(e))