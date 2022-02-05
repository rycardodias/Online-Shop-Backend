const ApiError = require("./ApiError")

function ApiErrorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        let errorsArray = []
        if (err.objectMessage) {
            for (const element of err.objectMessage) {
                errorsArray.push(req.t(element.type, { field: element.field }))
                // console.log(req.t(element.type, { field: element.field }));
            }
            return res.status(err.code).json({ error: errorsArray }) 
        }
        return res.status(err.code).json({ error: req.t(err.message) })
    }
    return res.status(500).json({ error: req.t('something_went_wrong') })
}

module.exports = ApiErrorHandler