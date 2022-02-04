const ApiError = require("./ApiError")

function ApiErrorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.code).json({ error: err.message })
    }
    return res.status(500).json({ error: 'Something went wrong!' })
}

module.exports = ApiErrorHandler