import axios from 'axios'



export const postAttendanceData =async(dept,year,absent)=>{
    return await axios.post(`/staff/attendance/${dept}/${year}`,absent)
}

export const getAttendanceData =async(dept,year,month)=>{
    return await axios.get(`/staff/students/details/${dept}/${year}/${month}`)
}