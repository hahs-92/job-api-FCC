const { StatusCodes } = require('http-status-codes')
//errors
// const { CustomAPIError } = require('../errors')

const errorHandlerMiddleware = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later'
    }

    // if (err instanceof CustomAPIError) {
    //     return res.status(err.statusCode).json({ msg: err.message })
    // }

    //si no se sumistran los valores en register
    if(err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
    }

    //error arojado por mongoose
    //si ya existe el email
    if(err.code && err.code === 11000) {
        customError.statusCode = 400
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    }

    //si el id no es de tipo ID
    if(err.name === 'CastError') {
        customError.statusCode = 404
        customError.msg= `No item found with id: ${ err.value}`
    }

    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
