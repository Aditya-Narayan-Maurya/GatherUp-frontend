import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  let navigate=useNavigate();
  let userId=localStorage.getItem("userId");
  let logout=()=>{
    localStorage.removeItem("userId");
    navigate("/login");
  }
  return (
    <div className='w-full h-16 flex flex-wrap justify-between bg-amber-50 fixed top-0 z-50'>
      <aside className='w-[30%]'>
        <img src="" alt="" />Logo
      </aside>
      <ul className='flex justify-end text-2xl mr-5 '>
        <li className='p-2 m-2 mr-4'><Link to="/">Home</Link></li>
        <li className='p-2 m-2 mr-4'><Link to="/events">Events</Link></li>
        <li className='p-2 m-2 mr-4'><Link to="/about">About</Link></li>
        <li className='p-2 m-2 mr-4'><Link to="/contact">Contact</Link></li>
         {
           userId
           ? 
           <>
           <li className='p-2 m-2 mr-4'><Link to="/" onClick={logout}>Logout</Link></li>
           <li className='p-2 m-2 mr-4'><Link to="/profile">Profile</Link></li>
           </>
           :
           <>
           <li className='p-2 m-2 mr-4'><Link to="/register">Register</Link></li>
           <li className='p-2 m-2 mr-4'><Link to="/login">Login</Link></li>
           </>
         }
        
      </ul>
    </div>
  )
}

export default Navbar;
