const express = require('express')
const router = express.Router()
const Model = require('../models/User')
const ApiError = require('../errors/ApiError')

router.get('/', async (req, res, next) => {

    try {
        // const translation = (req.t('error'))
        // console.log(translationa);
        const request = await Model.findAll()

        if (!request[0]) return next(ApiError.noDataFound())

        return res.status(200).json({ data: request })

    } catch (error) {
        next(ApiError.badRequest(error))
    }
})

router.post('/insert', async (req, res, next) => {
    try {
        const { name } = req.body

        const dataObject = {
            name: name
        }
        const request = await Model.create(dataObject)

        return res.status(200).json({ data: request.toJSON() })
    } catch (error) {
        return next(ApiError.badRequest(error))
    }
})

module.exports = router