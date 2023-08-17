import axios from 'axios'



export const getStudents = async(dept,year,onlyReg) => {
    if(onlyReg){
        return await axios.get(`/staff/attendance/${dept}/${year}`)
    }
    else{
        return await axios.get(`/staff/class/${dept}/${year}`)
    }
}


