const { getYear } = require("../helpers/dateTimeHelper");
const { comparePassword, hashPassword } = require("../helpers/hashHelper");
const { generateToken } = require("../helpers/jwtHelpers");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const students = require("../models/student.mdl");
const ErrorHandler = require("../utils/ErrorHandler");
const studentAttendance =
   require("../models/attendance.mdl").studentAttendanceModel;


//for posting student username and password
//url: student/login(post)
exports.studentLoginPost = catchAsyncError(async (req, res, next) => {
   const { username, password } = req.body;
   if (!username || !password) {
      return next(new ErrorHandler("All fields are must required", 400));
   }

   //find student from database
   const student = await students.findOne({ email: username });

   if (!student) {
      return next(new ErrorHandler("Invalid Username or Password ", 400));
   }

   //check password correct or not
   //using hash compare
   if (!(await comparePassword(password, student.password))) {          
      return next(new ErrorHandler("Check username and password !", 400));
   }

   //create jwt token using id and collection name
   const token = generateToken(student._id);

   //store token using cookie
   res.cookie("StudentJwtToken", token, {
      httpOnly: true, 
      expires: new Date( Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
 } );
 
   


   res.status(200).json({
      success: true,
      token
   });
});

// url: /student/dashboard
exports.getStudentDashboard = async (req, res, next) => {
   //get student detail via req.userId
   const student = req.user;

   res.status(200).json({
      success: true,
      currentPage: "Student Dashboard",
      data: student,
   });
};

exports.getStudentsAttendanceReport = async (req, res, next) => {
   const { month } = req.params;
   const regno = req.user.regno;
   const year = getYear();
   if (!regno || !month || !year) {
      return next(
         new ErrorHandler(
            "Email and Month and Year is must required for attendance report",
            400
         )
      );
   }
   const studentAttendanceReport = await studentAttendance.find({
      regno,
      month,
      currentYear: year,
   });

   if (studentAttendanceReport.length == 0) {
      return next(new ErrorHandler("Attendance Reports Not Found !", 400));
   }


   let Present = 0, Absent = 0;

   studentAttendanceReport.forEach(({ present }) => {
      present ? Present++ : Absent++;
   })

   res.status(200).json({
      success: true,
      currentPage: "Student Attendance Report",
      data: {
         regno,
         present: Present,
         absent: Absent
      }
   });
};
// url : /student/logout
exports.studentLogout = async (req, res, next) => {
   //clear cookie
   res.cookie("StudentJwtToken", "", { httpOnly: true });

   res.status(200).json({
      success: true,
      currentPage: "Student login page",
   });
};
