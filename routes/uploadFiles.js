const express = require('express')
const router = express.Router()
const util = require('util')
const path = require('path')
const fs = require('fs')
const ApiError = require('../errors/ApiError')
const resizeImg = require('resize-img');


const { v4 } = require('uuid')

router.get("/:file", async (req, res, next) => {
    try {
        const dir = __dirname
        const URL = dir.replace("routes", "") + "public/uploads/"

        const img = URL + req.params.file

        fs.access(img, fs.constants.F_OK, err => {
            return err //next(ApiError.badRequest(err))
        })

        fs.readFile(img, function (err, content) {
            if (err) {
                next(ApiError.noDataFound())
            } else {
                res.writeHead(200, { "Content-type": "image/jpg" })
                res.end(content)
            }
        })
    } catch (error) {
        return next(ApiError.badRequest(error))
    }
})
router.post("/create", async (req, res) => {
    try {
        const file = req.files.file
        const fileName = file.name
        const size = file.data.length
        const extension = path.extname(fileName)

        const allowedExtensions = /png|jpeg|jpg|gif/


        if (!allowedExtensions.test(extension)) throw "Unsupported extension!"
        if (size > 1024 * 1024 * 5) throw "File must be less than 5MB"

        const fileNameSaved = v4() + extension
        const dir = __dirname
        const URL = dir.replace("routes", "") + "public/uploads/"

        util.promisify(file.mv)(URL + fileNameSaved).then(async () => {
            try {
                // fs.writeFileSync(URL + fileNameSaved, file);
                // [requiredSizes].forEach(async (value) => {
                // if (sizes[value]) {

                const imageResized = await resizeImg(fs.readFileSync(URL + fileNameSaved), {
                    width: 1920,
                    height: 1080
                })

                fs.writeFileSync(URL + fileNameSaved, imageResized);
                // }
                // })
            } catch (error) {
                console.log(error)
                return res.status(500).json({ error: error })
            }
        })
            .then(() => { }
                //fs.unlinkSync(URL + fileNameSaved)
            )

        return res.status(200).json({ data: fileNameSaved })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
});

module.exports = router