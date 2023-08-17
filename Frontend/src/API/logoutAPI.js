import axios from 'axios';
// import useLogin from '../hooks/useLogin';



const logoutAPI = async (user) => {
    if (user.position) {
        await axios.get('/staff/logout');
    }
    if (!user.position) {
        await axios.get('/student/logout');
    }
}

export default logoutAPI