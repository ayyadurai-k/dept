import axios from 'axios'

export const selfAttendance = async (setError, setGetIn, setLoading) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longtitude = position.coords.longitude;
            // const latitude = 9.911151567126199;
            // const longtitude = 78.1089191218433;
            try {
                setLoading(true);
                await axios.post('/staff/self-attendance', { latitude, longtitude })
                setGetIn(true)
                setError(null)
            }
            catch (error) {
                setError(error.response.data.message)
            } finally {
                setLoading(false)
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

