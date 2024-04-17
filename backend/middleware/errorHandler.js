const errorHandler = (error, req, res, next) => {
    const { statusCode = 500, message = "It went terribly wrong" } = error;
    res.json({ status: statusCode, message: message });
}

export default errorHandler