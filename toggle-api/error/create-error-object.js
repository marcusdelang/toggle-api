module.exports = function (message, code, error) {
    let errorObject = {
        message: message,
        code: code,
        error: error
    }
    return errorObject;
}