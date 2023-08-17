const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

const students = require("../models/student.mdl");
const staffs = require("../models/staff.mdl");
const studentAttendance =
  require("../models/attendance.mdl").studentAttendanceModel;
const staffAttendance =
  require("../models/attendance.mdl").staffAttendanceModel;

const { getDate, getMonth, getYear } = require("./dateTimeHelper");

const schedule = require("node-schedule");

const getStudents = async (dept, year) => {

  // get data which is based on department and year
  const studentsData = await students.find({ dept: dept.toUpperCase(), year }).select('-password').sort({regno:1});
  return studentsData;
};

const giveStudentAttendance = async (regNo, attendanceBool, dept, year) => {
  const createdResult = await studentAttendance.create({
    regno: regNo,
    dept: dept,
    month: getMonth(),
    currentYear: getYear(),
    year: year,
    date: getDate(),
    present: attendanceBool,
    updatedAt: getDate(),
  });
};

const giveStaffAttendance = async (email, attendanceBool) => {
  const createdResult = await staffAttendance.create({
    email: email,
    date: getDate(),
    present: attendanceBool,
    updatedAt: getDate(),
    month: getMonth(),
    year: getYear(),
  });
};

//codes for schduled jobs
const giveAutomaticAttendance = async () => {
  // get current Date
  const currentDate = getDate();

  //get attendance uploaded data
  const currentDateAttendance = await staffAttendance
    .find({ updatedAt: currentDate })
    .lean();

  //get all staff data
  const staffsData = await staffs.find().lean();

  //take emails form attendance uploaded data
  const currentAttendanceEmails = currentDateAttendance.map((value) => {
    return value.email;
  });

  //take emails from all staff data
  const staffEmails = staffsData.map((value) => {
    return value.email;
  });

  // check all staff attendance uploaded or not ,if all staff not getin click , automatically uploaded
  // false , that means "absent"
  if (currentDateAttendance.length == 0) {
    for await (let staffEmail of staffEmails) {
      await giveStaffAttendance(staffEmail, false);
    }
  }

  // check who is not getin post them as a false, that means "absent"
  else {
    for await (let staffEmail of staffEmails) {
      if (!currentAttendanceEmails.includes(staffEmail)) {
        await giveStaffAttendance(staffEmail, false);
      }
    }
  }
};

// codes for schdule
const automaticStaffAttendance = () => {
  //schedule job for every day at 10am
  schedule.scheduleJob("* 10 * * *", giveAutomaticAttendance);
};

//convert boolean into counting
const convertAttendance = (reports) => {
  const result = {};

  reports.forEach((report) => {
    if (!result[report.regno]) {
      if (report.present) {
        result[report.regno] = {
          present: 1,
          absent: 0
        };
      }
      else {
        result[report.regno] = {
          present: 0,
          absent: 1
        };
      }
    }
    else {
      if (report.present) {
        result[report.regno] = {
          ...result[report.regno],
          present: result[report.regno].present + 1
        }
      }
      else {
        result[report.regno] = {
          ...result[report.regno],
          absent: result[report.regno].absent + 1
        }
      }
    }
  });

 const results =  Object.keys(result).map((key,index)=>{
      return {
          regno : key,
          present : result[key].present,
          absent : result[key].absent
      }
  })


  return results;
};

// start schedule
automaticStaffAttendance();


const checkUpdateOrNot = async (dept, year) => {
  const result = await studentAttendance.find({ dept: dept, year: year, updatedAt: getDate() })
  return result.length ? true : false
}

module.exports = {
  getStudents,
  giveStudentAttendance,
  giveStaffAttendance,
  convertAttendance,
  checkUpdateOrNot
};
