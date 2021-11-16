const jwt = require('jsonwebtoken')
//model
const User = require('../models/User')
//errors
const { UnauthenticatedError } = require('../errors')
//config
const { config } = require('../config/config')

const auth = async (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, config.jwtSecret)

        //attach the user to the job routes
        req.user = {
            userId: payload.userId
        }

        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }
}


module.exports = auth
