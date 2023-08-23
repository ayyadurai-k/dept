export const getLocation =(setError,setLocation)=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLocation({latitude,longitude})
        },(error)=>{
            setError(error.message)
        },{enableHighAccuracy:true})
    }
    else{
       return setError("Location Not Supported In Browser...!")
    }
}