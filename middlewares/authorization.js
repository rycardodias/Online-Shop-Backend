const jwt = require('jsonwebtoken')
const ApiError = require('../errors/ApiError')

module.exports = (permissionRequired) => {
    return (req, res, next) => {
        try {
            const token = req.session.token
            if (!token) next(ApiError.invalidToken())

            const tokenObj = jwt.verify(token, process.env.TOKEN_SECRET)
            
            let exists = false
            permissionRequired.map(item => {
                for (const element of tokenObj.permissions) {
                    if (element === item) exists = true
                }
            })

            if (exists) {
                next()
            } else {
                next(ApiError.invalidTokenPermissions())
            }
        }
        catch (error) {
            next(ApiError.invalidTokenPermissions())
        }
    }
}