import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const EditUser = () => {
    let userId=localStorage.getItem("userId");
    let navigate=useNavigate();
  let [updateUser,setUpdateUser]=useState({
    user_name:"",
    email:"",
    phone_number:"",
    password:"",
    role:""
  });

  useEffect(()=>{
    async function fetchUpdateUser() {
       let {data}=await axios.get(`http://localhost:8181/users/${userId}`);
       setUpdateUser(data); //storing into the state
    }
    fetchUpdateUser();
},[])

  let handleChange=(e)=>{
         let {name,value}=e.target;
         setUpdateUser({...updateUser,[name]:value});
  }

  let handleSubmit = (e) => {
  e.preventDefault();

  // Validation regex
  const nameRegex = /^[A-Za-z\s]{3,}$/;
  const phoneRegex = /^[987][0-9]{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/;

  let { user_name, email, phone_number, password } = updateUser;

  // Validations
  if (!nameRegex.test(user_name)) {
    toast.error("Enter a valid name (min 3 letters).");
    return;
  }
  if (!emailRegex.test(email)) {
    toast.error("Enter a valid email.");
    return;
  }
  if (!phoneRegex.test(phone_number)) {
    toast.error("Phone number must be 10 digits and start with 9, 8, or 7.");
    return;
  }
  if (!passwordRegex.test(password)) {
    toast.error("Password must be 6+ characters with letter, number, and special character.");
    return;
  }

  // If all validations pass
  axios
    .put(`http://localhost:8181/users/${userId}`, updateUser)
    .then(() => {
      toast.success("Profile updated successfully");
      setUpdateUser({
        user_name: "",
        email: "",
        phone_number: "",
        password: "",
        role: "",
      });
      navigate("/profile");
    })
    .catch(() => {
      toast.error("Not updated");
    });
};



  return (
    <div className='pt-0 '>
      <section className="animated-gradient dark:bg-gray-900 ">
      <div className="  flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
          GatherUp   
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Update Your Profile
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name:-</label>
                      <input type="text" name="user_name" id="name" placeholder="Enter Your Name" value={updateUser?.user_name} onChange={handleChange} required="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>

                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email:-</label>
                      <input type="email" name="email" id="email" placeholder="name@gmail.com" value={updateUser?.email} onChange={handleChange} required="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>

                  <div>
                      <label htmlFor="phoneNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone no:-</label>
                      <input type="tel" name="phone_number" id="phoneNo" placeholder="Enter Your phoneNo" value={updateUser?.phone_number} onChange={handleChange} required="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:-</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" value={updateUser?.password} onChange={handleChange}  required="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  
                  
                  
                  <button type="submit" className="w-full cursor-pointer text-black bg-[#B5C0D0] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Update 
                    </button>
                  
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default EditUser
