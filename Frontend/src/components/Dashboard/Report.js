import React, { useEffect, useState } from 'react'
import generateMonthArray from '../../utils/generateMonthArray'
import useReport from '../../hooks/useReport';
import MiniLoader from '../MiniLoader';
const Report = () => {

    // for month options
    const [month, setMonth] = useState([]);
    useEffect(() => {
        setMonth(generateMonthArray())
    }, [])
    

    //report hook
    const reportHook = useReport();

    return (
        <div className=' '>
            <div className='p-5 rounded-xl shadow-xl  bg-gradient-to-r from-pink-500 to-rose-500'>
                <h1 className='font-bold  text-xl lg:text-2xl'>Self-Attendance Report</h1>
                <div className='mt-3 grid grid-cols-1 lg:grid-cols-2'>
                    <label className='ml-1'>
                        <span className='font-bold text-gray-800'>Month</span>
                        <select name='month'  onChange={reportHook.handleChange} className='rounded ml-2 outline-none'>
                            <option value='null' >Month</option>
                            {month.map(monthNum => <option value={monthNum} key={monthNum}>{ monthNum}</option>)}
                        </select>
                    </label>
                    <div className='lg:ml-7 ml-5 mt-1'>
                        <p className=' font-bold p-1'>Present : <span className='bg-white rounded p-1'>{reportHook.report.present < 10 ? '0'+reportHook.report.present : reportHook.report.present}</span></p>
                        <p className='mt-1 font-bold p-1 ml-1'>Absent : <span className='bg-white rounded  p-1' >{reportHook.report.absent < 10 ? '0'+reportHook.report.absent : reportHook.report.absent}</span></p>
                    </div>
                </div>
                {reportHook.error!=null && <div className='mt-3 font-bold text-black'>{ reportHook.error}</div>}

                <div className='flex justify-center mt-2'>
                    <button onClick={reportHook.handleSubmit} className='  px-4 py-2 rounded-md flex justify-center border-white bg-white font-bold text-rose-500 shadow-xl hover:bg-gray-300 w-full lg:w-auto text-center'>
                        <span className=' text-center mr-5'>Get</span>
                        {reportHook.report.loading && <MiniLoader className=""/>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Report