import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelect } from '../app/slicers/selectSlicer';

//images
import userlogin from '../assets/userlogin.png';
import useLogin from '../hooks/useLogin';

const Login = () => {

    const dispatch = useDispatch();

    const [eye, setEye] = useState(false);
    const navSelect = useSelector((state)=>state.navbar.select)

    useEffect(()=>{
        if(navSelect===2 || navSelect===3){
            dispatch(setSelect({ select:navSelect-1 }));
        }
        else{
            dispatch(setSelect({select:1}))
        }
    },[navSelect,dispatch])
    
    const select = useSelector((state) => state.select.value.select);
    
    const handleSelect = (select) => {

        dispatch(setSelect({ select }));
        
    }

    const { input,error,load,handleChange,handleSubmit } = useLogin();
    return (
        <>
            <main className='m-5 p-5 flex mt-3 rounded-2xl bg-[#0cba94] font-[Poppins]'>
                <div className='md:w-1/2 hidden md:block '>
                    <img src={userlogin} alt='User Login' className='w-3/4 mx-auto'></img>
                </div>
                <div className='w-full md:w-1/2'>
                    <form className=' h-full'>
                        <h1 className='text-center font-semibold text-3xl mt-2'>Login</h1>
                        <div className='flex mt-5 justify-center bg-white w-4/5 lg:w-1/2 mx-auto rounded-lg shadow-lg  '>
                            <div onClick={()=>handleSelect(1)} className={`w-1/2 h-full px-3 py-2 rounded-l-lg  hover:cursor-pointer ${select===1 && 'bg-blue-500'}`} >
                                <h3 className={`font-bold text-center ${select===1 && 'text-white'}`}>Staff</h3>

                            </div>
                            <div onClick={()=>handleSelect(2)} className={`w-1/2 h-full px-3 py-2 rounded-r-lg  hover:cursor-pointer ${select===2 && 'bg-blue-500'}`} >
                                <h3 className={`font-bold text-center ${select===2 && 'text-white'}`}>Student</h3>

                            </div>
                            
                        </div>
                        <div className='bg-white p-2 w-full lg:w-8/12 mx-auto mt-7 flex rounded-lg'>
                            <div className=' flex p-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 my-auto ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            <div className='w-full '>
                                <label htmlFor='email' className='text-gray-500'>Enter Your Email </label>
                                <input type="email" id='email' name='username' value={input.username} onChange={handleChange} className='block border-b-2 border-gray-400 outline-none w-full mt-1 p-1 '></input>

                            </div>
                        </div>
                        {error.email && <p className='w-full lg:w-3/5 lg:mx-auto mt-1 text-md font-medium text-red-600 block'>{ error.email}</p>}

                        <div className='bg-white p-2 w-full lg:w-8/12 mx-auto mt-3 flex rounded-lg'>
                            <div className=' flex p-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 my-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>

                            </div>
                            <div className='w-full flex '>
                                <div className='w-full'>
                                    <label htmlFor='password' className='text-gray-500'>Enter Your Password </label>
                                    <input type={`${eye ? "text" : "password"}`} id='password' name='password'value={input.password} onChange={handleChange} className='block  border-b-2 border-gray-400 outline-none w-full mt-1 p-1 z-20  '></input>
                                </div>
                                <div className='hover:cursor-pointer ml-2' onClick={()=>setEye(!eye)}>
                                {!eye ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6   ml-auto mt-8 mr-2 z-1 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg> : 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6   ml-auto mt-8 mr-2 z-1 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                  </svg>
                                  
                                }
                                </div>

                            </div>
                        </div>
                        {error.password && <p className=' w-full lg:w-3/5 lg:mx-auto mt-1 text-md font-medium text-red-600 block'>{ error.password}</p>}




                        {error.custom && <p className='w-full lg:w-3/5 mx-auto mt-3 text-md font-medium text-red-600'>{ error.custom}</p>}
                        <button disabled={load ? true : false} className={`flex justify-center  mx-auto px-3 py-2 rounded-xl font-bold bg-blue-600 text-white ${error.custom ? 'mt-3' : 'mt-7'} ${load && 'cursor-not-allowed'} `} onClick={handleSubmit}>
                            <span>Submit</span>
                            <div role="status" className={`${!load && 'hidden'}`}>
                                <svg aria-hidden="true" className="w-6 h-6 mr-2 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-black font-bold" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </button>
                    </form>
                </div>
            </main>
            <div className='mb-28'></div>
        </>
    )
}

export default Login