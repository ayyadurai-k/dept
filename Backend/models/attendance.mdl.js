const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var studentAttendanceSchema = new mongoose.Schema({
    regno:{
        type:String,
        required:[true,"Please enter Student registration number"]
    },
    dept :{
        type:String,
        required:[true,"Please enter Department"]
    },
    month:{
            type:Number,
            required:[true,"Please enter Month"]
    },
    currentYear : {
        type:Number,
        required:[true,"Please enter Current Year"]
    },
    year:{  
        type:Number,
        required:[true,"Please enter Year"]
    },
    date:{
        type:String,
        required:[true,"Please enter Date"],
    },
    present:{
        type:Boolean,
        required:[true,"Please enter present"]
    },
    updatedAt : {
        type : String,
        required:[true,"Please enter Last Updated Date !"]
    }
});

const staffAttendanceSchema = new mongoose.Schema({
     email :{
        type:String,
        required:[true,"Please enter Email"]
     },
     date :{
        type:String,
        required:[true,"Please enter Date"]
     },
     present:{
        type:Boolean,
        required:[true,"Please enter present"]
     },
     updatedAt : {
        type : String,
        required:[true,"Please enter Last Updated Date!"]
     },
     month : {
        type:Number,
        required:[true,"Please enter Month"]
     },
     year : {
             type:Number,
             required:[true,"Please enter Year"]
    }
});

const studentAttendanceModel = mongoose.model('attendance',studentAttendanceSchema);
const staffAttendanceModel = mongoose.model('staffAttendance',staffAttendanceSchema);

module.exports = {studentAttendanceModel,staffAttendanceModel};

