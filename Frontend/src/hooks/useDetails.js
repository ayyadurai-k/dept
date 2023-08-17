import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const useDetails = () => {

    //initial state for input
    const initialState = {
        dept: 'null',
        year: 'null',
        month :'null'
    }

    const [radio, setRadio] = useState({select:null});
    const [input, setInput] = useState(initialState);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((preInput) => {
            return {
                ...preInput,
                [name] : value
            }
        })
    }

    const handleSubmit = (e) => {

        if (radio.select === "AD") {
            if (input.dept==='null' || input.year==='null' || input.month==='null') {
                return setError('All Fields Is Must Required');
            }
        }
        if (radio.select === "SD") {
            if (input.dept==='null' || input.year==='null' ) {
                return setError('All Fields Is Must Required');
            }
        }

        if (radio.select==="SD") {
            navigate(`/details/${input.dept}/${input.year}`)
        }
        if(radio.select==="AD") {
            navigate(`/attendance-details/${input.dept}/${input.year}/${input.month}`)
        }
        setError(null)
    }

    return { radio,error, setRadio ,input,setInput,setError,handleChange,handleSubmit};

}

export default useDetails