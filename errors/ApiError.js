class ApiError {
    constructor(code, message, objectMessage) {
        this.code = code
        this.message = message
        this.objectMessage = objectMessage
    }

    static badRequest(error) {        
        let errorArray = []
        if (!error?.length) {
            return new ApiError(400, 'bad_request')
        } else {
            for (const element of error) {
                switch (element.type) {
                    case 'notNull Violation':
                        errorArray.push({ type: element.type, field: element.path })
                        break;
                    case 'Validation error':
                        errorArray.push({ type: element.type, field: element.path })
                        break;
                    default:
                        errorArray.push({ type: 'unknown_error', field: element.path })
                        break;
                }
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
    static invalidToken() {
        return new ApiError(401, 'invalid_token')
    }
    static invalidTokenPermissions() {
        return new ApiError(401, 'invalid_token_permissions')
    }
    static invalidDelete() {
        return new ApiError(401, 'invalid_delete')
    }
    static invalidUpdate() {
        return new ApiError(401, 'invalid_update')
    }
}

module.exports = ApiError