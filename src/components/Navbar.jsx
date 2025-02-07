import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  let [user,setUser]=useState(null);


  let navigate=useNavigate();
  let userId=localStorage.getItem("userId");


   useEffect(()=>{
    async function fetchUserDeatils() {
      let {data}=await axios.get(`http://localhost:8181/users/${userId}`);
      setUser(data); 
   } 
   fetchUserDeatils();
   },[]);

   const handleHomesClick = () => {
    if (user?.role === "admin") {
      navigate("/admin"); // Admin ke liye alag route
    } else {
      navigate("/"); // Normal user ke liye
    }
  };

  //hadle events click 
  const handleEventsClick = () => {
    if (user?.role === "admin") {
      navigate("/admin/events"); // Admin ke liye alag route
    } else {
      navigate("/events"); // Normal user ke liye
    }
  };

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
        <li onClick={handleHomesClick} className='p-2 m-2 mr-8'>Home</li>
        <li  className='p-2 m-2 mr-4'><Link to="/about">About</Link></li>
        {/* <li className='p-2 m-2 mr-4'><Link to="/contact">Contact</Link></li> */}
        {/* {
          user?.role==="admin"
          ?
          <li>My Events</li>
          :
          <li>My Regisrations</li>
        } */}
         {
           userId
           ? 
           <>
           <li onClick={handleEventsClick} className='p-2 m-2 mr-4'>Events</li>
           <li className='p-2 m-2 mr-8'><Link to="/" onClick={logout}>Logout</Link></li>
           <li className='p-2 m-2 mr-8'><Link to="/profile">Profile</Link></li>
           </>
           :
           <>
           <li className='p-2 m-2 mr-8'><Link to="/register">Register</Link></li>
           <li className='p-2 m-2 mr-8'><Link to="/login">Login</Link></li>
           </>
         }
        
      </ul>
    </div>
  )
}

export default Navbar;
