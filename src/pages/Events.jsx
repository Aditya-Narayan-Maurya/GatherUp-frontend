import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Events = () => {
    let [allEvents,setAllEvents]=useState([]);
    useEffect(()=>{
             async function fetchAllEvents() {
                let {data}=await axios.get("http://localhost:8181/events");
                setAllEvents(data);
             }
             fetchAllEvents();
    },[]);
  return (
    <div>
      <h1>I am Event Page</h1>
      {
        allEvents.map((event)=>{
            return (
                <div key={event.event_id} style={{border:"2px solid black", padding:"2px",margin:"5px"}}>
                <h1>Event Name :{event.event_name}</h1>
                <h2>Event venue :{event.venue}</h2>
                <p>description :{event.description}</p>
                <p>date:{event.date}</p>
                </div>
            )
        })
      }
    </div>
  )
}

export default Events;
