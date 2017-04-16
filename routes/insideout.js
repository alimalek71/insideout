var express = require('express')
var router = express.Router()
let models = require('../modules/database')
let statusCodes = require('../util/status-codes')
let errorMessages = require('../util/error-messages')


let usernameHeader = 'username'
let offsetHeader = 'offset'
let countHeader = 'count'

router.get('/', (req, res, next) => {
    let resposne = { logs: [], status: statusCodes.OK() }

    try {
        if (!req.get(usernameHeader)) {
            let err = new Error('Invalid or Missing ' + usernameHeader)
            err.status = statusCodes.BadRequest()
            throw err
        }

        let offset = 0
        let limit = 10
        if (req.get(offsetHeader))
            offset = Number(req.get(offsetHeader)) || offset
        if (req.get(countHeader))
            limit = Number(req.get(countHeader)) || limit

        return models.LogTime.findAll({
            where: {
                username: req.get(usernameHeader)
            },
            offset: offset,
            limit: limit
        }).then(logTimes => {
            if (logTimes)
                for (var i = 0; i < logTimes.length; i++)
                    resposne.logs.push(models.getter.getLogTime(logTimes[i]))
            else {
                let err = new Error(errorMessages.databaseError)
                err.status = statusCodes.BadRequest()
                throw err
            }

            res.status(resposne.status.code || 500)
                .json(resposne)
        }).catch(err => {
            if (error.status)
                resposne = { status: error.status }
            else
                resposne = { status: statusCodes.InternalServerError }

            res.status(resposne.status.code)
                .json(resposne)
        })

    } catch (error) {
        if (error.status)
            resposne = { status: error.status }
        else
            resposne = { status: statusCodes.InternalServerError }

        resposne.status.message = error.message
    }

    res.status(resposne.status.code || 500)
        .json(resposne)
})

router.post('/', (req, res, next) => {
    let resposne = { log: null, status: statusCodes.OK() }

    try {
        if (!req.body.username || !req.body.logTime || isNaN(Number(req.body.logTime))) {
            let err = new Error(`Invalid or Missing ${!req.body.username ? 'username' : ''} ${!req.body.logTime || isNaN(Number(req.body.logTime)) ? 'logTime' : ''}`)
            err.status = statusCodes.BadRequest()
            throw err
        }

        return models.LogTime.create({
            logTime: req.body.logTime,
            username: req.body.username
        }).then((createdLogTime) => {
            if (createdLogTime) {
                resposne.log = models.getter.getLogTime(createdLogTime)

                res.status(resposne.status.code || 500)
                    .json(resposne)

                return
            }

            let err = new Error(errorMessages.databaseError)
            err.status = statusCodes.InternalServerError
            throw err
        }).catch((error) => {
            if (error.status)
                resposne = { status: error.status }
            else
                resposne = { status: statusCodes.InternalServerError }

            res.status(resposne.status.code)
                .json(resposne)
        })

    } catch (error) {
        if (error.status)
            resposne = { status: error.status }
        else
            resposne = { status: statusCodes.InternalServerError }

        resposne.status.message = error.message
    }

    res.status(resposne.status.code || 500)
        .json(resposne)
})


router.delete('/', (req, res, next) => {
    let resposne = { status: statusCodes.OK() }

    try {
        if (!req.body.id && !req.body.username && !Number.isInteger(Number(req.body.id))) {
            let err = new Error("Invalid or Missing id")
            err.status = statusCodes.BadRequest()
            throw err
        }

        return models.LogTime.destroy({
            where: {
                id: req.body.id,
                username: req.body.username
            },
            limit: 1
        }).then(deleted => {
            if (deleted)
                res.status(resposne.status.code)
                    .json(resposne)
            else {
                let err = 
                new Error(`There is no record with id: ${req.body.id} and username: ${req.body.username}`)
                err.status = statusCodes.BadRequest()
                throw err
            }
        }).catch(err => {
            if (error.status)
                resposne = { status: error.status }
            else
                resposne = { status: statusCodes.InternalServerError }

            res.status(resposne.status.code)
                .json(resposne)
        })

    } catch (err) {
        if (error.status)
            resposne = { status: error.status }
        else
            resposne = { status: statusCodes.InternalServerError }

        resposne.status.message = error.message
    }

    res.status(resposne.status.code || 500)
        .json(resposne)
})

module.exports = router