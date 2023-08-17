
import axios from 'axios';
// import useLogin from '../hooks/useLogin';


const loginUser = async (data,select) => {

    if (select === 1) {
       return await axios.post('/staff/login', data)
    }
    if (select === 2) {
       return await axios.post('/student/login', data)
    }
}

export default loginUser