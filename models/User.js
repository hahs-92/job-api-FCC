const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//config
const { config } = require('../config/config')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6
    }
})


//middleware de mongoose
//para hashear la contraseña
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

    next()
})


//agregamos una funcion para obtener el nombre del usuario en controllers
// UserSchema.methods.getName = function () {
//     return this.name
// }


//funcion para generar el jwt
UserSchema.methods.createJWT = function () {
    return (
        jwt.sign({
            userId: this._id,
            name: this.name
        },
        config.jwtSecret,
        { expiresIn: config.jwtLifetime}
        )
    )
}


//funcion para comparar contraseña
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)

    return isMatch
}

module.exports = mongoose.model('User',UserSchema)
