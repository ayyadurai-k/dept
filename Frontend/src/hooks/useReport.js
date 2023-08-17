import  { useState } from 'react'
import { selfAttendanceReport } from '../API/selfAttendanceAPI'
import { useSelector } from 'react-redux'

const useReport = () => {
    
    const initialReportState = {
        loading : false,
        present: 0,
        absent : 0
    }

    const [ input, setInput ] = useState(null)
    const [error,setError] =useState(null)
    const [report, setReport] = useState(initialReportState)
    const {user} = useSelector((state)=>state.user)


    const handleChange = (e) => {
        const { value } = e.target;
        setInput(value)
    }

    const handleSubmit = async() => {
        
        if (input === null || input === 'null') {
            setReport(initialReportState)
            return setError("Month Is Required ! ");

        }
        setError(null);
        
        
        try {
            //turn on loading 
            setReport({ ...report, loading: true })
            let data;
            if (user.data.position) {
               data = (await selfAttendanceReport(input,'/staff/self-attendance/report/')).data.data
            }
            if (!user.data.position) {
               data = (await selfAttendanceReport(input,'/student/attendance/report/')).data.data
            }
            // set attendance deatils
            setReport({
                loading: false,
                present: data.present,
                absent : data.absent
            })
        }
        catch (error) {
            setError(error.response.data.message)
            setReport(initialReportState)

        }

    }

    return {
        input,
        error,
        report,
        handleChange,
        setError,
        handleSubmit
    }
}

export default useReport