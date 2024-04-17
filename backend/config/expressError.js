class expressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statuscode = statusCode;
    }
}

export default expressError;