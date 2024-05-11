class SuccessResponse {
    constructor(description, data, status) {
        this.statusCode = status;
        return {
            success: "true",
            description: description,
            data: data,
        };
    }
}

module.exports = SuccessResponse;
