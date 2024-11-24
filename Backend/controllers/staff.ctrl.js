const { hashPassword, comparePassword } = require("../helpers/hashHelper");
const { generateToken } = require("../helpers/jwtHelpers");
const { Navigator } = require("node-navigator");
const { getDate, getYear } = require("../helpers/dateTimeHelper");
const {
  getStudents,
  giveStudentAttendance,
  giveStaffAttendance,
  convertAttendance,
  checkUpdateOrNot,
} = require("../helpers/attendanceHelpers");
const puppeteer = require("puppeteer"); // For generating PDFs/images

const staffs = require("../models/staff.mdl");
const students = require("../models/student.mdl");

const studentAttendance =
  require("../models/attendance.mdl").studentAttendanceModel;
const staffAttendance =
  require("../models/attendance.mdl").staffAttendanceModel;

const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const { checkLocation } = require("../helpers/locationHelper");

//posting username and password
//url : /staff/login(post)

exports.staffLoginPost = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorHandler("All fields are must required !", 400));
  }

  //find user from database
  const staff = await staffs.findOne({ email: username });

  if (!staff) {
    return next(new ErrorHandler("Ivalid username or password !", 400));
  }

  //compare password
  if (!(await comparePassword(password, staff.password))) {
    return next(new ErrorHandler("Check username or password ! ", 400));
  }

  //generate token
  const token = generateToken(staff._id);

  //store token using cookie
  res.cookie("StaffJwtToken", token, {
    httpOnly: true,
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRES_TIME) * 24 * 60 * 60 * 1000
    ),
  });

  //send response
  res.status(200).json({
    success: true,
    token: token,
  });
});

// url : /staff/dashboard

exports.getStaffDashboard = catchAsyncError(async (req, res, next) => {
  // get staff data using req.userId
  const staff = req.user;

  //get email from staff
  const staffEmail = staff.email;

  //get current date
  const currentDate = getDate();

  // check if attendance is already uploaded or not
  const updatedOrNot = await staffAttendance.findOne({
    email: staffEmail,
    date: currentDate,
  });

  res.status(200).json({
    success: true,
    data: staff,
    getIn: updatedOrNot ? true : false,
  });
});

// url : /staff/attendance (get)
exports.getAttendancePage = catchAsyncError(async (req, res, next) => {
  //disable sunday attendance
  // if (new Date().getDay() == 0) {
  //   return next(new ErrorHandler("Cannot Post Attendance At Sunday...!", 400));
  // }

  // getting department and years for take students data
  const { dept, year } = req.params;

  //check exits or not
  if (!dept || !year) {
    return next(
      new ErrorHandler("Department and Year parameter is required", 400)
    );
  }

  //getting last studentAttendance updated date via studentAttendance database
  const updatedOrNot = await checkUpdateOrNot(dept, year);

  if (updatedOrNot) {
    return next(new ErrorHandler("Today Attendance Is Already Uploaded", 400));
  }

  // get student based on department and year
  const studentsData = await students
    .find({ dept: dept.toUpperCase(), year })
    .select("regno")
    .sort({ regno: 1 });

  //check exits or not
  if (!studentsData.length) {
    return next(new ErrorHandler("No matched Student data", 400));
  }

  res.status(200).json({
    success: true,
    currentPage: "Staff Attendance Page",
    studentsData,
    dept,
    year,
  });
});

//url : /staff/attendance(post)
exports.postAttendanceData = catchAsyncError(async (req, res, next) => {
  // get absent student data
  const attendanceData = req.body;

  if (!attendanceData) {
    return next(new ErrorHandler("Attendance Data is Must Required", 400));
  }

  //get dept and year
  const { dept, year } = req.params;

  //check exits or not
  if (!dept || !year) {
    return next(
      new ErrorHandler("Department and Year parameter is required", 400)
    );
  }

  //getting last studentAttendance updated date via studentAttendance database
  const updatedOrNot = await checkUpdateOrNot(dept, year);

  if (updatedOrNot) {
    return next(new ErrorHandler("Today Attendance Is Already Uploaded", 408));
  }

  // get student based on department and year
  const studentsData = await getStudents(dept, Number(year));

  //check exits or not
  if (!studentsData.length) {
    return next(new ErrorHandler("No matched Student data", 400));
  }

  // take key form studentAttendance data
  const regNos = Object.keys(attendanceData);

  // rollno act as a key
  for await (let student of studentsData) {
    if (regNos.includes(student.regno)) {
      await giveStudentAttendance(student.regno, false, dept, year);
    } else {
      await giveStudentAttendance(student.regno, true, dept, year);
    }
  }

  res.status(200).json({
    success: true,
    currentPage: "Attendances Applied Successfully",
  });
});

