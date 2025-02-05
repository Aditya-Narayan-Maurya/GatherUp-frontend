import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MyRegistrationCart = ({registration_id,registration_date,status:initialStatus,event_id,user_id}) => {
    // console.log(event_id);
    let userId=localStorage.getItem("userId");
    let [event,setEvent]=useState([]);
    let [status,setStatus]=useState(initialStatus);
    useEffect(()=>{
        async function fetchAllEvents() {
            let {data}=await axios.get(`http://localhost:8181/events/${event_id}`);
            setEvent(data);
         }
         fetchAllEvents();
    },[event_id])


    // console.log(date.slice(0,10));
    let getDate=(date)=>{
        return  date.slice(0,10);
  }
  let getTime=(date)=>{
      return  date.slice(11,20);
}
  console.log();
  let getUpperCase=(str)=>{
    return  str.toUpperCase();
  }

  //http://localhost:8181/registrations/6
  let cancelRegistration=(registrationId)=>{
    async function updateRegistartion() {
        let {data}=await axios.put(`http://localhost:8181/registrations/${registrationId}`,{status:"cancel"},{
            headers: {
              'Content-Type': 'application/json'
            }
        }

        ); 
        console.log(data);
        setStatus("cancel");
          
    }
    updateRegistartion();
  }

  let joinRegistration=(registrationId)=>{
    async function updateRegistartion() {
        let {data}=await axios.put(`http://localhost:8181/registrations/${registrationId}`,{status:"registered"},{
            headers: {
              'Content-Type': 'application/json'
            }
        }
        ); 
        console.log(data);
        setStatus("registered");
          
    }
    updateRegistartion();
  }

  return (
    <div>
      <div className='w-96 m-3 p-2 border border-[#b1aaaa] rounded-xl' key={registration_id}>
      <img src={event?.event_image_url}
       alt="not found" className='w-full h-52 p-2 rounded-2xl'/>
       <div className='m-2'>
        <h1 className='text-2xl font-bold'>{event?.event_name}</h1>
        <h2 className='text-base'>Registration Date: {getDate(registration_date)}</h2>
        <h2 className='text-base'>Registration Time: {getTime(registration_date)}</h2>
        <h3 className='text-base'>Venue: {event?.venue}</h3>
         <h3 className='text-base'>Status: {getUpperCase(status)}</h3>

         <div className='flex '>
         {/* <Link to={`/events/${event_id}`}> <button className='border rounded-2xl bg-[#EED3D9] p-2 mt-2 w-full text-center cursor-pointer'>View Details</button></Link> */}
         {
            status==="cancel"
            ?
            <button onClick={()=>joinRegistration(registration_id)}  className='border rounded-2xl bg-[#EED3D9] p-2 mt-2 w-full text-center cursor-pointer'>Register Again</button>
            :
            <button onClick={()=>cancelRegistration(registration_id)}  className='border rounded-2xl bg-[#EED3D9] p-2 mt-2 w-full text-center cursor-pointer'>Cancel Registration</button>
         }

         </div>

       </div>
    </div>
    </div>
  )
}

export default MyRegistrationCart;
