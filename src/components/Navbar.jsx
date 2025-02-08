import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/home-page-images/gatherup.png';

const Navbar = () => {
  let [user,setUser]=useState(null);


  let navigate=useNavigate();
  let userId=localStorage.getItem("userId");


   useEffect(()=>{
    async function fetchUserDeatils() {
      if(!userId) return;
      let {data}=await axios.get(`http://localhost:8181/users/${userId}`);
      setUser(data); 
   } 
   fetchUserDeatils();
   },[]);

   const handleHomesClick = () => {
    // console.log(user);
    if (user?.role === "admin") {
      navigate("/admin"); // Admin ke liye alag route
    } else{
      navigate("/"); // Normal user ke liye
    }
  };

  //hadle events click 
  const handleEventsClick = () => {
    // console.log(user);
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
    <div className='w-[60%] ml-[20%] mt-2 rounded-[30px] h-16 px-10 flex flex-wrap justify-between  bg-[#BCCCDC] fixed top-0 z-50 shadow shadow-[#2973B2]'>
      <aside className='w-[30%]'>
        <img src={logo} alt="" className='w-[50%] h-16 cursor-pointer' />
      </aside>
      <ul className='flex justify-end text-2xl mr-5 '>
        <li onClick={handleHomesClick} className='p-2 m-2 mr-8 cursor-pointer hover:text-[#2973B2]'>Home</li>
        <li  className='p-2 m-2 mr-4 cursor-pointer hover:text-[#2973B2]'><Link to="/about">About</Link></li>
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
           <li onClick={handleEventsClick} className='p-2 m-2 mr-4 cursor-pointer hover:text-[#2973B2]'>Events</li>
           <li className='p-2 m-2 mr-8 cursor-pointer hover:text-[#2973B2]'><Link to="/" onClick={logout}>Logout</Link></li>
           <li className='p-2 m-2 mr-8 cursor-pointer hover:text-[#2973B2]'><Link to="/profile">Profile</Link></li>
           </>
           :
           <>
           <li className='p-2 m-2 mr-8 cursor-pointer hover:text-[#2973B2]'><Link to="/register">Register</Link></li>
           <li className='p-2 m-2 mr-8 cursor-pointer hover:text-[#2973B2]'><Link to="/login">Login</Link></li>
           </>
         }
        
      </ul>
    </div>
  )
}

export default Navbar;
