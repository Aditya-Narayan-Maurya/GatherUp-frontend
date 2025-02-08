import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditEvent = () => {
    const userId = localStorage.getItem("userId");
    let {eventId}=useParams();
    let [updateEvent,setUpdateEvent]=useState(null);
    let navigate=useNavigate();

    useEffect(()=>{
        async function fetchUpdateEvent() {
           let {data}=await axios.get(`http://localhost:8181/events/${eventId}`);
           setUpdateEvent(data); //storing into the state
        }
        fetchUpdateEvent();
  },[])

  let handleChange=(e)=>{
         let {name,value}=e.target;
         setUpdateEvent({...updateEvent,[name]:value});
  }

  let handleSubmit=(e)=>{
          e.preventDefault();
          console.log(updateEvent);
          axios.put(`http://localhost:8181/events/${eventId}`,updateEvent).then(()=>{
            toast.success("updated Successfully");
            // console.log(registerData);
            setUpdateEvent({
                event_name:"",
                event_image_url:"",
                venue:"",
                category:"",
                date:"",
                description:""
            })
            navigate(`/events/${eventId}`);
          }).catch(()=>{
            toast.error("Not updated");
          })
  }
  return (
    <div className='pt-24 pb-4 mt-0 mb-0 animated-gradient '>
      <section className=" dark:bg-gray-900 pb-3">
      <div className="bg-amber-500 animated-gradient flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
      <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
          GatherUp   
      </Link>
      <div className="w-full animated-gradient rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create New Event
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 animated-gradient" action="#">
                    <div>
                      <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Event Name:-</label>
                      <input type="text" name="event_name" id="name" placeholder="Tech Innovation Meetup" value={updateEvent?.event_name} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>

                  <div>
                      <label htmlFor="image" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Image URL:-</label>
                      <input type="text" name="event_image_url" id="image" placeholder="https://d3jmn01ri1fzgl.cloudfront.net/photoadking/illustration-template-w8kjzm5081072d.webp" value={updateEvent?.event_image_url} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>

                  <div>
                      <label htmlFor="venue" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Venue:-</label>
                      <input type="text" name="venue" id="venue" placeholder="ABC Convention Center, Noida" value={updateEvent?.venue} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  <div>
                      <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Category:-</label>
                      {/* <input type="text" name="category" id="category" placeholder="EDUCATIONAL" value={password} onChange={handleChange}  required="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/> */}
                       <select value={updateEvent?.category} onChange={handleChange} name="category" id="category" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="">Select an option</option>
                            <option value="educational" >EDUCATIONAL</option>
                            <option value="entertainment" >ENTERTAINMENT</option>
                            <option value="sports" >SPORTS</option>
                            <option value="social" >SOCIAL</option>
                            <option value="tech">TECH</option>
                            <option value="festival">FESTIVAL</option>
                       </select>
                 
                  </div>
                  <div>
                      <label htmlFor="date" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Date:-</label>
                      <input type="datetime-local" name="date" id="date" value={updateEvent?.date} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>

                  <div>
                      {/* <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Description:-</label> */}
                      {/* <input type="text" name="description" id="description"   required="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/> */}
                    <textarea name="description" id="description" value={updateEvent?.description} onChange={handleChange} rows={7} required placeholder="Write some brief description about your event.........." className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
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

export default EditEvent;
