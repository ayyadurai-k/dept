import axios from 'axios'

export const selfAttendance = async (setError, setGetIn, setLoading,date) => {

    //check day 
    if(Number(date.day)===0 || Number(date.day)===6){
        return setError("Sunday and Saturday Not Allowed...!")
    }

    // //check time only 8.45am to 10 am
    // if(Number(date.hours)<8 || Number(date.hours)>9){
    //     return setError("Only 8am to 10am is Open...!")
    // }
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            try {
                await axios.post('/staff/self-attendance', { latitude, longitude })
                setGetIn(true)
                setError(null)
            }
            catch (error) {
                setError(error.response.data.message)
            } 
        }, (error) => {
            console.log(error);
            setError(error.message)
        })
    } else {
        setError("Geolocation is Not Supported")
    }
    
}

export const selfAttendanceReport = async (month, url) => {
    return await axios.get(`${url}${month}`)
}

