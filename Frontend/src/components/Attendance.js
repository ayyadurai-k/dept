import React, { useEffect, useState } from "react";
import Loader from './Loader';
import { getClass } from "../utils/class";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStudents } from "../API/studentAPI";
import { postAttendanceData } from "../API/attendanceAPI";
import MiniLoader from './MiniLoader'
import { useSelector } from "react-redux";

const Attendance = () => {
    //get department using params;
    const { dept, year } = useParams();
    const [students, setStudents] = useState([]);
    const [absent, setAbsent] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success,setSuccess]=useState(false);
    const [successLoading,setSuccessLoading] = useState(false);
    const navigate = useNavigate();
    const date = useSelector(state=>state.date)



    useEffect(() => {
        if (!dept.toUpperCase() === "CS" || !dept.toUpperCase() === "IT" || !(Number(year) < 4 && Number(year) > 0)) {

            return setError("No Matched Students Data...!")
        }
        async function api() {
            try {
                setLoading(true)
                const students = (await getStudents(dept, year,true)).data.studentsData;
                setStudents(students);
            }
            catch (error) {
                return setError(error.response.data.message)
            }
            finally {
                setLoading(false)
            }
        }
        api();
    }, [dept,year])

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setAbsent((preAbsent) => {
                return {
                    ...preAbsent,
                    [name]: true
                }
            })
        }
        else {
            setAbsent((preAbsent) => {
                const temp = preAbsent;
                delete temp[name]
                return temp;
            })
        }
    }

    const handleSubmit = async() => {
       try{
        setSuccessLoading(true);
        await postAttendanceData(dept,year,absent);
        setSuccess(true);
       }
       catch(error){
            setError(error.response.data.message)
       }
       finally{
        setSuccessLoading(false);
        
       } 
    }
    return (

        <>
            {loading && <Loader/>}
            {successLoading && <Loader/>}
            {!error && !loading && !success&&<main className=" lg:p-8 lg:px-20 w-10/12 mx-auto mb-10">
                <section className="">
                    <div className="flex justify-between flex-col md:flex-row">
                        <h1 className="font-bold text-xl md:text-2xl uppercase md:tracking-wide">
                            Attendance
                        </h1>
                        <label className="text-black bg-amber-600 px-3 py-1 font-extrabold rounded-lg">
                            {date.fulldate}
                        </label>
                    </div>
                    <div className=" mt-2 rounded-xl bg-gradient-to-r  from-emerald-400 to-cyan-400 ">
                        <Link to={'/staff'} className="rounded-lg bg-white font-bold text-sm px-3 py-1">
                            <label className="cursor-pointer">Back</label>
                        </Link>
                        <h1 className="font-bold m text-black text-center text-lg md:text-xl">
                            {getClass(dept, year)}
                        </h1>
                        <div className=" w-11/12 md:w-4/5 mx-auto rounded-lg mt-3">
                            <table className=" w-full ">
                                <thead className="text-white text-xl">
                                    <tr key="head" className="">
                                        <th className="bg-gray-900 p-2 md:p-4 rounded-tl-lg">RegNo</th>
                                        <th className="bg-gray-900 p-2 md:p-4 rounded-tr-lg">Absent</th>
                                    </tr>
                                </thead>

                                <tbody className="text-center">
                                    {students.map((student, index) => {
                                        let sNo = index + 1;
                                        return (
                                            <tr className={`font-bold ${sNo % 2 === 0 && 'bg-black bg-opacity-70 text-white'}`} key={student.regno}>
                                                <td className="p-2 md:p-5">{student.regno}</td>
                                                <td className="p-2 md:p-5">
                                                    <input onChange={handleChange} name={student.regno} type="checkbox" className="content-['X'] focus:ring-red-800 marker: cursor-pointer outline-red-900 w-6 h-6 rounded-full checked:bg-red-700 hover:checked:bg-red-500"></input>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-red-600 font-bold text-center my-5">Once Submitted Never Change Recheck Attendance !</p>
                        <div className="flex justify-center m-3 f">

                            <button onClick={handleSubmit} className=" text-white hover:bg-blue-700   bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-2 font-bold rounded-lg flex ">
                                <span className="mr-2">Submit</span>
                                {successLoading && <MiniLoader/>}
                            </button>

                        </div>
                    </div>
                </section>
            </main>}
            {error && !success&& <>
              {!loading && <main className='flex justify-center items-center w-full '>
                <section className='my-auto w-full'>
                    <div className='w-full lg:w-1/3 p-5 rounded-lg mx-auto mt-24'>
                        <h1 className='font-bold text-2xl text-center'>Issue</h1>
                        <p className='bg-red-500 rounded-lg p-5 font-bold text-lg text-center my-3'>
                            {error}
                        </p>

                        <div className='flex justify-center'>
                            <button onClick={() => { navigate('/staff') }} className='font-bold text-md text-center text-gray-800'>Please Go Back </button>
                        </div>
                    </div>
                </section>
            </main>}
            {
                loading && <Loader/>
            }
            </>}
            {  !error && success && !loading&& !successLoading && <main className='flex justify-center items-center w-full   '>
                    <section className='my-auto w-full '>
                        <div className='w-3/4 p-2 rounded-lg mx-auto mt-20'>
                            <h1 className='font-bold text-xl md:text-2xl text-center'>Success</h1>
                            <p className='bg-green-500 w-full rounded-lg  font-bold text-lg text-center my-3'>Attendance Posted Succesfully...!</p>
                            <p className='font-bold text-md text-center text-gray-800'>
                                <Link to={'/staff'}>Please Go Back</Link>
                            </p>
                        </div>
                    </section>
            </main>}
        </>
    );
};

export default Attendance;
