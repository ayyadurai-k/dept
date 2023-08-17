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
import Success from "./components/Success";
import AttendanceDetails from "./components/AttendanceDetails";
import StaffDetails from "./components/StaffDetails";

function App() {
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
        <Route path="/success" element={<Success/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
