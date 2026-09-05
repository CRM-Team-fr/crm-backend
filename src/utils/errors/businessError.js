class BusinessError extends Error {

    constructor(message, statusCode) {

        super(message);

        this.name = "BusinessError";

        this.statusCode = statusCode;

    }

}

module.exports = BusinessError;