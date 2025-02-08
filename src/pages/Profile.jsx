import React, { useEffect, useState } from 'react';
import profile from '../assets/profile.avif';
import { Link, useNavigate } from 'react-router-dom';
import MyRegistrations from './MyRegistrations';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminEvents from './AdminEvents';

const Profile = () => {
  let navigate=useNavigate();
  let userId=localStorage.getItem("userId");
   let [user,setUser]=useState(null);
  useEffect(()=>{
           async function fetchUser() {
               let {data}=await axios.get(`http://localhost:8181/users/${userId}`);
               setUser(data);
           }
           fetchUser();
  },[])
  // console.log(user);

  let logout=()=>{
    localStorage.removeItem("userId");
    navigate("/login");
  }

  let deleteUser=()=>{
    let confirmationValue=confirm("Are you sure");
  if(confirmationValue){
    axios.delete(`http://localhost:8181/users/${user?.user_id}`).then(()=>{
      localStorage.removeItem("userId");
      toast.success("account deleted");
      navigate("/register");
    }).catch(()=>{
      toast.error("something went wrong");
    })
  }
  }

  return (
    <>
    <div className='pt-16 pb-10 w-1/2 ml-[25%] flex flex-col content-center '>
            <h1 className='text-5xl font-bold font-serif text-center pt-10'>Hello 👋{user?.user_name}</h1>
      <img src={profile} alt="Not found" className='w-60 h-60 self-center rounded-[50%] mt-6'/>
      <div className=' mt-6 self-center'>
        <h1 className='text-3xl pt-1'><span className=''>Name:-</span> {user?.user_name}</h1>
         <h2 className='text-2xl pt-1'><span className=''>Email:-</span> {user?.email}</h2>
         <h2 className='text-2xl pt-1'><span className=''>Phone No:-</span> {user?.phone_number}</h2>
         <h2 className='text-2xl pt-1'><span className=''>Role:-</span> {user?.role}</h2>
      <Link to={"/users/edit"}><button className=' rounded-2xl bg-[#9ACBD0] hover:bg-[#E8F9FF] hover:text-black p-3 mt-4 text-center text-xl cursor-pointer'>Edit Profile</button> </Link>
      <button onClick={deleteUser} className=' rounded-2xl bg-[#9ACBD0] hover:bg-[#E8F9FF] hover:text-black p-3 mt-4 text-center text-xl cursor-pointer'>Delete</button>
      <button onClick={logout} className=' rounded-2xl bg-[#9ACBD0] hover:bg-[#E8F9FF] hover:text-black p-3 ml-2 mt-4 text-center text-xl cursor-pointer'>Logout</button> 
      </div>
      <div className='self-center'>
      </div>
    </div>
    
    {
      user?.role==="admin"
      ?
      <AdminEvents />
      :
      <MyRegistrations />
    }
    </>
  )
}

export default Profile;
