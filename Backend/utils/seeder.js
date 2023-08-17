//data
let studentData = require('../data/students');
let staffData = require('../data/staffs');

//models
const students = require('../models/student.mdl');
const staffs = require('../models/staff.mdl');

const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('../config/database');

//config file
dotenv.config({path:path.join(__dirname,'..',"config","config.env")});

//connect database
connectDatabase();

const { hashPassword } = require('../helpers/hashHelper');




// hash password
async function hash(){

    //hash students password
    for (let i = 0; i< studentData.length; i++) {
      studentData[i].password = await hashPassword(studentData[i].password);
    }

    //hash staffs password
    for(let i=0;i<staffData.length;i++){
        staffData[i].password = await hashPassword(staffData[i].password)
    }

}


const seedData=async()=>{
    await hash()
    
   //delete exixting data
    await students.deleteMany({});
    await staffs.deleteMany({});

    await students.insertMany(studentData); 
    await staffs.insertMany(staffData); 

    console.log("All data inserted successfully");
    // end the program execution
    process.exit();
}


seedData();