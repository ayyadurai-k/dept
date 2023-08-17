import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useAttendance = () => {
    const [input, setInput] = useState( {
        dept: 'null',
        year : 'null' 
    })
    const [error,setError]=useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInput({
            ...input,
            [name]: value
        })

    }
    
    const handleSubmit = () => {
        if (input.dept === 'null' || input.year === 'null') {
            return setError("All Fields Are Must Required!")
        }
        navigate(`/attendance/${input.dept}/${input.year}`)
        setError(null);
    }

    return {input,error,setInput,handleChange,handleSubmit}
}

export default useAttendance