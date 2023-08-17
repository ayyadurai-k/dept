const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var staffSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please enter name"],
        maxLength:[20,"Name Contains only 20 Characters"],
        trim:true
    },
    
    phone:{
        type:Number,
        required:[true,"Please enter phone number"],
        unique:true,
        maxLength:[10,"Numbers only contain 10 numbers"]
    },
    
    email:{
        type:String,
        required:[true,"Please enter email"],
        unique:true,
    },

    password:{
        type:String,
        required:[true,"Please enter password"],
    },
    gender:{
        type :String,
        required:[true,"Please enter  Gender"]
        
    },
    DOB:{
        type :String,
        required:[true,"Please enter  DOB"],
    },
    position : {
        type : String,
        default:"STAFF"
    }
});

//Export the model
module.exports = mongoose.model('Staffs', staffSchema);