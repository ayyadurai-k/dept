import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Staff from "./components/Dashboard/Staff";
import Student from "./components/Dashboard/Student";
import Details from "./components/Details";
import PageNotFound from "./components/PageNotFound";
import Contact from "./components/Contact";
import About from "./components/About";
import Attendance from "./components/Attendance";
import Error from "./components/Error";
import AttendanceDetails from "./components/AttendanceDetails";
import StaffDetails from "./components/StaffDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import setDT from './app/actions/setDT'

function App() {
  const {select} = useSelector((state)=>state.navbar)
  const dispatch =useDispatch();

  useEffect(()=>{
      setDT(dispatch);
  },[dispatch])

  return (
    <>
      <Header />
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/staff" element={<Staff/>} />
        <Route path="/student" element={<Student/>} />
        <Route path="/details/:dept/:year" element={<Details/>}/>
        <Route path="/details/staff" element={<StaffDetails/>}/>
        <Route path="/attendance-details/:dept/:year/:month" element={<AttendanceDetails/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/attendance/:dept/:year" element={<Attendance/>}/>
        <Route path="/error" element={<Error/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      {select===1 ? <Footer /> : select===4 ? <Footer/> : select===5 && <Footer/>}
    </>
  );
}

export default App;
