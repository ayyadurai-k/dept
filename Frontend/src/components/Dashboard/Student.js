
import { HelmetProvider, Helmet } from "react-helmet-async";
import React, { useEffect } from "react";
import StudentContent from "./StudentContent";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import { getUser } from "../../app/actions/getUser";
import { changeSelect } from "../../app/slicers/navSlicer";
const Student = () => {
 
  const  user  = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(changeSelect(3))
    getUser(dispatch, '/student/dashboard')
  },[dispatch])
  
  if (user.error) {
    navigate('/login')
  } 

  
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>TMC - Student</title>
        </Helmet>
        {user.loading || !user.user ? <Loader /> : <StudentContent/>}
      </HelmetProvider>
    </>
  );
};

export default Student;
