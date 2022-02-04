class ApiError {
    constructor(code, message) {
        this.code = code
        this.message = message
    }

    static badRequest(error) {
        //Do not use in production
        console.error({ error: error });
        return new ApiError(400, 'bad_request')
    }
    static missingFields() {
        return new ApiError(400, 'missing_fields')
    }
    static noDataFound() {
        return new ApiError(404, 'no_data_found')
    }
}

module.exports = ApiError