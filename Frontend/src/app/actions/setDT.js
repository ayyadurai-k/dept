import { setDate } from '../slicers/dateSlicer'
import axios from 'axios'

const setDT = async(dispatch) => {
    const {data}=await axios.get('/date')
    dispatch(setDate(data))
}

export default setDT