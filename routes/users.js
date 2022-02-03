const express = require('express')
const router = express.Router()
const Model = require('../models/User')

router.get('/', async (req, res) => {
    try {
        const request = await Model.findAll()

        return res.status(200).json({ data: request })
    } catch (error) {
        console.log(error);
    }
})

router.post('/insert', async (req, res) => {
    try {
        const request = await Model.create({ name: "1" })

        return res.status(200).json({ data: request })
    } catch (error) {
        console.log(error);
    }

})

module.exports = router