const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const { getDate } = require('../helpers/dateTimeHelper');



// Declare the Schema of the Mongo model
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter name"],
        maxLength:[20,"Name Contains only 20 Characters"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please enter email"],
        unique:true,
        
    },
    phone:{
        type:Number,
        required:[true,"Please enter phone number"],
        unique:true,
        maxLength:[10,"Numbers only contain 10 numbers"]
    },
    regno:{
        type:String,
        required:[true,"Please enter registartion number"],
        maxLength:[10,"Registration No only contain 10 numbers"],
        unique:true
    },
    gender:{
        type :String,
        required:[true,"Please enter  Gender"],
    },
    DOB:{
        type :String,
        required:[true,"Please enter  Gender"],
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
    },
    dept:{
        type :String,
        required:[true,"Please enter  department"],
        enum:["IT","CS"]
    },
    year:{
        type :Number,
        required:[true,"Please enter year"],
        enum : [1,2,3]
    } 
});

// studentSchema.pre('save',async function(next){
//     this.password=await hashPassword(this.password);
//     return next();
// })

studentSchema.methods.comparePassword=async(password)=>{
    return await bcrypt.compare(password,this.password);
}
//Export the model
module.exports = mongoose.model('student', studentSchema);