// url : /staff/self-attendance
exports.selfAttendance = catchAsyncError(async (req, res, next) => {
  //get email
  const email = req.user.email;
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return next(new ErrorHandler("Cannot Access Your Location..!", 400));
  }

  console.log(latitude, longitude);

  const inCollege = checkLocation(Number(latitude), Number(longitude));

  if (!inCollege) {
    return next(new ErrorHandler("You're Not In The College...!", 400));
  }

  // check if attendance is already uploaded or not
  const updatedOrNot = await staffAttendance.findOne({
    email,
    date: getDate(),
  });

  if (updatedOrNot) {
    return next(new ErrorHandler("Today Attendance Is Already Uploaded", 400));
  }

  //give attendance
  await giveStaffAttendance(email, true);

  res.status(201).json({
    success: true,
    currentPage: "Staff Dashboard",
  });
});

// url : /staff/class/:dept/:year
exports.getOneClass = catchAsyncError(async (req, res, next) => {
  const { dept, year } = req.params;

  //check exits or not
  if (!dept || !year) {
    return next(
      new ErrorHandler("Department and Year parameter is required", 400)
    );
  }

  const studentsData = await getStudents(dept.toUpperCase(), year);

  //check exits or not
  if (!studentsData.length) {
    return next(new ErrorHandler("No matched Student Data...!", 400));
  }

  res.status(200).json({
    success: true,
    currentPage: `Staff Visit Page in ${dept} and ${year}`,
    studentsData,
  });
});

// url : staff/students/details/:dept/:year/:selectedMonth/:selectedYear
exports.getOneClassAttendanceReport = catchAsyncError(
  async (req, res, next) => {
    const { dept, year, month } = req.params;
    const selectedYear = getYear();

    if (!dept && !year && !month && !selectedYear) {
      return next(new ErrorHandler("All Fields Are Must Required", 400));
    }

    console.log("params : ", {
      dept: dept,
      year: year,
      month: month,
      currentYear: selectedYear,
    });

    const rawReports = await studentAttendance
      .find({
        dept: dept.toUpperCase(),
        year: year,
        month: month,
        currentYear: selectedYear,
      })
      .sort({ regno: 1 });

    if (!rawReports.length) {
      return next(new ErrorHandler("No Data Found ", 400));
    }

    const report = convertAttendance(rawReports);

    res.status(200).json({
      success: true,
      data: report,
    });
  }
);

exports.getStudentsWith75Attendance = catchAsyncError(
  async (req, res, next) => {
    const { dept, year, month } = req.params;

    const selectedYear = getYear();

    if (!month || !year || !dept || !selectedYear) {
      return next(
        new ErrorHandler(
          "Month, Year, Department, and Student Year are required!",
          400
        )
      );
    }

    // Total days in the month (assume 31 for seeded data)
    const daysInMonth = 31; // Your seeded data has attendance for all 31 days

    const exact75AttendanceDays = Math.floor(0.75 * daysInMonth); // Calculate 75% of total days

    const studentAttendanceReports = await studentAttendance.aggregate([
      {
        $match: {
          month: parseInt(month),
          year: parseInt(year),
          dept: dept.toUpperCase(),
          currentYear: parseInt(selectedYear),
        },
      },
      {
        $group: {
          _id: "$regno",
          presentDays: { $sum: { $cond: ["$present", 1, 0] } },
        },
      },
      {
        $match: {
          presentDays: exact75AttendanceDays, // Match exactly 75% attendance
        },
      },
      {
        $project: {
          regno: "$_id",
          present: "$presentDays",
          absent: { $subtract: [daysInMonth, "$presentDays"] },
        },
      },
    ]);

    if (studentAttendanceReports.length === 0) {
      return next(
        new ErrorHandler(
          "No students found with 75% attendance for the given criteria!",
          404
        )
      );
    }

    res.status(200).json({
      success: true,
      data: studentAttendanceReports,
    });
  }
);

