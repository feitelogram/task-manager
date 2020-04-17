const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const Task = require('../src/models/task')
const { user1, user1Id, setUpDB, task1, user2 } = require('./fixtures/db')

beforeEach(setUpDB)

test('should create task for user', async () => {
    const resp = await request(app).post('/tasks')
            .set('Authorization', `Bearer ${user1.tokens[0].token}`)
            .send({description: "Get a second jest suite working."})
            .expect(201)
    const task = await Task.findById(resp.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('should get all tasks for a user', async () => {
    const resp = await request(app).get('/tasks')
                    .set('Authorization', `Bearer ${user1.tokens[0].token}`)
                    .expect(200) 
    const tasks = await Task.find({owner: user1Id})
    expect(resp.body.length).toEqual(tasks.length)
})

test('users should not be able to delete other users tasks', async () => {
    await request(app).delete(`/tasks/${task1._id}`)
            .set('Authorization', `Bearer ${user2.tokens[0].token}`)
            .expect(404)
    const task = await Task.findById(task1._id)
    expect(task).not.toBeNull()
})