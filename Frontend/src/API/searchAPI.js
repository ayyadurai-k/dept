import axios from 'axios'



export const searchStudent = async (regNo) => {
   return await axios.get(`/staff/search/student/${regNo}`);
}

