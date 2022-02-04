class ApiError {
    constructor(code, message) {
        this.code = code
        this.message = message
    }

    static badRequest(error) {
        //Do not use in production
        console.error({ error: error });
        return new ApiError(400, 'Bad request!')
    }
    static missingFields() {
        return new ApiError(400, 'Missing fields!')
    }
    static noDataFound() {
        return new ApiError(404, 'No data found!')
    }
}

module.exports = ApiError