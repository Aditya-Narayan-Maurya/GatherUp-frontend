import React, { useEffect, useState } from 'react';
import MyRegistrationCart from '../components/MyRegistrationCart';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyRegistrations = () => {
    let userId=localStorage.getItem("userId");
    let [registrations,setRegistations]=useState([]);
    useEffect(()=>{
        async function fetchUserRegistrations() {
            let {data}=await axios.get(`http://localhost:8181/registrations/user/${userId}`);
            setRegistations(data);
        }
        fetchUserRegistrations();
    },[])
    // console.log(registrations);
  return (
    <div className='w-[80%] ml-[10%] pt-16 min-h-screen' >
      <h1 className='text-5xl font-bold font-serif text-center'>My Registrations</h1>
      <div className='flex flex-wrap justify-center ' >
      {
         registrations.length===0
         ?
         <>
         <h1 className='text-2xl text-center w-full'>No event joined by you</h1><br />
         <Link to={`/registrations/user/${userId}`}><button className='border rounded-2xl bg-[#48A6A7] hover:bg-[#9ACBD0] hover:text-black p-3 mt-4 text-center text-xl cursor-pointer'>Join Events</button> </Link>
         </>
         :
        registrations.map(({registration_id,registration_date,status,event:{event_id},user_id})=>{
            return (
                <div key={registration_id}>
                  {/* <EventCard event_id={event_id} event_name={event_name} venue={venue} date={date} event_image_url={event_image_url}/> */}
                  <MyRegistrationCart registration_id={registration_id} registration_date={registration_date} status={status} event_id={event_id} user_id={user_id}/>
                  </div>
            )
        })
      }
      </div>
    </div>
  )
}

export default MyRegistrations;
