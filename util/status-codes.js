let errorMessages = require('./error-messages')

module.exports = {
    OK: () => {
        return {
            code: 200,
            name: 'OK',
            message: ''
        }
    },
    BadRequest: () => {
        return {
            code: 400,
            name: 'BadRequest',
            message: errorMessages.badRequest()
        }
    },
    Unauthorized: () => {
        return {
            code: 401,
            name: 'Unauthorized',
            message: ''
        }
    },
    Forbidden: () => {
        return {
            code: 403,
            name: 'Forbidden',
            message: ''
        }
    },
    NotFound: () => {
        return {
            code: 404,
            name: 'NotFound',
            message: errorMessages.notFound()
        }
    },
    InternalServerError: () => {
        return {
            code: 500,
            name: 'InternalServerError',
            message: errorMessages.internalServerError()
        }
    },
    DatabaseError: () => {
        return {
            code: 500,
            name: 'DatabaseError',
            message: ''
        }
    }
}
