import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import Events from './pages/Events';
import PrivateRoute from './components/PrivateRoute';
import EventCard from './components/EventCard';
import EventDetail from './pages/EventDetail';
import Footer from './components/Footer';
import MyRegistrations from './pages/MyRegistrations';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

const App = () => {
  return (
    <div>
      <Toaster/>
        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/profile' element={<Profile/>}/>

            {/* private routes */}
            <Route path='/events' element={<PrivateRoute><Events/></PrivateRoute>}/>
            <Route path='/events/:id' element={<PrivateRoute><EventDetail/></PrivateRoute>}/>
            <Route path='/registrations/user/:id' element={<PrivateRoute><MyRegistrations/></PrivateRoute>}/>
        </Routes>
        {/* <EventCard/> */}
        <Footer/>
        </BrowserRouter>
    </div>
  )
}

export default App;
