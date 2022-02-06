const express = require('express')
const router = express.Router()
const Model = require('../models/User')
const ApiError = require('../errors/ApiError')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const authorization = require('../middlewares/authorization');

router.get('/', authorization(['ADMIN']), async (req, res, next) => {
    try {
        const request = await Model.findAll({ exclude: ['password'] })

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
            permissions: [request.permission],
        }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 })

        req.session.token = token

        return res.status(200).json({ data: token })

    } catch (error) {
        return next(ApiError.badRequest(error.errors))
    }
})

router.put('/change-password', async (req, res, next) => {
    try {
        const { email, password, newPassword } = req.body

        const request = await Model.findOne({ email: email })

        if (!await bcrypt.compare(password, request.password)) return next(ApiError.noDataFound())

        const update = await Model.update({ password: bcrypt.hashSync(newPassword, 10) }, { where: { email: email } })

        if (update[0] === 0) return next(ApiError.invalidUpdate())

        return res.status(200).json({ data: req.t('password_changed') })

    } catch (error) {
        return next(ApiError.badRequest(error.errors))
    }
})

module.exports = router