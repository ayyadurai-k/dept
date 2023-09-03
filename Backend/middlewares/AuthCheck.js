const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const staffs= require('../models/staff.mdl');
const students = require('../models/student.mdl');

// * install cookie-parser*
exports.staffAuthCheck=async(req,res,next)=>{
    // get token using cookie

 
    const jwtToken = req.cookies.StaffJwtToken;
  
    //check token exits or not
  if (!jwtToken) {
      return res.status(400).json({
        success: false,
        message : 'Login First to Access Your Profile',
         ERR_CODE: "TOKEN_NOT_EXISTS"
        })
    }
     
    let data;
    //verify token if correct data is returned
    jwt.verify(jwtToken, process.env.JWT_SECRET_KEY,(err,decoded)=>{
          if(err){
            return next(new ErrorHandler("Wrong or Expired Token Is Not Allowed Token is Not Allowed please login again",400))
          }
          else{
             data = decoded;
          }
    });
     
    /*
      data ={ id:xxxxxxxxx.....,....,...}
      the data contains mongodb object id
    */
       
    //check token correct or wrong
    if(!data){
        return next(new ErrorHandler("Wrong Token is Not Allowed",400))
    }

    //store userId to req
    const user=await staffs.findById(data.id);

    //wrong mongodb id
    if(!user){
      return next(new ErrorHandler("Wrong DB Id is Not Allowed",400))
    }
    req.user=user

    //calling next Middleware in this "getStudentDashboard" in called
    next();
}

exports.studentAuthCheck=async(req,res,next)=>{
  // get token using cookie
 //check which request students or staffs

  const jwtToken = req.cookies.StudentJwtToken;



  //check token exits or not
  if(!jwtToken){
      return next(new ErrorHandler("Without Token Not Allowed",403))
  }

  let data;
  //verify token if correct data is returned
  jwt.verify(jwtToken, process.env.JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
          return next(new ErrorHandler("Wrong or Exxpired Token Is Not Allowed Token is Not Allowed please login again",400))
        }
        else {
           data = decoded;
        }
  });
  /*
    data ={ id:xxxxxxxxx.....,....,...}
    the data contains mongodb object id
  */
     
  //check token correct or wrong
  if(!data){
      return next(new ErrorHandler("Wrong Token is Not Allowed",400))
  }

  //store userId to req
  const user=await students.findById(data.id);

  //wrong mongodb id
  if(!user){
    return next(new ErrorHandler("Wrong DB Id is Not Allowed",400))
  }
  
  req.user=user

  //calling next Middleware in this "getStudentDashboard" in called
  next();
}
