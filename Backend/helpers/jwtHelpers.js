const jwt = require('jsonwebtoken');

exports.generateToken=(id)=>{

    const token =  jwt.sign({
        id
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn:"7d"
    }
    )
    return token;
}
