import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  let navigate=useNavigate();
  let [registerData,setRegisterData]=useState({
    user_name:"",
    email:"",
    phone_number:"",
    password:"",
    role:""
  });
  let {user_name,email,password,phone_number,role}=registerData;
  let handleChange=(e)=>{
         let {name,value}=e.target;
         setRegisterData({...registerData,[name]:value});
  }

  let handleSubmit=(e)=>{
          e.preventDefault();
          axios.post("http://localhost:8181/users",registerData).then(()=>{
            toast.success("Register Successfully");
            // console.log(registerData);
            setRegisterData({
              user_name:"",
              email:"",
              phone_number:"",
              password:"",
              role:""
            })
            navigate("/login");
          }).catch(()=>{
            toast.error("Not Registered");
          })
  }

  return (
    <div className='pt-16'>
      <section className="bg-gray-50 dark:bg-gray-900 animated-gradient">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
          GatherUp   
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name:-</label>
                      <input type="text" name="user_name" id="name" placeholder="Enter Your Name" value={user_name} onChange={handleChange} required="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>

                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email:-</label>
                      <input type="email" name="email" id="email" placeholder="name@gmail.com" value={email} onChange={handleChange} required="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>

                  <div>
                      <label htmlFor="phoneNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone no:-</label>
                      <input type="tel" name="phone_number" id="phoneNo" placeholder="Enter Your phoneNo" value={phone_number} onChange={handleChange} required="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:-</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" value={password} onChange={handleChange}  required="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  
                  
                  <div className='w-1/2'>
                      <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role:-</label>
                      <div className='flex justify-between'>
                         <div><input type="radio" name="role"  value="user" onChange={handleChange} className=''/> User</div>
                         <div><input type="radio" name="role"  value="admin" onChange={handleChange} className='pr-[30%]'/>Admin</div>
                      </div>
                  </div>
                  
                  <button type="submit" className="w-full cursor-pointer text-black bg-[#B5C0D0] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Create an account
                    </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link to="/login" className="font-medium text-blue-400 hover:underline dark:text-primary-500 list-none">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Register;