exports.getStudentsWithFullAttendance = catchAsyncError(
  async (req, res, next) => {
    const { dept, year, month } = req.params;
    const selectedYear = getYear();

    if (!month || !year || !dept || !selectedYear) {
      return next(
        new ErrorHandler(
          "Month, Year, Department, and Student Year are required!",
          400
        )
      );
    }

    // Total days in the month (assume 31 for seeded data)
    const daysInMonth = 31; // Your seeded data has attendance for all 31 days

    const studentAttendanceReports = await studentAttendance.aggregate([
      {
        $match: {
          month: parseInt(month),
          year: parseInt(year),
          dept: dept.toUpperCase(),
          currentYear: parseInt(selectedYear),
        },
      },
      {
        $group: {
          _id: "$regno",
          presentDays: { $sum: { $cond: ["$present", 1, 0] } },
        },
      },
      {
        $match: {
          presentDays: daysInMonth, // Match exactly 100% attendance
        },
      },
      {
        $project: {
          regno: "$_id",
          present: "$presentDays",
          absent: { $subtract: [daysInMonth, "$presentDays"] },
        },
      },
    ]);

    if (studentAttendanceReports.length === 0) {
      return next(
        new ErrorHandler(
          "No students found with 100% attendance for the given criteria!",
          404
        )
      );
    }

    res.status(200).json({
      success: true,
      data: studentAttendanceReports,
    });
  }
);

exports.downloadAttendanceCertificate = catchAsyncError(
  async (req, res, next) => {
    const { regno, month } = req.params;

    const year = getYear();

    if (!regno || !month || !year) {
      return next(
        new ErrorHandler(
          "Registration number, Month, and Year are required!",
          400
        )
      );
    }

    // Fetch student information
    const student = await students.findOne({ regno });
    if (!student) {
      return next(new ErrorHandler("Student not found!", 404));
    }

    // Generate HTML for the certificate
    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
            }
            .certificate {
                border: 5px solid #000;
                padding: 20px;
                max-width: 600px;
                margin: auto;
            }
            .title {
                font-size: 24px;
                font-weight: bold;
            }
            .content {
                margin-top: 20px;
                font-size: 18px;
            }
            .info {
                margin-top: 10px;
                font-size: 16px;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <div class="certificate">
            <div class="title">Certificate of Attendance</div>
            <div class="content">
                <p>This is to certify that</p>
                <h2>${student.name}</h2>
                <p>Registration Number: <strong>${student.regno}</strong></p>
                <p>from the Department of <strong>${student.dept}</strong>, Year <strong>${student.year}</strong>,</p>
                <p>has achieved 100 % attendance for the month of <strong>${month}-${year}</strong>.</p>
            </div>
        </div>
    </body>
    </html>
  `;
    // Convert HTML to PDF/Image
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlTemplate);
    const pdfBuffer = await page.pdf({ format: "A4" }); // Generate PDF
    await browser.close();

    // Send the PDF as a downloadable file
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Attendance_Certificate_${regno}.pdf"`,
    });
    res.send(pdfBuffer);
  }
);

// url: /staff/self-attendance/report/:email/:month
exports.getStaffAttendanceReport = catchAsyncError(async (req, res, next) => {
  const { month } = req.params;
  const year = getYear();
  const email = req.user.email;

  if (!email || !month || !year) {
    return next(
      new ErrorHandler(
        "Email and Month and Year is must required for attendance report",
        400
      )
    );
  }

  const staffAttendanceReport = await staffAttendance.find({
    email: email,
    month: month,
    year: year,
  });

  if (staffAttendanceReport.length == 0) {
    return next(new ErrorHandler("Attendance Reports Not Found !", 400));
  }

  let Present = 0,
    Absent = 0;

  staffAttendanceReport.forEach(({ present }) => {
    present ? Present++ : Absent++;
  });

  res.status(200).json({
    success: true,
    currentPage: "Staff Attendance Report",
    data: {
      present: Present,
      absent: Absent,
    },
  });
});

// url : /staff/search/student/:regno
exports.getOneStudent = catchAsyncError(async (req, res, next) => {
  const { regno } = req.params;

  const student = await students.findOne({ regno }).select("-password");
  if (!student) {
    return next(new ErrorHandler("No Data Found ! ", 400));
  }

  res.status(200).json({
    success: true,
    data: student,
  });
});

// url : /staff/details
exports.getStaffs = catchAsyncError(async (req, res, next) => {
  const result = await staffs
    .find({ position: { $ne: "HOD" } })
    .select("-password")
    .select("-DOB")
    .select("-position");

  res.status(200).json({
    success: true,
    data: result,
  });
});

// url : /staff/logout
exports.staffLogout = catchAsyncError(async (req, res, next) => {
  //clear cookie via set null
  res.cookie("StaffJwtToken", "", { httpOnly: true });

  res.status(200).json({
    success: true,
    currentPage: "Staff login page",
  });
});
