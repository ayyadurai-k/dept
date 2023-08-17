import React, { useEffect, useState } from 'react'
import { getStaffs } from '../API/staffAPI'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
const StaffDetails = () => {
    const navigate = useNavigate();
    const [staffs, setStaffs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function api() {
            try {
                setLoading(true);
                const { data } = await getStaffs();
                setStaffs(data.data)
            }
            catch (error) {
                setError(error.response.data.message)
            }
            finally {
                setLoading(false);
            }
        } api()

    }, [])


    return (
        <>
            {loading && <Loader />}
            {!error && !loading && <main className="bg-gray-300  w-full p-2 h-screen mb-10">
                <section className="bg-white w-11/12  border border-black mx-auto rounded-xl p-5 mt-5 ">
                    <h1 className="font-bold text-black text-2xl center">Class Name</h1>
                    <div className='hidden lg:block'>
                        <table className="w-full mt-5 ">
                            <thead className="bg-blue-500 border-b-2 rounded border-gray-600 text-xl">
                                <tr className="">
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Gender</th>
                                    <th className="p-3">phone</th>

                                </tr>
                            </thead>
                            <tbody className="text-center font-bold divide-y divide-gray-800">
                                {staffs.map((staff, index) => {
                                    const sNo = index + 1;
                                    return (<tr className={`${sNo % 2 === 0 && 'bg-blue-300'}`} key={staff._id} >
                                        <td className='p-2 '>{staff.email}</td>
                                        <td className='p-2 '>{staff.name}</td>
                                        <td className='p-2 '>{staff.gender}</td>
                                        <td className='p-2 '>
                                            <a href={`tell:${staff.phone}`}>{staff.phone}</a>
                                        </td>
                                    </tr>)
                                })}




                            </tbody>
                        </table>
                    </div>
                    <div className='lg:hidden mb-20'>
                        {
                            staffs.map((staff, index) => {
                                return (
                                    <div className='bg-blue-400  rounded-2xl shadow- mt-2 mb-5' key={staff._id}>
                                        <div className='flex flex-col md:flex'>
                                            <div className='w-full md:w-1/4 py-3 flex bg-blue-500 rounded-t-2xl'>
                                                <h1 className='m-auto  text-center font-bold text-lg break-all'>{staff.email}</h1>
                                            </div>
                                            <div className='w-full md:w-3/4 flex p-5'>
                                                <div className='my-auto '>
                                                    <h1 className='font-bold text-xl'>{ staff.name}</h1>                                                    <h1 className='font-bold text-gray-700'>
                                                        <a href={`tel:${staff.phone}`}>{ staff.phone}</a>
                                                    </h1>
                                                    <h1 className='font-bold text-gray-700'>{ staff.gender}</h1>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })

                        }
                    </div>
                </section>
            </main>}
            {error && !loading && <main className='flex justify-center items-center w-full '>
                <section className='my-auto w-full'>
                    <div className='w-full lg:w-1/3 p-5 rounded-lg mx-auto mt-24'>
                        <h1 className='font-bold text-2xl text-center'>Issue</h1>
                        <p className='bg-red-500 rounded-lg p-5 font-bold text-lg text-center my-3'>
                            <span>Authorization Error</span>
                            <span className='block'>{error}</span>
                        </p>

                        <div className='flex justify-center'>
                            <button onClick={() => { navigate('/') }} className='font-bold text-md text-center text-gray-800'>Please Go Back </button>
                        </div>
                    </div>
                </section>
            </main>
            }
        </>
    )
}

export default StaffDetails