const express = require('express')
const router = express.Router()
const Model = require('../models/Order')
const ApiError = require('../errors/ApiError')
const authorization = require('../middlewares/authorization');

router.get('/', async (req, res, next) => {
    try {
        const request = await Model.findAll()

        if (!request[0]) return next(ApiError.noDataFound())

        return res.status(200).json({ data: request })

    } catch (error) {
        next(ApiError.badRequest(error.errors))
    }
})

router.get('/id/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const request = await Model.findByPk(id)

        if (!request) return next(ApiError.noDataFound())

        return res.status(200).json({ data: request.toJSON() })

    } catch (error) {
        next(ApiError.badRequest(error.errors))
    }
})

router.post('/insert', async (req, res, next) => {
    try {
        const { UserId, total, totalTax, address, locale, zipcode, observation, fiscalNumber } = req.body

        const dataObject = {
            UserId: UserId,
            total: total,
            totalTax: totalTax,
            address: address,
            locale: locale,
            zipcode: zipcode,
            observation: observation,
            fiscalNumber: fiscalNumber
        }

        const request = await Model.create(dataObject)

        return res.status(201).json({ data: request.toJSON() })
    } catch (error) {
        return next(ApiError.badRequest(error.errors))
    }
})


router.put('/update', authorization(['ADMIN', 'STAFF']), async (req, res, next) => {
    try {
        const { id, total, totalTax, address, locale, zipcode, observation, fiscalNumber } = req.body

        const dataObject = {
            total: total,
            totalTax: totalTax,
            address: address,
            locale: locale,
            zipcode: zipcode,
            observation: observation,
            fiscalNumber: fiscalNumber
        }

        const request = await Model.update(dataObject, { where: { id: id }, returning: true })

        if (request[0] === 0) return next(ApiError.invalidUpdate())

        return res.status(200).json({ data: request[1] })

    } catch (error) {
        return next(ApiError.badRequest(error.errors))
    }
})

router.delete('/delete', authorization(['ADMIN', 'STAFF']), async (req, res, next) => {
    try {
        const { id } = req.body

        const request = await Model.destroy({ where: { id: id } })

        if (request === 0) return next(ApiError.invalidDelete())

        return res.status(200).json({ data: req.t('row_deleted') })

    } catch (error) {
        return next(ApiError.badRequest(error.errors))
    }
})

module.exports = router