import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Rating from 'react-rating';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EventDetail = () => {
    let {id}=useParams();
    let userId=localStorage.getItem("userId");
    let [user,setUser]=useState(null);
    let [event,setEvent]=useState(null);
    let [allRegistrationByUser,setAllRegistrationByUser]=useState([]);

    // let [existRegistration,setExistRegistration]=useState(undefined);

    let [allFeedback,setAllFeedback]=useState(null);
    let [feedback,setFeedback]=useState({
      rating:3,
      comments:""
    });
    let {rating,comments}=feedback;
  
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

          async function fetchFeedbackByEvent(){
            let {data}=await axios.get(`http://localhost:8181/feedback/event/${id}`);
            setAllFeedback(data);
            console.log(data);
          }
          fetchFeedbackByEvent();

      //     let exist_Registration=allRegistrationByUser?.find(({registration_id,event:{event_id},user:{user_id},status,registration_date})=>{
      //       return(
      //         event_id==id && user_id==userId
      //       )
      //  })
      //  setExistRegistration(exist_Registration);

    },[state,])

    let joinEvent=(userId,eventId)=>{
      // console.log(userId,eventId);     
              setState(!state);
             let exist_Registration=allRegistrationByUser?.find(({registration_id,event:{event_id},user:{user_id},status,registration_date})=>{
                  return(
                    event_id==eventId && user_id==userId
                  )
             })
            //  setExistRegistration(exist_Registration);
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

            //  setState(!state);
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

    // console.log(event);
    // console.log(date.slice(0,10));
    let getDate=(date)=>{
      return  date.slice(0,10);
}
let getTime=(date)=>{
    return  date.slice(11,20);
}
let toUpperCase=(x)=>{
     return x.toUpperCase();
}


// Feedback work

let handleInputChange=(e)=>{
   let {name,value}=e.target;
    setFeedback({...feedback,[name]:value});
}
let handleSubmit=async (e)=>{
  e.preventDefault();
  console.log(feedback);
  await axios.post(`http://localhost:8181/feedback/${userId}/${id}`,feedback).then(()=>{
    toast.success("feedback added");
    setFeedback({
      rating:3,
      comments:""
    })
    setState(!state);//page ko refresh krne ke liye
  }).catch(()=>{
    toast.error("feedback not added");
  })
}

let editFeedback=(feedback_id,raing,comments)=>{
     setFeedback(
      {
        rating:raing,
        comments:comments
      }
     );
     deleteFeedback(feedback_id);
}

let deleteFeedback=(feedback_id)=>{
   async function deleteData(){
     let confirmationValue=confirm("Are you sure");
     if(confirmationValue){
       await axios.delete(`http://localhost:8181/feedback/${feedback_id}`).then(()=>{
        toast.success("deleted feedback");
        setState(!state);//page ko refresh krne ke liye
       }).catch(()=>{
        toast.error("Feedback Not deleted");
       })
   
     }
    
   }
   deleteData();


}


  return (
    <div className='w-[60%] min-h-screen ml-[20%]  p-[2%] pt-22'>
      <h1 className='text-5xl text-center font-semibold font-sans  p-2 '>Event Details</h1>
      <img src={event?.event_image_url} alt="" onError={(e)=>e.target.src="https://eventoempresa.com/wp-content/uploads/2020/03/empresas-organizacion-de-eventos-en-barcelona-mice.jpg"}
       className='w-full h-96 border rounded-2xl border-amber-50'/>
      <div>
        <h2 className='text-2xl font-medium pt-1'>{event?.event_name}</h2>
        <p className='text-lg font-normal pt-1'>Date:-{getDate(event?.date || "")} </p>
        <p className='text-lg font-normal pt-1'>Time:- {getTime(event?.date || "")}</p>
        <p className='text-lg font-normal pt-1'>Venue:- {event?.venue}</p>
        <p className='text-lg font-normal pt-1'><i>Created By:- {toUpperCase(event?.user?.user_name || "")}</i></p>
        <p className='text-lg font-light pt-1'>
        {event?.description}        </p>
      </div>

      {
        user?.role==='admin'
        ?
        <>
        <div className='flex '>
        <Link to={`/updateEvent/${event?.event_id}`}><button className=' rounded-2xl bg-[#9ACBD0] hover:bg-[#E8F9FF] hover:text-black p-3 mt-4 text-center text-xl cursor-pointer'>Edit Event</button></Link>
        <button onClick={deleteEvent} className='ml-3 rounded-2xl bg-[#9ACBD0] hover:bg-[#E8F9FF] hover:text-black p-3 mt-4 text-center text-xl cursor-pointer'>Delete</button>
        </div>
        </>
        :
        <>
          <Link to={`/registrations/user/${userId}`}><button onClick={()=>joinEvent(userId,id)} className='border rounded-2xl bg-[#EED3D9] p-2 mt-2 w-28 text-center text-xl cursor-pointer'>Join</button></Link>
        {/* {
          existRegistration===undefined
          ?
          :
          <Link to={`/registrations/user/${userId}`}><button onClick={()=>joinEvent(userId,id)} className='border rounded-2xl bg-[#EED3D9] p-2 mt-2 w-28 text-center text-xl cursor-pointer'>Joined</button></Link>

        } */}
        <br />
        <br />

        {/* Feedback form */}
        <h2 className='text-2xl'>Leave a review</h2>
        <div className='flex items-center text-3xl '>
        <Rating
          initialRating={rating}
          emptySymbol={<FaRegStar className="text-gray-400 text-3xl" />} 
          fullSymbol={<FaStar className="text-yellow-500 text-3xl" />} 
          onChange={(value) => setFeedback({...feedback, rating: value})}
        />
        </div>
        <div className=''>
        <form onSubmit={handleSubmit} action="">
          {/* <input type="number" min={1} max={5} value={rating} onChange={handleInputChange} name="rating" id="" /><br /> */}
          <label htmlFor="" className='text-lg'>Comments</label><br />
          <textarea id="" rows={5}  onChange={handleInputChange} value={comments} name="comments" className='border-[0.1px] w-full'>

          </textarea>
          <button type='submit' className='rounded-2xl border  hover:bg-[#E8F9FF] hover:text-black p-3 mt-4 text-center text-xl cursor-pointer' >Submit</button>
        </form>
        </div>
        </>
      }


{/* All Feedbacks */}
      <div>
        <br /><br />
      <h2 className='text-2xl text-blue-600'>Rating & Reviews</h2>
        {
          allFeedback?.map((feedback)=>{
               return  <div className='border p-2 m-1 rounded-md' key={feedback?.feedback_id}>
               <Rating readonly
                initialRating={feedback?.rating}
                emptySymbol={<FaRegStar className="text-gray-400 text-3xl" />} 
                fullSymbol={<FaStar className="text-yellow-500 text-3xl" />} 
                // onChange={(value) => setFeedback({...feedback, rating: value})}
              />
              <p>{feedback?.comments}</p>
              <p className='flex justify-between'><span > By:- {toUpperCase(feedback?.user?.user_name || "")}</span> <span className='italic'>{getDate(feedback?.feedback_date || "")}</span></p>
              
              {/* <button onClick={editFeedback} className='rounded-xl text-white bg-[red] hover:bg-[#E8F9FF] hover:text-black p-2 mt-4 text-center text-base cursor-pointer'>Edit</button> */}

              {
               feedback?.user?.role==="user" && feedback?.user?.user_id==userId
               ?
               <>
              <button onClick={()=>deleteFeedback(feedback?.feedback_id)} className=' rounded-xl text-white bg-[red] hover:bg-[#E8F9FF] hover:text-black p-2 px-4 mt-4 text-center text-base cursor-pointer mr-2.5'>Delete</button>
              <button onClick={()=>editFeedback(feedback?.feedback_id,feedback?.rating,feedback?.comments)} className=' rounded-xl text-white bg-[red] hover:bg-[#E8F9FF] hover:text-black p-2 px-4 mt-4 text-center text-base cursor-pointer'>Edit</button>
               </>
               : 
               <>
               </>
              }
               
               </div>
          })

        }
      </div>
    </div>
  )
}

export default EventDetail;
