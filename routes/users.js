const express = require('express')
const router = express.Router()
const Model = require('../models/User')
const ApiError = require('../errors/ApiError')

router.get('/', async (req, res, next) => {
    try {
        const request = await Model.findAll()

        if (!request[0]) return next(ApiError.noDataFound())

        return res.status(200).json({ data: request })

    } catch (error) {
        next(ApiError.badRequest(error))
    }
})

router.post('/insert', async (req, res, next) => {
    try {
        const request = await Model.create({ name: "1" })

        console.log(request.toJSON());
        return res.status(200).json({ data: request })
        
    } catch (error) {
        return next(ApiError.badRequest(error))
    }

})

module.exports = router