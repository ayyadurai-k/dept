const ErrorHandler = require("../utils/ErrorHandler");


exports.hodCheck = (req,res,next) => {
    const user = req.user;
    if (!(user.position === "HOD")) {
        return next(new ErrorHandler("Only HOD Allowed Sorry...!",400))
    }

    next();
}
