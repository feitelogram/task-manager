require('../src/db/mongoose')
const User = require('../src/models/user')

const { log } = console

const __id = '5e865505e94f87e37abfe66f'

// User.findByIdAndUpdate(__id, {age: 32})
//     .then(user => {
//         log(user)
//         return User.countDocuments({age: 32})
//     }).then(count => log(count))


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    log("User: ", user)
    log("Count: ", count)
}

updateAgeAndCount(__id, 33)

