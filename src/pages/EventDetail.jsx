import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
    let {id}=useParams();
    let userId=localStorage.getItem("userId");
    let [user,setUser]=useState(null);
    let [event,setEvent]=useState(null);
    let [allRegistrationByUser,setAllRegistrationByUser]=useState([]);
    
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
            //  console.log("exist_Registration",exist_Registration);
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
  return (
    <div className='w-[60%] min-h-screen ml-[20%]  p-[2%] pt-16'>
      <h1 className='text-5xl text-center font-semibold font-sans  p-2 '>Event Details</h1>
      <img src={event?.event_image_url} alt="" className='w-full h-96 border rounded-2xl border-amber-50'/>
      <div>
        <h2 className='text-2xl font-medium pt-1'>Tech Innovation Meetup</h2>
        <p className='text-lg font-normal pt-1'>Date:- 25-12-25</p>
        <p className='text-lg font-normal pt-1'>Time:- 18-00-00</p>
        <p className='text-lg font-normal pt-1'>Venue:- ABC Convention Center, Noida</p>
        <p className='text-lg font-light pt-1'>
            A meetup to discuss the latest innovations in technology and network with industry leaders.
        </p>
      </div>

      {
        user?.role==='admin'
        ?
        <>
        <div className='flex '>
        <button className='border rounded-2xl bg-[#EED3D9] p-2 mt-2 w-28 text-center text-xl cursor-pointer'>Edit</button>
        <button className='border rounded-2xl bg-[#EED3D9] p-2 mt-2 w-28 text-center text-xl cursor-pointer ml-3  '>Delete</button>
        </div>
        </>
        :
        <>
      <button onClick={()=>joinEvent(userId,id)} className='border rounded-2xl bg-[#EED3D9] p-2 mt-2 w-28 text-center text-xl cursor-pointer'>Join</button>
        </>
      }
    </div>
  )
}

export default EventDetail;
