class ApiError {
    constructor(code, message, objectMessage) {
        this.code = code
        this.message = message
        this.objectMessage = objectMessage
    }

    static badRequest(error) {
        let errorArray = []
        //Do not use in production
        for (const element of error) {
            switch (element.type) {
                case 'notNull Violation':
                    errorArray.push({ type: element.type, field: element.path })
                    break;
                case 'Validation error':
                    errorArray.push({ type: element.type, field: element.path })
                    break;
                default:
                    break;
            }
        }

        return new ApiError(400, 'bad_request', errorArray)
    }
    static missingFields() {
        return new ApiError(400, 'missing_fields')
    }
    static noDataFound() {
        return new ApiError(404, 'no_data_found')
    }
}

module.exports = ApiError