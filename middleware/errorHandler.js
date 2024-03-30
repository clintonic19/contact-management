const { constants } = require("../constants")

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    // res.json({ Message: err.message, stackTrace: err.stack });

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "VALIDATION ERROR", Message: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "NOT FOUND", Message: err.message, stackTrace: err.stack });

        case constants.FORBIDDEN:
            res.json({ title: "FORBIDDEN:", Message: err.message, stackTrace: err.stack });

        case constants.UNAUTHORIZED:
            res.json({ title: "UNAUTHORIZED:", Message: err.message, stackTrace: err.stack });

        case constants.SERVER_ERROR:
            res.json({ title: "SERVER ERROR:", Message: err.message, stackTrace: err.stack });

        default:
            console.log("No Error Found");
            break;
    }
};

module.exports = errorHandler;