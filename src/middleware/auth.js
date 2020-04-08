const { log } = console
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
   try {
       const secret = 'yomama'
       const token = req.header('authorization').replace('Bearer ', '')
       const decoded = jwt.verify(token, secret)
       const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
       if(!user) throw new Error();
       req.user = user
       next()
   } catch (e) {
       res.status(401).send({error: 'Please authenticate user.'})
   }
}

module.exports = auth