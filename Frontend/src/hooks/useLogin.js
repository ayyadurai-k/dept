import  { useState } from 'react'
import loginValidate from '../utils/loginValidate';
import loginUser from '../API/loginAPI';
import {useNavigate } from 'react-router-dom'

//state
import { useSelector, useDispatch } from 'react-redux';
import { setError } from '../app/slicers/errorSlicer';

const useLogin = () => {

    //initial input state
    const initialInputState = {
        username: "",
        password :""
    } 

    const dispatch = useDispatch();
    const [input, setInput] = useState(initialInputState);
    const [load, setLoad] = useState(false);

    //select state 
    const select = useSelector((state) => state.select.value.select);
    const error = useSelector((state) => state.error.value);

    //navigation hook
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

    const handleSubmit = async(e) => {
        e.preventDefault();

        const err = loginValidate(input);

        //check error exits or not
        const errExists = Object.keys(err).length > 0 ? true : false;
        
        if (errExists) {
            return dispatch(setError(err))
        }

        try {
            setLoad(true)
            await loginUser(input, select);
            dispatch(setError({}))
            setInput(initialInputState);


            //navigate to  based on select value 
            if (select === 1) {
                navigate('/staff')
            }
            else if (select === 2) {
                navigate('/student')
            }

        }
        catch (error) {
           //check success or not
           dispatch(setError({custom:error.response.data.message}))
        }
        finally {
            setLoad(false);
        }
    }

    return {input,error,load,handleChange,handleSubmit}
}

export default useLogin