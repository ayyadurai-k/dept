import axios from 'axios'

export const selfAttendance = async (location) => {
   return await axios.post('/staff/self-attendance',location)
}

export const selfAttendanceReport = async (month, url) => {
    return await axios.get(`${url}${month}`)
}

