import axios from 'axios'



export const getStaffs = async() => {
    return await axios.get('/staff/details')
}