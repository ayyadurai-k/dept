import axios from 'axios'

export const selfAttendance = async (setError, setGetIn, setLoading) => {
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(async (position) => {
    //         const latitude = position.coords.latitude;
    //         const longitude = position.coords.longitude;
    //         // const latitude = 9.911151567126199;
    //         // const longitude = 78.1089191218433;
    //         try {
    //             setLoading(true);
    //             await axios.post('/staff/self-attendance', { latitude, longitude })
    //             setGetIn(true)
    //             setError(null)
    //         }
    //         catch (error) {
    //             setError(error.response.data.message)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }, (error) => {
    //         console.log(error);
    //         setError(error.message)
    //     })
    // } else {
    //     setError("Geolocation is Not Supported")
    // }
    setLoading(true);
    const {data} =await axios.get("https://geolocation-db.com/json/");
    const latitude = data.latitude;
    const longitude = data.longitude;
    console.log(latitude,longitude);
    try {
        await axios.post('/staff/self-attendance', { latitude, longitude })
        setGetIn(true)
        setError(null)
    }
    catch (error) {
        setError(error.response.data.message)
    } finally {
        setLoading(false)
    }
}

export const selfAttendanceReport = async (month, url) => {
    return await axios.get(`${url}${month}`)
}

