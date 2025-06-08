// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import EventCard from '../components/EventCard';

// const Events = () => {
//     let userId=localStorage.getItem("userId");
//     // console.log(userId);
//     let [allEvents,setAllEvents]=useState([]);
//     useEffect(()=>{
//              async function fetchAllEvents() {
//                 let {data}=await axios.get("http://localhost:8181/events");
//                 setAllEvents(data);
//              }
//              fetchAllEvents();
//     },[]);
//   return (
//     <div className='w-[80%] ml-[10%] pt-22 min-h-screen'>
//       <h1 className='text-5xl font-bold font-serif text-center'>Events</h1>
//       <div className='flex flex-wrap justify-evenly'>
//       {
//         allEvents.map(({event_id,event_name,venue,description,date,event_image_url})=>{
//             return (
//                   <EventCard event_id={event_id} event_name={event_name} venue={venue} date={date} event_image_url={event_image_url} key={event_id}/>
//             )
//         })
//       }
//       </div>
//     </div>
//   )
// }

// export default Events;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';

const categories = ["entertainment", "tech", "educational", "festival", "social", "sports"];

const Events = () => {
    let userId = localStorage.getItem("userId");
    const [allEvents, setAllEvents] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        async function fetchAllEvents() {
            let { data } = await axios.get("http://localhost:8181/events");
            setAllEvents(data);
        }
        fetchAllEvents();
    }, []);

    // Handle checkbox toggle
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(cat => cat !== category)
                : [...prev, category]
        );
    };

    // Filtered events
    const filteredEvents = selectedCategories.length === 0
        ? allEvents
        : allEvents.filter(event => selectedCategories.includes(event.category?.toLowerCase()));

    return (
        <div className='flex pt-22'>
            {/* Left Sidebar with Checkboxes */}
            <div className='w-[15%] pl-4'>
               <div className='w-[95%] mt-26 ml-[10%] p-2 border-[0.1px] border-[#bbb]'>
               <h2 className='text-2xl font-bold mb-4 uppercase p-2 bg-[#b0acac]'>Categories</h2>
                {categories.map((cat, idx) => (
                    <div key={idx} className='text-2xl h-14'>
                        <input
                            type="checkbox"
                            id={cat}
                            checked={selectedCategories.includes(cat)}
                            onChange={() => handleCategoryChange(cat)}
                        />
                        <label htmlFor={cat} className='ml-2 capitalize'>{cat}</label>
                        <hr className='opacity-[0.2]'/>
                    </div>
                ))}
               </div>
            </div>

            {/* Events Section */}
            <div className='w-[85%] ml-4  min-h-screen'>
                <h1 className='text-5xl font-bold font-serif text-center'>Events</h1>
                <div className='flex flex-wrap justify-evenly'>
                    {filteredEvents.map(({ event_id, event_name, venue, description, date, event_image_url }) => (
                        <EventCard
                            event_id={event_id}
                            event_name={event_name}
                            venue={venue}
                            date={date}
                            event_image_url={event_image_url}
                            key={event_id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;

