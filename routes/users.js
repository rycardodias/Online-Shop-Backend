const express = require('express')
const router = express.Router()
const Model = require('../models/User')
const ApiError = require('../errors/ApiError')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const authorization = require('../middlewares/authorization');

router.get('/', authorization(['USER']), async (req, res, next) => {
    try {
        const request = await Model.findAll()

        if (!request[0]) return next(ApiError.noDataFound())

        return res.status(200).json({ data: request })

    } catch (error) {
        next(ApiError.badRequest(error.errors))
    }
})

router.post('/insert', async (req, res, next) => {
    try {
        const { email, password, name } = req.body

        const dataObject = {
            email: email,
            password: bcrypt.hashSync(password, 10),
            name: name
        }
        const request = await Model.create(dataObject)

        const token = await jwt.sign({
            id: request.id,
            permissions: [request.permission]
        }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 })

        req.session.token = token

        return res.status(201).json({ data: token })
    } catch (error) {
        return next(ApiError.badRequest(error.errors))
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body

        const request = await Model.findOne({ where: { email: email } })

        if (!bcrypt.compare(password, request.password)) next(ApiError.noDataFound())

        const token = await jwt.sign({
            id: request.id,
            permission: request.permission,
        }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 })

        req.session.token = token

        return res.status(200).json({ data: token })

    } catch (error) {
        return next(ApiError.badRequest(error.errors))
    }
})

module.exports = router