import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';

const Events = () => {
    let userId=localStorage.getItem("userId");
    // console.log(userId);
    let [allEvents,setAllEvents]=useState([]);
    useEffect(()=>{
             async function fetchAllEvents() {
                let {data}=await axios.get("http://localhost:8181/events");
                setAllEvents(data);
             }
             fetchAllEvents();
    },[]);
  return (
    <div className='w-[80%] ml-[10%] pt-22 min-h-screen'>
      <h1 className='text-5xl font-bold font-serif text-center'>Events</h1>
      <div className='flex flex-wrap justify-evenly'>
      {
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

export default Events;
