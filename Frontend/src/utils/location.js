export const getLocation =(setError,setLocation)=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLocation({latitude,longitude})
        },(error)=>{
            console.log(error);
            setError(error.message)
        },{enableHighAccuracy:true,timeout:10000})
    }
    else{
       return setError("Location Not Supported In Browser...!")
    }
}