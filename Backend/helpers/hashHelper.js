const bcrypt = require('bcrypt');

//hasing password
exports.hashPassword=async(password)=>{
    hashedPassword = await bcrypt.hash(password,10);
    return hashedPassword;
}

//comparehashed password
exports.comparePassword=async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}