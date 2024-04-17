/*const catchAsync = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}*/
const catchAsync = func => async (req, res, next) => {
    try {
        await func(req, res)
    } catch (error) {
        return next(error)
    }
}
export default catchAsync;

