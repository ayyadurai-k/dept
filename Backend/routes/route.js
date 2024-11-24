const express = require("express");
const {
  studentLoginPost,
  getStudentDashboard,
  studentLogout,
  getStudentsAttendanceReport,
} = require("../controllers/student.ctrl");
const {
  staffLoginPost,
  getStaffDashboard,
  staffLogout,
  getAttendancePage,
  postAttendanceData,
  selfAttendance,
  getOneClass,
  getStaffAttendanceReport,
  getOneClassAttendanceReport,
  getOneStudent,
  getStaffs,
  getStudentsWith75Attendance,
  getStudentsWithFullAttendance,
  downloadAttendanceCertificate,
} = require("../controllers/staff.ctrl");
const {
  studentAuthCheck,
  staffAuthCheck,
} = require("../middlewares/AuthCheck");
const { hodCheck } = require("../middlewares/hodCheck");

const route = express.Router();

// do login proccess
route.post("/student/login", studentLoginPost);
route.post("/staff/login", staffLoginPost);

// view dashboard page
// protected routes
route.get("/student/dashboard", studentAuthCheck, getStudentDashboard);
route.get("/staff/dashboard", staffAuthCheck, getStaffDashboard);

// logout dashboard
route.get("/student/logout", studentLogout);
route.get("/staff/logout", staffLogout);

//view attendance page
route.get("/staff/attendance/:dept/:year", staffAuthCheck, getAttendancePage);

//post attendance result
route.post("/staff/attendance/:dept/:year", staffAuthCheck, postAttendanceData);

//staff self attendance
route.post("/staff/self-attendance", staffAuthCheck, selfAttendance);

//get one class
route.get("/staff/class/:dept/:year", staffAuthCheck, getOneClass);

//get one class attendance report
route.get(
  "/staff/students/details/:dept/:year/:month",
  staffAuthCheck,
  getOneClassAttendanceReport
);
route.get(
  "/staff/students/attendance/above/75/:dept/:year/:month",
  staffAuthCheck,
  getStudentsWith75Attendance
);
route.get(
  "/staff/students/attendance/full/:dept/:year/:month",
  staffAuthCheck,
  getStudentsWithFullAttendance
);
route.get(
  "/staff/student/download-certificate/:regno/:month",
  staffAuthCheck,
  downloadAttendanceCertificate
);

// get staff self attendance report
route.get(
  "/staff/self-attendance/report/:month",
  staffAuthCheck,
  getStaffAttendanceReport
);

//get one student attendance report
route.get(
  "/student/attendance/report/:month",
  studentAuthCheck,
  getStudentsAttendanceReport
);

// get one student for search
route.get("/staff/search/student/:regno", staffAuthCheck, getOneStudent);

//get all staff
route.get("/staff/details", staffAuthCheck, hodCheck, getStaffs);

module.exports = route;
