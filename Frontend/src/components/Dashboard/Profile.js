import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import logoutAPI from '../../API/logoutAPI';
//images
import profile from '../../assets/profile.png';
import { selfAttendance } from '../../API/selfAttendanceAPI';
import MiniLoader from '../MiniLoader';
import { getLocation } from '../../utils/location';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [getIn, setGetIn] = useState(user.getIn);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const date = useSelector(state => state.date)

  const handleGetIn = () => {
   
    //check day 
    if (Number(date.day) === 0 || Number(date.day) === 6) {
      return setError("Sunday and Saturday Not Allowed...!")
    }
    // //check time only 8.45am to 10 am
    // if (Number(date.hours) < 8 || Number(date.hours) > 9) {
    //   return setError("Only 8am to 10am is Open...!")
    // }
    setLoading(true);
    getLocation(setError, setLocation);
  }

  useEffect(() => {
    if (location) {
      async function api() {
        try {
          await selfAttendance(location);
          setGetIn(true);
          setError(null);
        }
        catch(error){
           setError(error.response.data.message)
        }
        finally{
          setLoading(false)
        }     
      } api()
    }
  },[location])

  return (
    <>
      <section className=' mt-5  pb-10 '>
        <h1 className='flex'><Link to={'/login'} onClick={() => { logoutAPI(user.data) }} className='bg-red-500  text-white font-bold px-3 py-2 rounded-lg ml-auto mr-5 hover:bg-red-700' >Logout</Link></h1>

        <div className='bg-purple-400	 rounded-2xl  flex w-11/12 mx-auto mt-3'>
          <div className='w-full   lg:w-1/2 flex p-2'>
            <div className='w-full'>
              <div className=' lg:mt-20 bg-white  p-3 rounded-xl shadow-xl mx-auto w-full mt-5 lg:w-8/12 my-auto '>
                <h1 className='text-xl lg:text-2xl font-semibold mt-3 tracking-wider break-all'>{user.data.name}</h1>
                <h3 className='text-[12px]  font-bold  mt-2 break-all'>{user.data.email}</h3>
                <h3 className='mt-1 font-bold'>Department Of CS & IT</h3>
                <div className='flex justify-center mt-5'>
                  {user.data.position && <button disabled={getIn || loading ? true : false} onClick={handleGetIn} className={`px-3 py-2 flex justify-between ${getIn ? 'bg-green-600 hover:bg-green-700' : 'bg-[#8671F0]'} ${getIn && 'cursor-not-allowed'} ${loading&&'cursor-not-allowed'} font-bold hover:bg-[#674cf0] tracking-wide shadow-xl text-md text-white rounded-xl`}>
                    <span>{getIn ? 'Done' : "I'v Came"}</span>
                    <span className='ml-2'>{loading && <MiniLoader />}</span>
                  </button>}
                </div>
                {error && <h2 className='text-sm md:text-lg text-center mt-2 text-red-700 font-bold italic'>{error}</h2>}
              </div>
            </div>
          </div>
          <div className='w-1/2 hidden md:flex p-5 justify-center '>
            <img src={profile} className='w-3/4 ' alt='Profile SVG'></img>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile