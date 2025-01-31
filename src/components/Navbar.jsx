import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex justify-between bg-amber-50 h-16 '>
      <aside className='w-[30%]'>
        <img src="" alt="" />Logo
      </aside>
      <ul className='flex justify-end text-2xl mr-5 '>
        <li className='p-2 m-2 mr-4'><Link to="/">Home</Link></li>
        <li className='p-2 m-2 mr-4'><Link to="/register">Register</Link></li>
        <li className='p-2 m-2 mr-4'><Link to="/login">Login</Link></li>
      </ul>
    </div>
  )
}

export default Navbar;
