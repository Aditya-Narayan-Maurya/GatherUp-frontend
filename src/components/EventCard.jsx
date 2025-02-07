import React from 'react'
import { Link } from 'react-router-dom';

const EventCard = ({event_id,event_name,venue,date="",event_image_url}) => {
    // console.log(date.slice(0,10));
    let getDate=(date)=>{
          return  date.slice(0,10);
    }
    let getTime=(date)=>{
        return  date.slice(11,20);
  }
    console.log();
  return (
    <div className='w-96 m-3 p-2 border border-[#b1aaaa] rounded-xl' key={event_id}>
      <img src={event_image_url}alt="not found" onError={(e)=>e.target.src="https://eventoempresa.com/wp-content/uploads/2020/03/empresas-organizacion-de-eventos-en-barcelona-mice.jpg"}
      className='w-full h-52 p-2 rounded-2xl'/>
       <div className='m-2'>
        <h1 className='text-2xl font-bold'>{event_name}</h1>
        <h2 className='text-base'>Date:{getDate(date)}</h2>
        <h2 className='text-base'>Time:{getTime(date)}</h2>
        <h3 className='text-base'>Venue:{venue}</h3>
        <Link to={`/events/${event_id}`}> <button className='border rounded-2xl bg-[#EED3D9] p-2 mt-2 w-full text-center cursor-pointer'>View Details</button></Link>
       </div>
    </div>
  )
}

export default EventCard
