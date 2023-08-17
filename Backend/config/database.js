const mongoose = require('mongoose');

const connectDatabase=()=>{
    
    mongoose.connect(process.env.MONGO_DB_URI).then(()=>{
        console.log("Database connected successfully");
    })
    .catch((err)=>{
        console.log("Database connection failed",err);
    })
}

module.exports=connectDatabase;