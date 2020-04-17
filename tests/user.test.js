const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { user1, user1Id, setUpDB } = require('./fixtures/db')

beforeEach(setUpDB)


test('should sign up a new user', async () => {
    const resp = await request(app).post('/users')
        .send({
            name: "Andrew",
            email: "andrew@example.com",
            password: "MyPass7777!"
        })
        .expect(201) 

    //Assert that the user was saved to db correctly

    const user = await User.findById(resp.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response

    expect(resp.body).toMatchObject({
        user: {
            name: "Andrew",
            email: "andrew@example.com"
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('MyPass7777!')
})

test('should login a user', async () => {
     const resp = await request(app).post('/users/login')
        .send({
            email: user1.email,
            password: user1.password
        })
        .expect(200)
    const user = await User.findById(resp.body.user._id)
    expect(resp.body.token).toBe(user.tokens[1].token)
})

test('should not login a non-existant user', async () => {
    await request(app).post('/users/login')
       .send({
           email: 'me@me.com',
           password: 'me123ab1!'
       })
       .expect(400)
})

test('should get profile for user', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile if unauthenticated', async () => {
    await request(app).get('/users/me')
    .send()
    .expect(401)
})

test('should delete profile for user', async () => {
    await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(user1Id)
    expect(user).toBeNull()
})

test('should not delete profile for unauthenticated user', async () => {
    await request(app).delete('/users/me')
        .send()
        .expect(401) 
})

test('should upload avatar image', async () => {
    await request(app).post('/users/me/avatar')
            .set('Authorization', `Bearer ${user1.tokens[0].token}`)
            .attach('avatar', 'tests/fixtures/profile-pic.jpg')
            .expect(200)
    const user = await User.findById(user1Id)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid user fields', async () => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({name: "Phil"})
        .expect(200)
    const user = await User.findById(user1Id)
    expect(user.name).toBe("Phil")
})

test('should not update invalid user fields', async () => {
    await request(app).patch('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({location: "Philadelphia"})
        .expect(400)
})