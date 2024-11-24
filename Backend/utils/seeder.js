//data
let studentData = require("../data/students");
let staffData = require("../data/staffs");

//models
const students = require("../models/student.mdl");
const staffs = require("../models/staff.mdl");
const {
  studentAttendanceModel: StudentAttendance,
} = require("../models/attendance.mdl");

const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("../config/database");

//config file
dotenv.config({ path: path.join(__dirname, "..", "config", "config.env") });

//connect database
connectDatabase();

const { hashPassword } = require("../helpers/hashHelper");

// hash password
async function hash() {
  //hash students password
  for (let i = 0; i < studentData.length; i++) {
    studentData[i].password = await hashPassword(studentData[i].password);
  }

  //hash staffs password
  for (let i = 0; i < staffData.length; i++) {
    staffData[i].password = await hashPassword(staffData[i].password);
  }
}

const seedAttendance = async () => {
  const Student = students;
  const departments = ["CS", "IT"];
  const years = [1, 2, 3];
  const month = 10; // October
  const currentYear = 2024; // Year is fixed
  const totalDays = 31; // Number of days in October
  const executionDate = new Date().toISOString(); // Current date as updatedAt

  try {
    for (let dept of departments) {
      for (let year of years) {
        // Fetch all students in the current department and year
        const students = await Student.find({ dept, year });
        const totalStudents = students.length;

        if (totalStudents === 0) {
          console.log(`No students found for ${dept} department, year ${year}`);
          continue;
        }

        const exact75PercentCount = Math.ceil(0.6 * totalStudents); // 60% of students with exactly 75% attendance
        const perfectAttendanceCount = totalStudents - exact75PercentCount; // Remaining 40%

        // Assign attendance to students
        let studentCounter = 0;
        for (let student of students) {
          const regno = student.regno;

          if (studentCounter < exact75PercentCount) {
            // Students with exactly 75% attendance (23 days out of 31)
            const presentDays = Math.floor(0.75 * totalDays); // 75% of total days
            for (let day = 1; day <= totalDays; day++) {
              const present = day <= presentDays; // Present for the first 'presentDays', then false
              await StudentAttendance.create({
                regno,
                dept,
                month,
                currentYear,
                year,
                date: `${day}-10-${currentYear}`,
                present,
                updatedAt: executionDate,
              });
            }
          } else {
            // Students with 100% attendance
            for (let day = 1; day <= totalDays; day++) {
              await StudentAttendance.create({
                regno,
                dept,
                month,
                currentYear,
                year,
                date: `${day}-10-${currentYear}`,
                present: true,
                updatedAt: executionDate,
              });
            }
          }
          studentCounter++;
        }

        console.log(`Attendance seeded for ${dept} department, year ${year}`);
      }
    }
    console.log("Attendance seeding completed!");
  } catch (error) {
    console.error("Error seeding attendance:", error);
  }
};
const seedData = async () => {
  await hash();

  //delete exixting data
  await students.deleteMany({});
  await staffs.deleteMany({});
  await StudentAttendance.deleteMany({});

  await students.insertMany(studentData);
  await staffs.insertMany(staffData);
  await seedAttendance();
  console.log("All data inserted successfully");
  // end the program execution
  process.exit();
};

seedData();
