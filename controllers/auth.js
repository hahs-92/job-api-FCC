const { StatusCodes } = require('http-status-codes')
//modesl
const User = require('../models/User')



const register = async (req, res) => {

    const user = await User.create({...req.body})

    //generamos el token en ele modelo
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({
        user: { name: user.name},
        token
    })
}


const login = async (req, res) => {
    res.send('login user')
}

module.exports = {
    register,
    login
}
