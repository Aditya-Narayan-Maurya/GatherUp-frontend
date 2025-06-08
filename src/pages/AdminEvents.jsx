import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminEvents = () => {
    let userId=localStorage.getItem("userId");
    console.log(userId);
    let [allEvents,setAllEvents]=useState([]);
    useEffect(()=>{
             async function fetchAllEvents() {
                let {data}=await axios.get(`http://localhost:8181/events/users/${userId}`);
                setAllEvents(data);
             }
             fetchAllEvents();
    },[userId]);
  return (
    <div className='w-[80%] ml-[10%] pt-22 min-h-screen'>
      <h1 className='text-5xl font-bold font-serif text-center'>Your Events</h1>
      <div className='flex flex-wrap justify-evenly'>
      {
        allEvents.length===0
        ?
        <>
        <h1 className='text-2xl text-center w-full'>No event created by you</h1><br />
        <Link to={"/createEvent"}><button className='border rounded-2xl bg-[#48A6A7] hover:bg-[#9ACBD0] hover:text-black p-3 mt-4 text-center text-xl cursor-pointer'>Create Events</button> </Link>
        </>
        :
        allEvents.map(({event_id,event_name,venue,description,date,event_image_url})=>{
            return (
                  <EventCard event_id={event_id} event_name={event_name} venue={venue} date={date} event_image_url={event_image_url} key={event_id}/>
            )
        })
      }
      </div>
    </div>
  )
}

export default AdminEvents;
