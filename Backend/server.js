const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const  route  = require('./routes/route');
const error = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const {automaticStaffAttendance} = require('./helpers/attendanceHelpers');
const { getDate, getYear } = require('./helpers/dateTimeHelper');
//config file
dotenv.config({path:path.join(__dirname,"config","config.env")});

//variables declaration
const PORT = process.env.PORT;
const ENV = process.env.APP_ENV;

//connecting data base
connectDatabase();

const app = express(); // create app



app.use(cors());
app.use(bodyParser.urlencoded({extended:false})) //get data from url
app.use(cookieParser())
app.use(express.json());// get and put json files

app.use(route);
app.get('/date',(req,res)=>{
    res.status(200).json({
        fulldate : getDate(),
        date:new Date().getDate(),
        month: new Date().toLocaleString('default',{month : 'short'}).toUpperCase(),
        year : getYear(),
        day : new Date().getDay(),
        hours:new Date().getHours()
    })
})

automaticStaffAttendance()

if(process.env.APP_ENV==="production"){
    app.use(express.static(path.join(__dirname,'..','Frontend','build')));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'..','Frontend','build/index.html'));
    })
}

//for handling
app.use(error)


//listen port
 app.listen(PORT,()=>{
    console.log(`Server is listeing at ${PORT} in ${ENV}`)
})
