import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';

const PopularEvents = () => {
    let [trendingEvent,setTrendingEvent]=useState([]);
    useEffect(()=>{
           async function  fetchTrendingEvent() {
                     let {data}=await axios.get(`http://localhost:8181/events/trending`);
                     setTrendingEvent(data);
           }
           fetchTrendingEvent();
    },[])
  return (
    <div className='w-[80%] ml-[10%] pt-16 min-h-screen'>
      <h1 className='text-5xl font-bold font-serif text-left'>Trending Events</h1>
      <div className='flex flex-wrap justify-evenly'>
      {
        trendingEvent.map(({event_id,event_name,venue,description,date,event_image_url})=>{
            return (
                  <EventCard event_id={event_id} event_name={event_name} venue={venue} date={date} event_image_url={event_image_url} key={event_id}/>
            )
        })
      }
      </div>
    </div>
  )
}

export default PopularEvents;
