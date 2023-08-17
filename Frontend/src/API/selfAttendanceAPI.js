import axios from 'axios'



export const selfAttendance = async() => {
    await axios.post('/staff/self-attendance');
}

export const selfAttendanceReport = async (month,url) => {
    return await axios.get(`${url}${month}`)
}

