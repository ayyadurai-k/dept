const error =(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    let message;
    //check enviroment
    if(process.env.APP_ENV=="development"){
        res.status(err.statusCode).json({
            success : false,
            message : err.message,
            stack : err.stack
        })
    }

    if(process.env.APP_ENV=="production"){

        if(err.code==11000){
            message = Object.keys(err.keyValue).map(key=>{
                return `Duplicate ${key} Please Check`
            })
        }

        if(err.name=="ValidationError"){
           message =  Object.keys(err.errors).map(key=>{
            return err.errors[key].message;
            })
        }


        res.status(err.statusCode).json({
            success : false,
            message : message || err.message
        })
    }

}

module.exports=error;