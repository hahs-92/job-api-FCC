const { StatusCodes } = require('http-status-codes')
//errros
const CustomAPIError = require('./custom-api')

class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError
