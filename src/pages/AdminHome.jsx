import React, { useEffect } from 'react';
import image2 from '../assets/home-page-images/homeimage2.avif';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    return (
        <div  
        className="w-full min-h-screen pt-16  relative flex justify-center align-middle items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center blur-[6px]" 
            style={{ backgroundImage: `url(${image2})` }}
          ></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white  ">
            {/* <h1 className="text-white text-4xl font-bold">Welcome to Home Page</h1> */}
         <h1 className='text-center  text-2xl font-normal '>Find & Manage Amazing Events Effortlessly</h1>
         <h2 className='text-center  text-4xl font-medium mt-2'>Join exciting events or create your own with ease.</h2>
     <Link to={"/createEvent"}><button className='border rounded-2xl bg-[#48A6A7] hover:bg-[#9ACBD0] hover:text-black p-3 mt-4 text-center text-xl cursor-pointer'>Create Events</button> </Link>
     </div>
         
    
          
        </div>
      )
}

export default AdminHome
