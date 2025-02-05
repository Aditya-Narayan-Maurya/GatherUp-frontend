import React, { useEffect, useState } from 'react';
import MyRegistrationCart from '../components/MyRegistrationCart';
import axios from 'axios';

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
    <div className='w-[80%] ml-[10%] pt-16' >
      <h1 className='text-5xl font-bold font-serif text-center'>My Registrations</h1>
      <div className='flex flex-wrap justify-between ' >
      {
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
