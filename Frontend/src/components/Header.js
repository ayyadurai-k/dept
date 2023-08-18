import { useState} from "react";
import { Link, NavLink } from 'react-router-dom'
//images
import logo from '../assets/logo.png';
import { useSelector } from "react-redux";


const Header = () => {
    const [open, setOpen] = useState(false);
    
    const {select} = useSelector((state)=>state.navbar)

    
    
    

    //handle toggle event
    function toggleMenu() {
        if (open) {
            setOpen(false);
        }
        else {
            setOpen(true);
        }

    }

    

    return (
        <nav className="sticky w-full top-0 z-20">
            <div className="flex justify-between bg-black p-1 ">
                <img src={logo} alt="Logo" className="w-14 ml-5"></img>
                <div className="my-auto mr-5 md:hidden">
                    <button onClick={toggleMenu}>
                        {!open && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-400 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                        </svg>}
                        {open && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-amber-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>}
                    </button>
                </div>
                <ul className="md:flex my-auto hidden ">
                    <li className=""><NavLink to={'/'} className={`link ${select===1 && 'text-white'} '}`}>Home</NavLink></li>
                    <li className=""><NavLink to={'/staff'} className={`link ${select===2 && 'text-white'} '}`}>Staff</NavLink></li>
                    <li className=""><NavLink to={'/student'} className={`link ${select===3 && 'text-white'} '}`}>Student</NavLink></li>
                    <li className=""><NavLink to={'/contact'} className={`link ${select===4 && 'text-white'} '}`}>Contact</NavLink></li>
                    <li className=""><NavLink to={'/about'} className={`link ${select===5 && 'text-white'} '}`}>About</NavLink></li>
                </ul>
            </div>
            {open && <div className="md:hidden ">
                <ul className="flex flex-col bg-yellow-500 p-1" onClick={()=>setOpen(false)} >
                    <li className="mobilemenu w-3/4"><Link to={'/'} className={`${select===1 && 'bg-black text-white'} rounded-md px-16  py-0.5`}>Home</Link></li>
                    <li className="mobilemenu w-3/4"><Link to={'/staff'} className={`${select===2 && 'bg-black text-white'} rounded-md px-16  py-0.5`}>Staff</Link></li>
                    <li className="mobilemenu w-3/4"><Link to={'/student'} className={`${select===3 && 'bg-black text-white'} rounded-md px-16  py-0.5`}>Student</Link></li>
                    <li className="mobilemenu w-3/4"><Link to={'/contact'} className={`${select===4 && 'bg-black text-white'} rounded-md px-16  py-0.5`}>Contact</Link></li>
                    <li className="mobilemenu w-3/4"><Link to={'/about'} className={`${select===5 && 'bg-black text-white'} rounded-md px-16  py-0.5`}>About</Link></li>
                </ul>
            </div>}
        </nav>
    )
};

export default Header;
