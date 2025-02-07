import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EventDetail = () => {
    let {id}=useParams();
    let userId=localStorage.getItem("userId");
    let [user,setUser]=useState(null);
    let [event,setEvent]=useState(null);
    let [allRegistrationByUser,setAllRegistrationByUser]=useState([]);

    let navigate=useNavigate();
    
    // page ko refresh krne ke liye jb join pr click ho
     let [state,setState]=useState(false);
    // console.log(user);

    useEffect(()=>{
            async function fetchEventById() {
                let {data}=await axios.get(`http://localhost:8181/events/${id}`);
                setEvent(data);
            }
            fetchEventById();

            async function fetchUserDeatils() {
                 let {data}=await axios.get(`http://localhost:8181/users/${userId}`);
                 setUser(data);
                 
            } 
            fetchUserDeatils();
            async function  fetchRegistrationByUser() {
              let {data}=await axios.get(`http://localhost:8181/registrations/user/${userId}`);
              setAllRegistrationByUser(data);
             //  console.log(data);
          }
          fetchRegistrationByUser();
    },[state])

    let joinEvent=(userId,eventId)=>{
      // console.log(userId,eventId);     
              setState(!state);
             let exist_Registration=allRegistrationByUser?.find(({registration_id,event:{event_id},user:{user_id},status,registration_date})=>{
                  return(
                    event_id==eventId && user_id==userId
                  )
             })
             console.log("exist_Registration",exist_Registration);
             exist_Registration ===undefined
             ?
             (async function register() {
              await axios.post(`http://localhost:8181/register/${userId}/${eventId}`).then(()=>{
                toast.success("registered Successfully");
              }).catch(()=>{
                toast.error("Not registered");
              });
             }
            )()
             :
             toast.error("You have already registered");
    }

    let deleteEvent=()=>{
      let confirmationValue=confirm("Are you sure");
    if(confirmationValue){
      axios.delete(`http://localhost:8181/events/${event?.event_id}`).then(()=>{
        toast.success("event deleted");
        navigate("/admin/events");
      }).catch(()=>{
        toast.error("something went wrong");
      })
    }
    }

    console.log(event);
    // console.log(date.slice(0,10));
    let getDate=(date)=>{
      return  date.slice(0,10);
}
let getTime=(date)=>{
    return  date.slice(11,20);
}
  return (
    <div className='w-[60%] min-h-screen ml-[20%]  p-[2%] pt-16'>
      <h1 className='text-5xl text-center font-semibold font-sans  p-2 '>Event Details</h1>
      <img src={event?.event_image_url} alt="" onError={(e)=>e.target.src="https://eventoempresa.com/wp-content/uploads/2020/03/empresas-organizacion-de-eventos-en-barcelona-mice.jpg"}
       className='w-full h-96 border rounded-2xl border-amber-50'/>
      <div>
        <h2 className='text-2xl font-medium pt-1'>{event?.event_name}</h2>
        <p className='text-lg font-normal pt-1'>Date:-{getDate(event?.date || "")} </p>
        <p className='text-lg font-normal pt-1'>Time:- {getTime(event?.date || "")}</p>
        <p className='text-lg font-normal pt-1'>Venue:- {event?.venue}</p>
        <p className='text-lg font-normal pt-1'><i>Created By:- {event?.user?.user_name}</i></p>
        <p className='text-lg font-light pt-1'>
        {event?.description}        </p>
      </div>

      {
        user?.role==='admin'
        ?
        <>
        <div className='flex '>
        <Link to={`/updateEvent/${event?.event_id}`}><button className='border rounded-2xl bg-[#EED3D9] p-2 mt-2 w-28 text-center text-xl cursor-pointer'>Edit</button></Link>
        <button onClick={deleteEvent} className='border rounded-2xl bg-[#EED3D9] p-2 mt-2 w-28 text-center text-xl cursor-pointer ml-3  '>Delete</button>
        </div>
        </>
        :
        <>
        <Link to={`/registrations/user/${userId}`}><button onClick={()=>joinEvent(userId,id)} className='border rounded-2xl bg-[#EED3D9] p-2 mt-2 w-28 text-center text-xl cursor-pointer'>Join</button></Link>
        </>
      }
    </div>
  )
}

export default EventDetail;
